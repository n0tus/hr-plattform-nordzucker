JavaScript

import React, { useState, useEffect, useRef } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { 
  MessageSquare, BarChart2, Target, Search, 
  Send, Bot, User, AlertCircle, CheckCircle, TrendingUp, Briefcase, Zap, Info, Clock, MapPin,
  Filter, BellRing, Lightbulb, Database, Menu, X
} from 'lucide-react';

const baseSentiment = {
  all: [
    { name: 'Positiv', value: 88, color: '#10b981' },
    { name: 'Neutral', value: 8, color: '#fbbf24' },
    { name: 'Negativ', value: 4, color: '#ef4444' }
  ],
  production: [
    { name: 'Positiv', value: 75, color: '#10b981' },
    { name: 'Neutral', value: 15, color: '#fbbf24' },
    { name: 'Negativ', value: 10, color: '#ef4444' }
  ],
  admin: [
    { name: 'Positiv', value: 92, color: '#10b981' },
    { name: 'Neutral', value: 5, color: '#fbbf24' },
    { name: 'Negativ', value: 3, color: '#ef4444' }
  ]
};

const baseTopics = {
  all: [
    { topic: 'Arbeitsbed.', positiv: 84, negativ: 16 },
    { topic: 'Work-Life', positiv: 82, negativ: 18 },
    { topic: 'Gehalt', positiv: 84, negativ: 16 },
    { topic: 'Karriere', positiv: 70, negativ: 30 },
    { topic: 'Bewerbung', positiv: 48, negativ: 52 },
  ],
  production: [
    { topic: 'Arbeitsbed.', positiv: 65, negativ: 35 }, 
    { topic: 'Work-Life', positiv: 60, negativ: 40 }, 
    { topic: 'Gehalt', positiv: 88, negativ: 12 }, 
    { topic: 'Karriere', positiv: 50, negativ: 50 },
    { topic: 'Bewerbung', positiv: 55, negativ: 45 },
  ],
  admin: [
    { topic: 'Arbeitsbed.', positiv: 95, negativ: 5 }, 
    { topic: 'Work-Life', positiv: 92, negativ: 8 },
    { topic: 'Gehalt', positiv: 75, negativ: 25 }, 
    { topic: 'Karriere', positiv: 78, negativ: 22 },
    { topic: 'Bewerbung', positiv: 45, negativ: 55 },
  ]
};

const competitorData = [
  { subject: 'Work-Life-Balance', Nordzucker: 4.1, Südzucker: 3.7, PfeiferLangen: 3.3, fullMark: 5 },
  { subject: 'Gehalt & Soziales', Nordzucker: 4.2, Südzucker: 4.3, PfeiferLangen: 3.8, fullMark: 5 },
  { subject: 'Karriere/Weiterbildung', Nordzucker: 3.5, Südzucker: 3.6, PfeiferLangen: 2.9, fullMark: 5 },
  { subject: 'Kultur & Kollegen', Nordzucker: 3.9, Südzucker: 3.8, PfeiferLangen: 3.1, fullMark: 5 },
  { subject: 'Kommunikation', Nordzucker: 3.5, Südzucker: 3.3, PfeiferLangen: 2.7, fullMark: 5 },
  { subject: 'Arbeitsbedingungen', Nordzucker: 4.2, Südzucker: 3.9, PfeiferLangen: 3.4, fullMark: 5 },
];

