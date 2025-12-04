import React, { useState, useRef, useEffect } from 'react';
import { explainIngredient } from '../services/geminiService';
import { ChatMessage } from '../types';
import { MessageCircleIcon, SparklesIcon, ArrowRightIcon, LoaderIcon } from './Icons';

const IngredientChat: React.FC = () => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'assistant', content: "I can explain ingredients like 'Retinol' or 'Hyaluronic Acid'. What are you curious about?" }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = { id: Date.now().toString(), role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const response = await explainIngredient(userMsg.content);
      const aiMsg: ChatMessage = { id: (Date.now() + 1).toString(), role: 'assistant', content: response };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'assistant', content: "I'm having a little trouble connecting. Please try again." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl shadow-stone-200/50 border border-stone-100 overflow-hidden flex flex-col h-[550px] relative">
      <div className="absolute top-0 w-full bg-white/90 backdrop-blur-md p-4 border-b border-stone-100 flex items-center z-10">
        <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center mr-3">
            <SparklesIcon className="text-teal-700 w-4 h-4" />
        </div>
        <div>
            <h3 className="font-serif font-bold text-stone-800 text-sm">Ingredient Expert</h3>
            <p className="text-[10px] text-teal-600 font-bold tracking-wider uppercase">AI Assistant</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 pt-20 space-y-6 bg-stone-50/50">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
              msg.role === 'user' 
                ? 'bg-stone-800 text-white rounded-tr-none' 
                : 'bg-white text-stone-700 border border-stone-100 rounded-tl-none'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-stone-100 p-4 rounded-2xl rounded-tl-none shadow-sm">
              <div className="flex space-x-1">
                 <div className="w-2 h-2 bg-stone-300 rounded-full animate-bounce delay-100"></div>
                 <div className="w-2 h-2 bg-stone-300 rounded-full animate-bounce delay-200"></div>
                 <div className="w-2 h-2 bg-stone-300 rounded-full animate-bounce delay-300"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSend} className="p-4 bg-white border-t border-stone-100">
        <div className="relative flex items-center">
            <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type an ingredient..."
            className="w-full pl-5 pr-12 py-3 bg-stone-100 border-none rounded-2xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 text-stone-800 text-sm transition-all"
            />
            <button 
            type="submit" 
            disabled={loading || !input.trim()}
            className="absolute right-2 p-2 bg-stone-900 text-white rounded-xl hover:bg-teal-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
            <ArrowRightIcon className="w-4 h-4" />
            </button>
        </div>
      </form>
    </div>
  );
};

export default IngredientChat;