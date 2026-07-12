import React, { useState, useEffect, useRef } from 'react';
import { Bot, User, AlertCircle, Send, Zap, Database } from 'lucide-react';
import { reviewDatabase } from '../mockData';

export default function RagChatView({ messages, setMessages, retrievedDocs, setRetrievedDocs }) {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendQuery = (queryText) => {
    if (!queryText.trim()) return;

    const userMsg = { role: 'user', content: queryText };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    setRetrievedDocs([]);

    setTimeout(() => {
      const lowerInput = queryText.toLowerCase();
      let matchedDocs = [];
      let aiResponseText = "Entschuldigung, für diese spezifische Anfrage habe ich im aktuellen Prototypen keine Daten hinterlegt. Bitte nutzen Sie den vorgesehenen Demo-Prompt für die Bewerberanalyse.";

      if (lowerInput.includes("bewerber") && lowerInput.includes("prozess") ) {
        matchedDocs = reviewDatabase; 
        
        aiResponseText = `Basierend auf der Analyse aktueller, verifizierter Bewerber-Bewertungen aus unserer ChromaDB gibt es im Recruiting-Prozess der Nordzucker AG akuten Handlungsbedarf. Die Kritikpunkte konzentrieren sich auf folgende Kernbereiche:

1. **Fehlende Transparenz:** Bewerber bemängeln das Ausbleiben von Zwischenbescheiden. Es wird von "völliger Funkstille" und nicht eingehaltenen Rückmeldefristen berichtet.
2. **Extrem lange Wartezeiten:** Mehrere Kandidaten berichten von Prozessen, die sich über zwei Monate hinziehen, was zu hoher Frustration führt.
3. **Mangelnde Wertschätzung:** Bewerber haben teilweise das Gefühl, "warmgehalten" oder als "zweite Wahl" behandelt zu werden.

**Empfohlene HR-Priorität:** Der Auswahlprozess muss dringend verschlankt werden. Die Einführung automatisierter Status-Updates (SLAs) im Bewerbermanagementsystem ist essenziell, um Talentabwanderung an regionale Wettbewerber zu verhindern.`;
      }

      setRetrievedDocs(matchedDocs);
      
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'assistant', content: aiResponseText }]);
        setIsTyping(false);
      }, 1500); 
    }, 800); 
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-160px)] md:h-[calc(100vh-140px)] animate-in fade-in duration-500">
      <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
        
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-slate-50/50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-3 md:gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot size={16} className="text-emerald-700" />
                </div>
              )}
              
              <div className={`px-4 md:px-5 py-3 md:py-4 rounded-2xl text-sm max-w-[90%] md:max-w-[85%] shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-slate-800 text-white rounded-br-none' 
                  : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none whitespace-pre-wrap leading-relaxed'
              }`}>
                {msg.content}
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center flex-shrink-0 mt-1">
                  <User size={16} className="text-slate-600" />
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-4 justify-start">
               <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-200 flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot size={16} className="text-emerald-700" />
                </div>
                <div className="px-5 py-4 rounded-2xl bg-white border border-slate-200 rounded-bl-none flex gap-2 items-center shadow-sm">
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                  <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  <span className="text-xs text-slate-500 ml-2 font-medium hidden md:inline">Verarbeite Kontext...</span>
                </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="p-4 md:p-5 bg-white border-t border-slate-200">
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2 no-scrollbar">
            <button 
              onClick={() => sendQuery("Warum kritisieren Bewerber den Prozess?")}
              className="whitespace-nowrap flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-200 px-4 py-2 rounded-full text-sm font-semibold hover:bg-emerald-100 transition shadow-sm"
            >
              <AlertCircle size={16} />"Warum kritisieren Bewerber den Prozess?"
            </button>
          </div>

          <div className="flex gap-2 md:gap-3">
            <input 
              type="text"
              value={input}
              disabled={isTyping}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendQuery(input)}
              placeholder="Query parameter..."
              className="flex-1 px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition disabled:opacity-60"
            />
            <button 
              aria-label="Nachricht senden"
              onClick={() => sendQuery(input)}
              disabled={!input.trim() || isTyping}
              className="bg-emerald-600 text-white px-4 md:px-5 py-3 rounded-xl font-medium hover:bg-emerald-700 transition disabled:opacity-50 flex items-center justify-center shadow-sm"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-6 overflow-y-auto">
        <div className="bg-slate-900 text-white rounded-xl shadow-lg p-6">
          <h3 className="font-bold flex items-center gap-2 mb-3 text-emerald-400"><Zap size={18}/> RAG Transparenz</h3>
          <p className="text-sm text-slate-300 leading-relaxed">
            LLM-Antworten werden durch Vektordatenbankabfragen (ChromaDB) geerdet, um deterministische und nachvollziehbare Ergebnisse zu gewährleisten.
          </p>
        </div>

        {retrievedDocs.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 animate-in slide-in-from-right duration-500">
            <h3 className="font-bold text-slate-800 mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
              <Database size={16} className="text-blue-500"/> 
              Extrahierte Metadaten
            </h3>
            <div className="space-y-4">
              {retrievedDocs.map((doc, idx) => (
                <div key={idx} className="bg-blue-50 border border-blue-100 rounded-lg p-4 relative">
                   <div className="absolute -left-2 -top-2 bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shadow-sm">
                    {idx + 1}
                  </div>
                  <div className="flex justify-between items-center mb-2 pl-2">
                    <span className="text-xs font-bold bg-blue-200 text-blue-800 px-2 py-0.5 rounded">
                      {doc.source}
                    </span>
                    <span className="text-[10px] text-slate-500 font-medium">
                      {doc.date}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 italic pl-2">"{doc.text}"</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}