const regionalCompetitorData = [
  { subject: 'Gesamt-Score', Nordzucker: 3.8, VW_FS: 4.2, Siemens: 3.9, NewYorker: 3.1, fullMark: 5 },
  { subject: 'Work-Life-Balance', Nordzucker: 4.1, VW_FS: 4.0, Siemens: 3.8, NewYorker: 2.8, fullMark: 5 },
  { subject: 'Gehalt & Soziales', Nordzucker: 4.2, VW_FS: 4.5, Siemens: 4.0, NewYorker: 3.0, fullMark: 5 },
  { subject: 'Karriere & Aufstieg', Nordzucker: 3.5, VW_FS: 3.9, Siemens: 3.7, NewYorker: 3.1, fullMark: 5 },
  { subject: 'Kultur', Nordzucker: 3.9, VW_FS: 4.1, Siemens: 3.7, NewYorker: 2.9, fullMark: 5 },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('chat'); 
  const [department, setDepartment] = useState('all'); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavClick = (tab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 z-20 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <aside className={`fixed md:static inset-y-0 left-0 w-64 bg-slate-900 text-slate-300 flex flex-col shadow-2xl z-30 transition-transform duration-300 ease-in-out ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        <div className="p-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-500 rounded-md flex items-center justify-center text-white font-bold text-xl">N</div>
            <span className="text-xl font-bold text-white tracking-tight">HR Intelligence</span>
          </div>
          <button className="md:hidden text-slate-400 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
          <NavItem icon={<BarChart2 />} label="Live Dashboard" active={activeTab === 'dashboard'} onClick={() => handleNavClick('dashboard')} />
          <NavItem icon={<Target />} label="Wettbewerb" active={activeTab === 'competitor'} onClick={() => handleNavClick('competitor')} />
          <NavItem icon={<MessageSquare />} label="KI-Assistent (RAG)" active={activeTab === 'chat'} onClick={() => handleNavClick('chat')} />
          <NavItem icon={<Lightbulb />} label="Strategie & Actions" active={activeTab === 'actions'} onClick={() => handleNavClick('actions')} />
        </nav>
        
        <div className="p-5 border-t border-slate-800 text-xs text-slate-400 bg-slate-950/50 leading-relaxed">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-emerald-400 font-semibold tracking-wide">SYSTEM ONLINE</span>
          </div>
          Modell: <span className="text-slate-200 font-medium">Gemini 1.5 Pro</span><br/>
          Speicher: ChromaDB
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden relative">
        <header className="bg-white border-b border-slate-200 px-4 md:px-8 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 z-10 shadow-sm shrink-0">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="md:hidden text-slate-600 hover:text-slate-900 p-1 -ml-1" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={24} />
            </button>
            <h1 className="text-lg md:text-2xl font-bold text-slate-800 truncate">
              {activeTab === 'dashboard' && 'Employer Branding Dashboard'}
              {activeTab === 'competitor' && 'Wettbewerbsvergleich'}
              {activeTab === 'chat' && 'RAG Copilot (Gemini Enterprise)'}
              {activeTab === 'actions' && 'KI-Empfohlene Handlungsfelder'}
            </h1>
          </div>
          
          {activeTab === 'dashboard' && (
            <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
              <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-1 border border-slate-200 w-full md:w-auto">
                <Filter size={16} className="text-slate-500 ml-2 shrink-0" />
                <select 
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="bg-transparent text-sm font-medium text-slate-700 focus:outline-none cursor-pointer py-1 pr-2 w-full md:w-auto truncate"
                >
                  <option value="all">Alle Bereiche (Konzern)</option>
                  <option value="production">Nur Produktion / Werke</option>
                  <option value="admin">Nur Verwaltung / IT</option>
                </select>
              </div>
            </div>
          )}
        </header>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {activeTab === 'dashboard' && <DashboardView department={department} />}
          {activeTab === 'competitor' && <CompetitorView />}
          {activeTab === 'chat' && <RagChatView />}
          {activeTab === 'actions' && <ActionsView />}
        </div>
      </main>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${
        active ? 'bg-emerald-600 text-white shadow-md' : 'hover:bg-slate-800 hover:text-white'
      }`}
    >
      {React.cloneElement(icon, { size: 20 })}
      <span className="font-medium truncate">{label}</span>
    </button>
  );
}

