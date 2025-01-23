import logging
from typing import Dict, List, Optional
import numpy as np
from pymongo import MongoClient
import google.generativeai as genai
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from src.config.settings import MONGODB_URI, DB_NAME, COLLECTION_NAME, GOOGLE_API_KEY, MODEL_NAME

logger = logging.getLogger(__name__)

class CourseBot:
    def __init__(self):
        # Initialize MongoDB connection
        self.client = MongoClient(MONGODB_URI)
        self.db = self.client[DB_NAME]
        self.collection = self.db[COLLECTION_NAME]
        
        # Initialize Gemini
        genai.configure(api_key=GOOGLE_API_KEY)
        self.model = genai.GenerativeModel(MODEL_NAME)
        
        # Initialize vectorizer and document storage
        self.vectorizer = TfidfVectorizer(stop_words='english')
        self.documents = []
        self.course_data = []
        
        # Chat configuration
        self.temperature = 0.7
        self.max_tokens = 1000
        self.context_window = 5  # Number of previous messages to keep
        self.chat_history = []
        self.system_prompt = """You are a helpful course advisor for a computer science department. 
            Answer the following query based on the course information provided.
            Be concise but informative, and make sure to mention relevant course codes when discussing specific courses.
            Your responses should be:
                1. Accurate and based on the course material
                2. Concise but comprehensive
                3. Include examples when relevant
                4. Structured with clear sections when needed
            Please maintain a professional and educational tone."""
                
        # Initialize data
        self.prepare_data()

    def prepare_data(self):
        """Prepare course data for searching"""
        courses = self.collection.find({})
        
        for course in courses:
            # Create searchable text for each course
            text = f"{course['moduleCode']} {course['moduleTitle']} "
            
            # Add learning outcomes
            if course.get('learningOutcomes'):
                text += " ".join(course['learningOutcomes']) + " "
            
            # Add syllabus content
            if course.get('syllabusOutline') and course['syllabusOutline'].get('content'):
                for topic in course['syllabusOutline']['content']:
                    text += f" {topic.get('topic', '')} "
                    # Add subtopics if they exist
                    if topic.get('subtopics'):
                        text += " ".join(topic['subtopics']) + " "
            
            # Add prerequisites
            if course.get('prerequisitesOrCorequisites'):
                text += " ".join(course['prerequisitesOrCorequisites']) + " "
            
            self.documents.append(text)
            self.course_data.append(course)
        
        # Create TF-IDF matrix
        self.tfidf_matrix = self.vectorizer.fit_transform(self.documents)

    def prepare_context(self, query: str) -> str:
        """Prepare context for the model using relevant course content and chat history."""
        # Get relevant course content
        relevant_courses = self.find_relevant_courses(query)
        
        if not relevant_courses:
            return "I couldn't find any relevant courses for your query."
        
        # Create context with formatted course information
        context = "Relevant course materials:\n\n"
        for course in relevant_courses:
            context += self.format_course_info(course) + "\n" + "-"*50 + "\n"
        
        # Combine chat history and new query
        context_parts = [
            "Previous context:",
            *[f"{'User: ' if i%2==0 else 'Assistant: '}{msg}" 
              for i, msg in enumerate(self.chat_history[-self.context_window:])],
            f"Current query: {query}",
            context
        ]
        
        return "\n".join(context_parts)

    def format_course_info(self, course: Dict) -> str:
        """Format course information in a readable way"""
        info = f"Course: {course['moduleCode']} - {course['moduleTitle']}\n"
        info += f"Semester: {course['semester']}\n"
        info += f"Credits: {course['credits']}\n"
        info += f"Type: {course['compulsoryOrElective']}\n"
        
        if course.get('prerequisitesOrCorequisites'):
            prereqs = course['prerequisitesOrCorequisites']
            if prereqs and prereqs[0]:  # Check if prerequisites exist and aren't empty
                info += f"Prerequisites: {', '.join(prereqs)}\n"
        
        if course.get('learningOutcomes'):
            info += "\nLearning Outcomes:\n- "
            info += "\n- ".join(course['learningOutcomes'])
        
        if course.get('syllabusOutline') and course['syllabusOutline'].get('content'):
            info += "\n\nMain Topics:\n"
            for topic in course['syllabusOutline']['content']:
                info += f"- {topic.get('topic', '')}\n"
        
        return info

    def find_relevant_courses(self, query: str, top_k: int = 3) -> List[Dict]:
        """Find most relevant courses for the given query"""
        if not self.course_data:
            return []
            
        try:
            # Create query vector
            query_vector = self.vectorizer.transform([query])
            
            # Calculate similarities
            similarities = cosine_similarity(query_vector, self.tfidf_matrix)
            
            # Get top-k most similar documents
            top_indices = np.argsort(similarities[0])[-top_k:][::-1]
            return [self.course_data[i] for i in top_indices]
            
        except Exception as e:
            logger.error(f"Error getting relevant courses: {str(e)}")
            return []

    def generate_response(self, query: str) -> str:
        """Generate a response based on the query and relevant courses using Gemini"""
        try:
            # Prepare context
            context = self.prepare_context(query)
            
            # Construct the prompt
            full_prompt = f"{self.system_prompt}\n\nContext:\n{context}\n\nResponse:"
            
            # Generate response with specific parameters
            response = self.model.generate_content(
                full_prompt,
                generation_config={
                    'temperature': self.temperature,
                    'max_output_tokens': self.max_tokens,
                    'top_p': 0.8,
                    'top_k': 40
                }
            )
            
            # Update chat history
            self.chat_history.extend([query, response.text])
            
            # Trim chat history if it gets too long
            if len(self.chat_history) > self.context_window * 2:
                self.chat_history = self.chat_history[-self.context_window * 2:]
            
            return response.text
            
        except Exception as e:
            logger.error(f"Error generating response: {e}")
            # Fallback response with basic course information
            return "I apologize, but I encountered an error. Please try again."
        
    def set_temperature(self, temperature: float) -> None:
        """Adjust the temperature (creativity) of responses."""
        if 0 <= temperature <= 1:
            self.temperature = temperature
            logger.info(f"Temperature updated to {temperature}")
        else:
            raise ValueError("Temperature must be between 0 and 1")

    def set_max_tokens(self, max_tokens: int) -> None:
        """Set maximum tokens for response."""
        if max_tokens > 0:
            self.max_tokens = max_tokens
            logger.info(f"Max tokens updated to {max_tokens}")
        else:
            raise ValueError("Max tokens must be greater than 0")

    def update_system_prompt(self, new_prompt: str) -> None:
        """Update the system prompt."""
        if new_prompt.strip():
            self.system_prompt = new_prompt
            logger.info("System prompt updated")
        else:
            raise ValueError("System prompt cannot be empty")

    def clear_chat_history(self) -> None:
        """Clear the chat history."""
        self.chat_history = []
        logger.info("Chat history cleared")

    def set_context_window(self, size: int) -> None:
        """Set the size of the context window."""
        if size > 0:
            self.context_window = size
            logger.info(f"Context window size updated to {size}")
        else:
            raise ValueError("Context window size must be greater than 0")

    def get_chat_history(self) -> List[str]:
        """Return the current chat history."""
        return self.chat_history

    def refresh_course_data(self) -> None:
        """Refresh course data from the database."""
        self.documents = []
        self.course_data = []
        self.prepare_data()
        logger.info("Course data refreshed")