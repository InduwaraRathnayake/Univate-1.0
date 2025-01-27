'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoMdClose } from 'react-icons/io';
import { IoChatbubbleEllipsesSharp } from 'react-icons/io5';

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
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Add ref for the messages container
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom function
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Show tooltip after a short delay
    const tooltipTimer = setTimeout(() => {
      setShowTooltip(true);
    }, 1000);

    // Hide tooltip after 5 seconds
    const hideTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 6000);

    return () => {
      clearTimeout(tooltipTimer);
      clearTimeout(hideTimer);
    };
  }, []);

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
    <>
      {/* Chat button with tooltip */}
      <div className="fixed bottom-4 right-4 z-50">
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-full right-0 mb-20 bg-black text-white rounded-lg p-3 text-sm whitespace-nowrap shadow-lg"
            >
              <div className="relative">
                Need help? Chat with our Course Assistant! 👋
                <div className="absolute -bottom-2 right-4 w-0 h-0 
                              border-l-[8px] border-l-transparent
                              border-t-[8px] border-t-black
                              border-r-[8px] border-r-transparent">
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="fixed bottom-4 right-4 z-50"
        >
          <button
            onClick={() => setIsOpen(true)}
            className={`p-4 text-white rounded-full shadow-lg 
                     transition-all duration-200 
                     ${isOpen ? 'hidden' : 'flex'}
                     animate-gradient bg-gradient-to-r from-black via-gray-600 to-black
                     background-animate hover:shadow-xl`}
            style={{
              backgroundSize: '200% 200%',
            }}
          >
            <IoChatbubbleEllipsesSharp className="w-9 h-9" />
          </button>
        </motion.div>
      </div>

      {/* Chat popup */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-4 right-4 w-[calc(100vw-2rem)] md:w-[500px] z-50"
          >
            <div className="bg-white rounded-lg shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
              {/* Chat header */}
              <div className="bg-black text-white p-4 flex justify-between items-center">
                <div className="flex flex-row gap-3 items-center w-full">
                  <h2 className="font-semibold">Course Assistant</h2>
                  <img src="/logo.png" alt="Bot" className="w-28 rounded-2xl bg-black relative border border-white" />
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  <IoMdClose className="w-6 h-6" />
                </button>
              </div>

              {/* Chat messages - add scroll container ref */}
              <div className="h-[500px] overflow-y-auto p-4 space-y-4 scroll-smooth">
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
                      <div className="whitespace-pre-wrap text-sm md:text-base flex flex-row gap-2 items-start">
                        {message.role !== 'user' && <img src="/logoBadge.png" alt="Bot" className="w-8 h-8 rounded-full bg-black relative" />}
                        <span className="flex-1">
                          {message.content.split('\n').map((line, index) => {
                            const formattedLine = line.trim().replace(
                              /\*\*(.+?)\*\*/g, 
                              '<strong>$1</strong>'
                            );
                            
                            return (
                              <div key={index} className="mb-2">
                                {line.startsWith('*') ? (
                                  <div className="flex gap-2">
                                    <span className="block w-2 h-2 rounded-full bg-black dark:bg-white mt-2"></span>
                                    <span 
                                      dangerouslySetInnerHTML={{ 
                                        __html: formattedLine.substring(1).trim() 
                                      }} 
                                    />
                                  </div>
                                ) : (
                                  <span 
                                    dangerouslySetInnerHTML={{ 
                                      __html: formattedLine 
                                    }} 
                                  />
                                )}
                              </div>
                            );
                          })}
                        </span>
                        {message.role === 'user' && (
                          <img 
                            src="/userIcon.png" 
                            alt="User" 
                            className="w-8 h-8 rounded-full bg-gray-200 relative"
                          />
                        )}
                      </div>
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
                {/* Add invisible div at the bottom */}
                <div ref={messagesEndRef} />
              </div>

              {/* Input form */}
              <div className="border-t border-gray-200 dark:border-gray-700 p-4">
                <form onSubmit={handleSubmit} className="flex space-x-4">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about courses..."
                    className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                             bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                             focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white
                             placeholder-gray-500 dark:placeholder-gray-400"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-4 py-2 bg-black text-white rounded-lg
                             hover:bg-white hover:text-black border border-black
                             focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white
                             disabled:opacity-50 transition-colors duration-200
                             font-medium"
                  >
                    Send
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}