function RagChatView() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Guten Tag. Ich bin das Gemini RAG-System für Nordzucker. Mein "Wissens-Gedächtnis" ist geladen und bereit. Wie kann ich die aktuellen Unternehmensdaten für Sie auswerten?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [retrievedDocs, setRetrievedDocs] = useState([]);
  const chatEndRef = useRef(null);

  const reviewDatabase = [
    { id: 1, source: "Kununu (Bewerber)", date: "Juni 2024", text: "Nach über einem Monat völliger Funkstille kam ein Anruf mit Rückfragen. Letztlich erhielt ich eine Standardabsage ohne jegliches Feedback, also insgesamt über zwei Monate nach meiner Bewerbung. Keine Zwischenbescheide oder transparente Kommunikation. Stattdessen hatte ich am Ende das deutliche Gefühl, nur 'zweite Wahl' gewesen zu sein und warmgehalten zu werden." },
    { id: 2, source: "Kununu (Bewerber)", date: "Januar 2025", text: "Es wird der 200% Kandidat gesucht - beim heutigen Arbeitsmarkt allerdings sollte man sich schneller entscheiden. Ganz ehrlich: Man braucht keine zwei Monate, um über eine Bewerbung zu entscheiden. Schon gar nicht, wenn in der Ausschreibung 'ab sofort' steht." },
    { id: 3, source: "Kununu (Bewerber)", date: "Juli 2023", text: "Positiver Eindruck, den das Unternehmen nach dem zweiten Gespräch ins Gegenteil verändert hat. Dem Bewerber eine Rückmeldung zukommen lassen, wenn das seitens des Unternehmens im Gespräch schon so avisiert wird, sollte wohl drin sein." }
  ];

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
      let aiResponseText = "Entschuldigung, für diese spezifische Anfrage habe ich im aktuellen Offline-Prototypen keine Daten hinterlegt. Bitte nutzen Sie den vorgesehenen Demo-Prompt für die Bewerberanalyse.";

      if (lowerInput.includes("bewerber") || lowerInput.includes("prozess") || lowerInput.includes("warum")) {
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
                  <span className="text-xs text-slate-500 ml-2 font-medium hidden md:inline">Gemini verarbeitet Kontext...</span>
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
              <AlertCircle size={16} />
              "Warum kritisieren Bewerber den Prozess?"
            </button>
          </div>

          <div className="flex gap-2 md:gap-3">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendQuery(input)}
              placeholder="Frage an die Daten..."
              className="flex-1 px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition"
            />
            <button 
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
            Um Halluzinationen zu verhindern, greift das Modell auf echte Textfragmente aus unserer Vektordatenbank (ChromaDB) zu.
          </p>
        </div>

        {retrievedDocs.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 animate-in slide-in-from-right duration-500">
            <h3 className="font-bold text-slate-800 mb-4 text-sm uppercase tracking-wider flex items-center gap-2">
              <Database size={16} className="text-blue-500"/> 
              Extrahierte Fakten (Kontext)
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

function DashboardView({ department }) {
  const kpis = {
    all: { score: '3.8', rec: '88%', top: 'Arbeitsbed.', crit: 'Bewerbung', trend: [3.7, 3.7, 3.8, 3.8, 3.8, 4.1] },
    production: { score: '3.6', rec: '76%', top: 'Gehalt', crit: 'Work-Life', trend: [3.5, 3.5, 3.4, 3.6, 3.6, 3.6] },
    admin: { score: '4.0', rec: '94%', top: 'Work-Life', crit: 'Karriere', trend: [3.9, 3.9, 4.0, 4.0, 4.0, 4.1] }
  };
  
  const currentKpi = kpis[department];
  const trendData = currentKpi.trend.map((score, i) => ({ month: ['Jan', 'Feb', 'Mrz', 'Apr', 'Mai', 'Jun'][i], score }));

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {department === 'production' && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-4 text-amber-800 shadow-sm items-start">
          <BellRing className="shrink-0 text-amber-600 animate-bounce" />
          <div>
            <h4 className="font-bold flex items-center gap-2">KI-Frühwarnung (Predictive Alert)</h4>
            <p className="text-sm mt-1">Die NLP-Analyse erkennt einen <b>24%igen Anstieg negativer Phrasen</b> im Zusammenhang mit der kommenden Rübenkampagne in den Werk-Bewertungen. Empfehlung: Präventive Kommunikation zur Personalplanung starten.</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <KPICard title="Kununu Score (Filter)" value={currentKpi.score} icon={<Search className="text-blue-500" />} trend="Ø Branche: 3.5" />
        <KPICard title="Weiterempfehlung" value={currentKpi.rec} icon={<CheckCircle className="text-emerald-500" />} trend="Verifizierte Daten" />
        <KPICard title="Top Stärke" value={currentKpi.top} icon={<TrendingUp className="text-emerald-500" />} trend="Aus Text-Mining" />
        <KPICard title="Kritisches Feld" value={currentKpi.crit} icon={<AlertCircle className="text-red-500" />} trend="Prio HR-Maßnahme" isCritical={true} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold mb-1 text-slate-800">Stimmung</h3>
          <p className="text-xs text-slate-500 mb-4">Basis: Freitexte der letzten 12 Monate</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={baseSentiment[department]} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {baseSentiment[department].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '8px' }}/>
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold mb-1 text-slate-800">Trend Score (Letzte 6 Monate)</h3>
          <p className="text-xs text-slate-500 mb-4">Mitarbeiterzufriedenheit im Zeitverlauf</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9"/>
                <XAxis dataKey="month" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                <YAxis domain={[3.0, 5.0]} tick={{fontSize: 12}} axisLine={false} tickLine={false}/>
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none' }}/>
                <Line type="monotone" dataKey="score" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 lg:col-span-2">
          <h3 className="text-lg font-bold mb-1 text-slate-800">Themen-Cluster (Stärken & Schwächen)</h3>
          <p className="text-xs text-slate-500 mb-4">Prozentuale Verteilung von Positiv/Negativ in Bewertungen</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={baseTopics[department]} margin={{ top: 5, right: 30, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9"/>
                <XAxis dataKey="topic" tick={{fontSize: 10}} axisLine={false} tickLine={false} />
                <YAxis tick={{fontSize: 12}} axisLine={false} tickLine={false}/>
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '8px', border: 'none' }}/>
                <Legend />
                <Bar dataKey="positiv" name="Positiv" stackId="a" fill="#10b981" radius={[0, 0, 4, 4]} maxBarSize={50} />
                <Bar dataKey="negativ" name="Kritisch" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} maxBarSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function KPICard({ title, value, icon, trend, isCritical = false }) {
  return (
    <div className={`bg-white p-5 rounded-xl shadow-sm border ${isCritical ? 'border-red-200 bg-red-50/20' : 'border-slate-100'} hover:shadow-md transition-shadow`}>
      <div className="flex justify-between items-start mb-3">
        <h4 className="text-slate-500 font-medium text-sm">{title}</h4>
        <div className={`p-2 rounded-lg shrink-0 ${isCritical ? 'bg-red-100' : 'bg-slate-50'}`}>{icon}</div>
      </div>
      <div className={`text-2xl md:text-3xl font-bold mb-1 ${isCritical ? 'text-red-600' : 'text-slate-800'}`}>{value}</div>
      <div className={`text-xs font-medium ${isCritical ? 'text-red-500' : 'text-slate-400'}`}>{trend}</div>
    </div>
  );
}

function CompetitorView() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 flex gap-4 text-blue-800 shadow-sm items-start">
        <Info className="shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold">Echte Marktdaten & Standort-Analysen</h4>
          <p className="text-sm mt-1">Nordzucker dominiert im Industrie-Branchenvergleich. Der Regional-Vergleich zeigt jedoch eine hohe Konkurrenzsituation bei Fachkräften am Hauptstandort Braunschweig.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 lg:col-span-2 overflow-x-auto">
          <div className="flex justify-between items-center mb-4 min-w-[500px]">
            <h3 className="text-lg font-bold text-slate-800">Industrie-Benchmark: Direkter Wettbewerb</h3>
          </div>
          <div className="h-80 mt-4 min-w-[500px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={competitorData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="subject" tick={{fontSize: 10, fill: '#64748b'}} />
                <YAxis domain={[0, 5]} tick={{fontSize: 12, fill: '#64748b'}} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '8px', border: 'none' }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }}/>
                <Bar dataKey="Nordzucker" fill="#10b981" radius={[4, 4, 0, 0]} barSize={25} />
                <Bar dataKey="Südzucker" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={25} />
                <Bar dataKey="PfeiferLangen" name="Pfeifer & Langen" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={25} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold mb-4 text-slate-800 flex items-center gap-2"><Target size={18}/> Industrie-USPs</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle size={16} className="text-emerald-500 mt-0.5 shrink-0"/> 
                <span><b>Arbeitsbedingungen (4.2)</b><br/><span className="text-slate-500 text-xs">Nordzucker schlägt hier Südzucker deutlich.</span></span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle size={16} className="text-emerald-500 mt-0.5 shrink-0"/> 
                <span><b>Work-Life-Balance (4.1)</b><br/><span className="text-slate-500 text-xs">Klarer Vorteil durch Hansefit & Homeoffice.</span></span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold mb-4 text-slate-800 flex items-center gap-2"><AlertCircle size={18}/> Angriffsfläche</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm">
                <AlertCircle size={16} className="text-red-500 mt-0.5 shrink-0"/> 
                <span><b>Karrierewege (3.5)</b><br/><span className="text-slate-500 text-xs">Südzucker schneidet hier leicht besser ab (3.6).</span></span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <AlertCircle size={16} className="text-red-500 mt-0.5 shrink-0"/> 
                <span><b>Kommunikation (3.5)</b><br/><span className="text-slate-500 text-xs">Besonders Azubis klagen über mangelnden Informationsfluss.</span></span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-6 border-t border-slate-200">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 lg:col-span-2 relative overflow-hidden overflow-x-auto">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-500"></div>
          <div className="flex justify-between items-center mb-4 min-w-[500px]">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <MapPin size={20} className="text-indigo-500"/> Regionaler Talent-Wettbewerb (Braunschweig)
            </h3>
          </div>
          <div className="h-80 mt-4 min-w-[500px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={regionalCompetitorData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="subject" tick={{fontSize: 10, fill: '#64748b'}} />
                <YAxis domain={[0, 5]} tick={{fontSize: 12, fill: '#64748b'}} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '8px', border: 'none' }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }}/>
                <Bar dataKey="Nordzucker" fill="#10b981" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="VW_FS" name="VW Financial Services" fill="#0ea5e9" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="Siemens" name="Siemens Mobility" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="NewYorker" name="NewYorker" fill="#f43f5e" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function ActionsView() {
  return (
    <div className="max-w-5xl animate-in fade-in duration-500 space-y-6">
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">Data to Value Pipeline</h2>
        <p className="text-sm md:text-base text-slate-600">Aus der Menge an Bewertungen hat die KI folgende strategische Initiativen abgeleitet.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1.5 h-full bg-red-500"></div>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-red-50 rounded-lg text-red-600 shrink-0"><Clock size={24}/></div>
            <div>
              <h3 className="font-bold text-slate-800 text-base md:text-lg">Bewerber-Experience reparieren</h3>
              <span className="text-xs font-medium text-slate-500">Prio: Kritisch</span>
            </div>
          </div>
          <p className="text-sm text-slate-600 mb-4">Daten zeigen verheerende Bewertungen im Bewerbungsprozess. Bewerber warten bis zu 2 Monate auf Feedback.</p>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
            <h4 className="text-xs font-bold text-slate-700 mb-2 uppercase">Sofort-Maßnahmen:</h4>
            <ul className="text-sm text-slate-600 space-y-1 list-disc pl-4">
              <li>"7-Tage-Feedback-Regel" (SLA) einführen.</li>
              <li>Automatisierte Status-Mails aktivieren.</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1.5 h-full bg-emerald-500"></div>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600 shrink-0"><Briefcase size={24}/></div>
            <div>
              <h3 className="font-bold text-slate-800 text-base md:text-lg">Offensive: Work-Life-Balance</h3>
              <span className="text-xs font-medium text-slate-500">Prio: Hoch</span>
            </div>
          </div>
          <p className="text-sm text-slate-600 mb-4">Nordzucker führt die Industrie beim Thema Arbeitsbedingungen an. Wettbewerber P&L ist deutlich schwächer.</p>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
            <h4 className="text-xs font-bold text-slate-700 mb-2 uppercase">Maßnahmen:</h4>
            <ul className="text-sm text-slate-600 space-y-1 list-disc pl-4">
              <li>"Hansefit, Gleitzeit, Homeoffice" als Kern-Headline in Stellenanzeigen nutzen.</li>
              <li>Mitarbeiter-Testimonial-Kampagne starten.</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 relative overflow-hidden md:col-span-2">
          <div className="absolute top-0 right-0 w-1.5 h-full bg-blue-500"></div>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-50 rounded-lg text-blue-600 shrink-0"><TrendingUp size={24}/></div>
            <div>
              <h3 className="font-bold text-slate-800 text-base md:text-lg">Transparente Gehaltsentwicklungen</h3>
              <span className="text-xs font-medium text-slate-500">Prio: Mittel</span>
            </div>
          </div>
          <p className="text-sm text-slate-600 mb-4">Das Grundgehalt wird stark gelobt, aber Mitarbeiter empfinden Gehaltserhöhungen als langwierig und intransparent.</p>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
            <h4 className="text-xs font-bold text-slate-700 mb-2 uppercase">Maßnahmen:</h4>
            <ul className="text-sm text-slate-600 space-y-1 list-disc pl-4">
              <li>Strukturierte Jahresgespräche mit standardisierten Gehalts-Review-Prozessen etablieren.</li>
              <li>Aufzeigen klarer Leistungs-Meilensteine für außertarifliche Boni.</li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}