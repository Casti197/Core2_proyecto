import React, { useState, useEffect, useRef } from 'react';
import { Send, BrainCircuit } from 'lucide-react';
import { Button, Textarea } from '../ui/Base';
import { askMentor } from '../../services/geminiService';
import { Message } from '../../types';

export const ChatView = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', content: '¡Hola! Soy tu asistente de Persona y Afectividad. ¿Qué duda tienes sobre la clase o cómo mejorar tu relación hoy?' }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    const response = await askMentor(userMessage);
    
    setMessages(prev => [...prev, { role: 'ai', content: response }]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] pb-18 animate-in fade-in duration-500">
      <div className="flex-1 overflow-y-auto space-y-4 p-2 scrollbar-hide" ref={scrollRef}>
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-4 rounded-2xl ${
              m.role === 'user' ? 'bg-rose-500 text-white rounded-tr-none shadow-md' : 'bg-white border border-slate-100 text-slate-700 shadow-sm rounded-tl-none'
            }`}>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.content}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="p-4 bg-slate-100 rounded-2xl text-xs font-bold text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 bg-rose-400 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-rose-400 rounded-full animate-bounce delay-75"></span>
              <span className="w-2 h-2 bg-rose-400 rounded-full animate-bounce delay-150"></span>
              <span>EL MENTOR ESTÁ PENSANDO...</span>
            </div>
          </div>
        )}
      </div>
      <div className="pt-4 flex gap-2">
        <Textarea 
          placeholder="Duda sobre antropología..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          className="min-h-12 max-h-32"
        />
        <Button 
          disabled={loading || !input.trim()} 
          onClick={handleSend} 
          className="w-12 h-12 p-0 flex-shrink-0"
          id="send-message-button"
        >
          <Send size={20} />
        </Button>
      </div>
    </div>
  );
};
