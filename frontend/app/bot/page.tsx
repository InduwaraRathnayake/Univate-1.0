import ChatBot from '@/components/Chatbot';

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-black py-28 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          Course Assistant
        </h1>
        <ChatBot />
      </div>
    </div>
  );
}