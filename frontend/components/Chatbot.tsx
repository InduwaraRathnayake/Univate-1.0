'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface Message {
  role: 'user' | 'bot';
  content: string;
}

const initialMessages: Message[] = [
  { 
    role: 'bot' as const, 
    content: 'Hello! I can help you find information about computer science courses. What would you like to know?' 
  },
  { 
    role: 'bot', 
    content: 'You can ask me about:\n• Course details and prerequisites\n• Programming and software engineering courses\n• Database and networking modules\n• Elective options and requirements' 
  },
  { 
    role: 'bot', 
    content: 'Feel free to ask questions like:\n"What programming courses are available?"\n"Tell me about database courses"\n"What are the prerequisites for Software Engineering?"' 
  }
];

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/chat', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ message: input })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to get response');
      }

      const data = await response.json();
      
      // Add bot response
      setMessages(prev => [...prev, { 
        role: 'bot' as const, 
        content: data.response || 'Sorry, I encountered an error.' 
      }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        role: 'bot' as const, 
        content: 'Sorry, I encountered an error.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 min-h-screen">
      <div className="bg-white  rounded-lg shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
        {/* Chat messages */}
        <div className="h-[600px] overflow-y-auto p-6 space-y-4">
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-4 ${
                  message.role === 'user'
                    ? 'bg-black text-white ml-auto'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                }`}
              >
                <p className="whitespace-pre-wrap text-sm md:text-base">
                  {message.content}
                </p>
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-black dark:bg-white rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-black dark:bg-white rounded-full animate-bounce delay-100" />
                  <div className="w-2 h-2 bg-black dark:bg-white rounded-full animate-bounce delay-200" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input form */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <form onSubmit={handleSubmit} className="flex space-x-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about courses..."
              className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                       focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white
                       placeholder-gray-500 dark:placeholder-gray-400"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg
                       hover:bg-gray-800 dark:hover:bg-gray-100
                       focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white
                       disabled:opacity-50 transition-colors duration-200
                       font-medium"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}