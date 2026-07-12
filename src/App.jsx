import React, { useState } from 'react';
import { BarChart2, Target, MessageSquare, Lightbulb, Menu, X, Filter } from 'lucide-react';
import DashboardView from './components/DashboardView';
import CompetitorView from './components/CompetitorView';
import RagChatView from './components/RagChatView';
import ActionsView from './components/ActionsView';

/**
 * Main Front-End Application Shell
 * Manages global routing (activeTab), filtering (department), and persists chat state.
 */
export default function App() {
  // Global Navigation & Filter State
  const [activeTab, setActiveTab] = useState('dashboard'); 
  const [department, setDepartment] = useState('all'); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Lifted Chat State (Ensures chat history isn't lost when switching tabs)
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: 'Guten Tag. Ich bin das Gemini RAG-System für Nordzucker. Mein Systemkontext ist geladen. Wie kann ich die aktuellen Unternehmensdaten für Sie auswerten?' }
  ]);
  const [chatDocs, setChatDocs] = useState([]);

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
          aria-hidden="true"
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
          <button aria-label="Menü schließen" className="md:hidden text-slate-400 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>
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
            <button aria-label="Menü öffnen" className="md:hidden text-slate-600 hover:text-slate-900 p-1 -ml-1" onClick={() => setIsMobileMenuOpen(true)}>
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
                  aria-label="Abteilungsfilter"
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
          {activeTab === 'chat' && (
            <RagChatView 
              messages={chatMessages} 
              setMessages={setChatMessages} 
              retrievedDocs={chatDocs}
              setRetrievedDocs={setChatDocs}
            />
          )}
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