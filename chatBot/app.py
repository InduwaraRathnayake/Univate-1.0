from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, List
import logging

from pymongo import MongoClient
import os
from dotenv import load_dotenv
import google.generativeai as genai
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Your Next.js frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Query(BaseModel):
    message: str

class CourseBot:
    def __init__(self):
        # Load environment variables
        load_dotenv()
        
        # Initialize MongoDB connection
        self.client = MongoClient(os.getenv('MONGODB_URI', 'mongodb://localhost:27017/'))
        self.db = self.client['Univate01']
        self.collection = self.db['modules']
        
        # Initialize Gemini
        genai.configure(api_key=os.getenv('GOOGLE_API_KEY'))
        self.model = genai.GenerativeModel('gemini-1.5-pro')
        
        # Initialize vectorizer
        self.vectorizer = TfidfVectorizer(stop_words='english')
        self.documents = []
        self.course_data = []
        self.prepare_data()

    def prepare_data(self):
        """Prepare course data for searching"""
        courses = list(self.collection.find({}))
        
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
        query_vector = self.vectorizer.transform([query])
        similarities = cosine_similarity(query_vector, self.tfidf_matrix)
        
        # Get top-k most similar courses
        top_indices = np.argsort(similarities[0])[-top_k:][::-1]
        return [self.course_data[i] for i in top_indices]

    def generate_response(self, query: str) -> str:
        """Generate a response based on the query and relevant courses using Gemini"""
        relevant_courses = self.find_relevant_courses(query)
        
        if not relevant_courses:
            return "I couldn't find any relevant courses for your query."
        
        # Create context with formatted course information
        context = "Based on the following courses:\n\n"
        for course in relevant_courses:
            context += self.format_course_info(course) + "\n" + "-"*50 + "\n"
        
        try:
            # Generate response using Gemini
            prompt = f"""You are a helpful course advisor for a computer science department. 
            Answer the following query based on the course information provided.
            Be concise but informative, and make sure to mention relevant course codes when discussing specific courses.
            
            Context:
            {context}
            
            Query: {query}
            
            Please provide a helpful response that directly addresses the query while referencing specific courses and their relevant details."""

            response = self.model.generate_content(prompt)
            return response.text
            
        except Exception as e:
            logger.error(f"Error generating response: {e}")
            # Fallback response with basic course information
            return f"Based on your query about '{query}', I found these relevant courses:\n\n" + \
                   "\n\n".join([self.format_course_info(c) for c in relevant_courses])

bot = None

# Initialize the bot
@app.on_event("startup")
async def startup_event():
    global bot
    try:
        bot = CourseBot()
        logger.info("CourseBot initialized successfully")
    except Exception as e:
        logger.error(f"Failed to initialize CourseBot: {str(e)}")
        raise

@app.post("/api/chat")
async def chat(query: Query):
    try:
        logger.info(f"Received query: {query.message}")
        
        if not bot:
            raise HTTPException(status_code=500, detail="ChatBot not initialized")
            
        response = bot.generate_response(query.message)
        logger.info(f"Generated response successfully")
        
        return {"response": response}
    except Exception as e:
        logger.error(f"Error processing chat request: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")