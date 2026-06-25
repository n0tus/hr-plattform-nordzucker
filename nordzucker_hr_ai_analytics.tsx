import React, { useState, useEffect, useRef } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts';
import { 
  MessageSquare, BarChart2, Users, Target, Search, 
  Send, Bot, User, AlertCircle, CheckCircle, TrendingUp, Briefcase, Zap, Info, Clock,
  Filter, BellRing, ChevronDown, Lightbulb, Menu, X
} from 'lucide-react';

// Basis-Daten für Sentiment
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

// Basis-Daten für Themen
const baseTopics = {
  all: [
    { topic: 'Arbeitsbed.', positiv: 84, negativ: 16 },
    { topic: 'Work-Life', positiv: 82, negativ: 18 },
    { topic: 'Gehalt', positiv: 84, negativ: 16 },
    { topic: 'Karriere', positiv: 70, negativ: 30 },
    { topic: 'Bewerbung', positiv: 48, negativ: 52 },
  ],
  production: [
    { topic: 'Arbeitsbed.', positiv: 65, negativ: 35 }, // Schichtarbeit, Hitze, Kampagne
    { topic: 'Work-Life', positiv: 60, negativ: 40 }, 
    { topic: 'Gehalt', positiv: 88, negativ: 12 }, // Guter Tarif
    { topic: 'Karriere', positiv: 50, negativ: 50 },
    { topic: 'Bewerbung', positiv: 55, negativ: 45 },
  ],
  admin: [
    { topic: 'Arbeitsbed.', positiv: 95, negativ: 5 }, // Neues Büro, Homeoffice
    { topic: 'Work-Life', positiv: 92, negativ: 8 },
    { topic: 'Gehalt', positiv: 75, negativ: 25 }, // AT-Bereich schwerer verhandelbar
    { topic: 'Karriere', positiv: 78, negativ: 22 },
    { topic: 'Bewerbung', positiv: 45, negativ: 55 },
  ]
};

// Benchmarks bleiben statisch
const competitorData = [
  { subject: 'Work-Life-Balance', Nordzucker: 4.1, Südzucker: 3.7, PfeiferLangen: 3.3, fullMark: 5 },
  { subject: 'Gehalt & Soziales', Nordzucker: 4.2, Südzucker: 4.3, PfeiferLangen: 3.8, fullMark: 5 },
  { subject: 'Karriere/Weiterbildung', Nordzucker: 3.5, Südzucker: 3.6, PfeiferLangen: 2.9, fullMark: 5 },
  { subject: 'Arbeitsbedingungen', Nordzucker: 4.2, Südzucker: 3.9, PfeiferLangen: 3.4, fullMark: 5 },
];

const reviewDatabase = [
  { 
    id: "REV-NZ-001", company: "Nordzucker", dept: "admin", topic: "Work-Life-Balance", 
    text: "Gut am Arbeitgeber finde ich Hansefit, Home Office, Gleitzeit. Schlecht finde ich: mehr Mitarbeiterevents." //[cite: 1]
  },
  { 
    id: "REV-NZ-002", company: "Nordzucker", dept: "production", topic: "Arbeitsbedingungen", 
    text: "Manchmal stressig, insbesondere in der Kampagne, aber alle ziehen an einem Strang. In der Kampagne Schichten, leider auch an Wochenenden und Feiertagen." //[cite: 1]
  },
  { 
    id: "REV-NZ-003", company: "Nordzucker", dept: "production", topic: "Führung & Kultur", 
    text: "Vor 2 Jahren gab es einen Wechsel in der Führungsebene und seitdem ist leider von den Werten an diesem Standort nichts mehr zu spüren." //[cite: 1]
  },
  { 
    id: "REV-NZ-004", company: "Nordzucker", dept: "admin", topic: "Kommunikation", 
    text: "Bessere Kommunikation zwischen den verschiedenen Abteilungen, gerade im Bereich Logistik/SCM ist das essenziell." //[cite: 1]
  },
  { 
    id: "REV-NZ-005", company: "Nordzucker", dept: "all", topic: "Ausbildung", 
    text: "Als Azubi habe ich sehr viele Vorteile, wie flexible Arbeitszeiten, Weihnachtsgeld und Urlaubsgeld. Die Ausbildung bietet eine große Vielfalt an Aufgaben." //[cite: 1]
  },
  { 
    id: "REV-NZ-006", company: "Nordzucker", dept: "logistics", topic: "Prozesse", 
    text: "Einige Fahrer berichten von mehreren Stunden Wartezeit bzw. nur einer Rampenbedienung, was den Ablauf verzögert." //[cite: 1]
  }
];

const ragScenarios = [
  {
    keywords: ["kampagne", "produktion", "schicht", "stress"],
    retrievedDocs: [reviewDatabase[1], reviewDatabase[2]],
    response: "Die Analyse der Produktionsstandorte zeigt ein zweigeteiltes Bild.\n\nErkenntnisse:\n- Positiv: Starker Zusammenhalt im Team (Score 4-5)[cite: 1].\n- Kritisch: Hohe Belastung durch Wochenend- und Feiertagsschichten während der Rübenkampagne[cite: 1].\n- Risiko: Veränderungen in der Führungsebene haben an einigen Standorten zu einem gefühlten Verlust der Unternehmenswerte geführt[cite: 1].\n\nEmpfehlung: Gezielte Entlastungsangebote während der Kampagne prüfen und Führungskräfte-Entwicklung am Standort Klein Wanzleben priorisieren."
  },
  {
    keywords: ["benefits", "homeoffice", "verwaltung", "hansefit"],
    retrievedDocs: [reviewDatabase[0], reviewDatabase[3]],
    response: "Die Rahmenbedingungen im Verwaltungsbereich werden hervorragend bewertet.\n\nStärken:\n- Hansefit, Home-Office und Gleitzeit (37h Woche) sind starke Treiber für Mitarbeiterzufriedenheit[cite: 1].\n\nHandlungsbedarf:\n- Wunsch nach mehr Teamevents[cite: 1].\n- Die abteilungsübergreifende Kommunikation (besonders zu Logistik/SCM) wird als verbesserungswürdig eingestuft[cite: 1]."
  },
  {
    keywords: ["ausbildung", "azubi", "zukunft"],
    retrievedDocs: [reviewDatabase[4]],
    response: "Das Feedback zur Ausbildung ist herausragend (Score 5.0)[cite: 1].\n\nStärken im Employer Branding:\n- Hohe Jobsicherheit und spannende, abwechslungsreiche Aufgaben[cite: 1].\n- Sehr gute finanzielle Rahmenbedingungen (Weihnachts-/Urlaubsgeld, steigende Vergütung bis 1.273€ im 4. Lehrjahr)[cite: 1].\n\nEmpfehlung: Azubi-Testimonials zur Gewinnung neuer Talente nutzen."
  },
  {
    keywords: ["logistik", "lkw", "wartezeit", "rampe"],
    retrievedDocs: [reviewDatabase[5]],
    response: "Externe Bewertungen durch LKW-Fahrer zeigen Engpässe auf.\n\nHauptkritik:\n- Teilweise extreme Wartezeiten (mehrere Stunden) und mangelnde Rampenbedienung[cite: 1].\nPositiv:\n- Freundliches Personal und guter 24/7-Betrieb[cite: 1].\n\nEmpfehlung: Prozessoptimierung bei der Be- und Entladung zur Vermeidung von Rückstaus."
  }
];

export default function NordzuckerHRPrototype() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [department, setDepartment] = useState('all'); // Neues Filter-Feature
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Helper to close menu on mobile after clicking a link
  const handleNavClick = (tab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
  };

return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden relative">
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-20 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Responsive Sidebar */}
      <aside className={`fixed md:static inset-y-0 left-0 w-64 bg-slate-900 text-slate-300 flex flex-col shadow-xl z-30 transform transition-transform duration-300 ease-in-out ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
      }`}>
        <div className="p-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-500 rounded-md flex items-center justify-center text-white font-bold text-xl">
              N
            </div>
            <span className="text-xl font-bold text-white tracking-tight">HR Analytics</span>
          </div>
          {/* Close button for mobile */}
          <button className="md:hidden text-slate-400 hover:text-white" onClick={() => setIsMobileMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
          <NavItem icon={<BarChart2 />} label="Dashboard" active={activeTab === 'dashboard'} onClick={() => handleNavClick('dashboard')} />
          <NavItem icon={<Target />} label="Wettbewerb" active={activeTab === 'competitor'} onClick={() => handleNavClick('competitor')} />
          <NavItem icon={<MessageSquare />} label="KI-Assistent" active={activeTab === 'chat'} onClick={() => handleNavClick('chat')} />
          <NavItem icon={<Lightbulb />} label="Actions" active={activeTab === 'actions'} onClick={() => handleNavClick('actions')} />
        </nav>
        
        <div className="p-4 border-t border-slate-800 text-xs text-slate-500">
          Status: <span className="text-emerald-400">Verbunden</span><br/>
          Modell: RAG-GPT-4o
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden w-full">
        
        {/* Responsive Header */}
        <header className="bg-white border-b border-slate-200 px-4 md:px-8 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 z-10 shadow-sm shrink-0">
          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Hamburger Button */}
            <button className="md:hidden text-slate-600 hover:text-slate-900" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={24} />
            </button>
            <h1 className="text-lg md:text-2xl font-bold text-slate-800 truncate">
              {activeTab === 'dashboard' && 'Employer Branding Dashboard'}
              {activeTab === 'competitor' && 'Wettbewerbsvergleich'}
              {activeTab === 'chat' && 'HR Copilot (RAG System)'}
              {activeTab === 'actions' && 'KI-Handlungsfelder'}
            </h1>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-1 border border-slate-200 w-full md:w-auto">
              <Filter size={16} className="text-slate-500 ml-2 shrink-0" />
              <select 
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="bg-transparent text-sm font-medium text-slate-700 focus:outline-none cursor-pointer py-1 pr-2 w-full md:w-auto truncate"
              >
                <option value="all">Alle Bereiche (Konzern)</option>
                <option value="production">Nur Produktion</option>
                <option value="admin">Nur Verwaltung / IT</option>
              </select>
            </div>

            <div className="hidden md:flex items-center gap-2 text-sm font-medium text-slate-600 border-l border-slate-200 pl-4">
              <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div> Live</span>
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
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

function DashboardView({ department }) {
  // Dynamische Metriken basierend auf dem Filter
  const kpis = {
    all: { score: '3.8', rec: '88%', top: 'Arbeitsbed.', crit: 'Bewerbung', trend: [3.7, 3.7, 3.8, 3.8, 3.8, 4.1] },
    production: { score: '3.6', rec: '76%', top: 'Gehalt', crit: 'Work-Life', trend: [3.5, 3.5, 3.4, 3.6, 3.6, 3.6] },
    admin: { score: '4.0', rec: '94%', top: 'Work-Life', crit: 'Karriere', trend: [3.9, 3.9, 4.0, 4.0, 4.0, 4.1] }
  };
  
  const currentKpi = kpis[department];
  const trendData = currentKpi.trend.map((score, i) => ({ month: ['Jan', 'Feb', 'Mrz', 'Apr', 'Mai', 'Jun'][i], score }));

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* NEU: KI Frühwarnsystem Banner */}
      {department === 'production' && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-4 text-amber-800 shadow-sm items-start">
          <BellRing className="shrink-0 text-amber-600 animate-bounce" />
          <div>
            <h4 className="font-bold flex items-center gap-2">KI-Frühwarnung (Predictive Alert)</h4>
            <p className="text-sm mt-1">Die NLP-Analyse erkennt einen <b>24%igen Anstieg negativer Phrasen</b> im Zusammenhang mit der kommenden Rübenkampagne in den Werk-Bewertungen. Empfehlung: Präventive Kommunikation zur Personalplanung starten.</p>
          </div>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KPICard title="Kununu Score (Filter)" value={currentKpi.score} icon={<Search className="text-blue-500" />} trend="Ø Branche: 3.5" />
        <KPICard title="Weiterempfehlung" value={currentKpi.rec} icon={<CheckCircle className="text-emerald-500" />} trend="Verifizierte Daten" />
        <KPICard title="Top Stärke" value={currentKpi.top} icon={<TrendingUp className="text-emerald-500" />} trend="Aus Text-Mining" />
        <KPICard title="Kritisches Feld" value={currentKpi.crit} icon={<AlertCircle className="text-red-500" />} trend="Prio HR-Maßnahme" isCritical={true} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sentiment Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 lg:col-span-1">
          <h3 className="text-lg font-bold mb-1 text-slate-800">Stimmung (Sentiment)</h3>
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

        {/* Topic Breakdown */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 lg:col-span-2">
          <h3 className="text-lg font-bold mb-1 text-slate-800">Themen-Cluster (Stärken & Schwächen)</h3>
          <p className="text-xs text-slate-500 mb-4">Prozentuale Verteilung von Positiv/Negativ in Bewertungen ({department === 'all' ? 'Gesamter Konzern' : department === 'production' ? 'Nur Produktion' : 'Nur Verwaltung'})</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={baseTopics[department]} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9"/>
                <XAxis dataKey="topic" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                <YAxis tick={{fontSize: 12}} axisLine={false} tickLine={false}/>
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}/>
                <Legend />
                <Bar dataKey="positiv" name="Positiv" stackId="a" fill="#10b981" radius={[0, 0, 4, 4]} maxBarSize={50} />
                <Bar dataKey="negativ" name="Kritisch" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} maxBarSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Trend Area Chart (Neues Design) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 lg:col-span-3">
          <h3 className="text-lg font-bold mb-4 text-slate-800 flex justify-between items-center">
            <span>Score-Entwicklung & Event-Tracking</span>
            <span className="text-xs font-normal text-slate-500 bg-slate-100 px-2 py-1 rounded">Letzte 6 Monate</span>
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" axisLine={false} tickLine={false} />
                <YAxis domain={[3.0, 5.0]} stroke="#64748b" axisLine={false} tickLine={false} />
                <Tooltip />
                <Area type="monotone" dataKey="score" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" activeDot={{ r: 6 }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function KPICard({ title, value, icon, trend, isCritical = false }) {
  return (
    <div className={`bg-white p-6 rounded-xl shadow-sm border ${isCritical ? 'border-red-200 bg-red-50/20' : 'border-slate-100'} hover:shadow-md transition-shadow`}>
      <div className="flex justify-between items-start mb-4">
        <h4 className="text-slate-500 font-medium text-sm">{title}</h4>
        <div className={`p-2 rounded-lg ${isCritical ? 'bg-red-100' : 'bg-slate-50'}`}>{icon}</div>
      </div>
      <div className={`text-3xl font-bold mb-1 ${isCritical ? 'text-red-600' : 'text-slate-800'}`}>{value}</div>
      <div className={`text-xs font-medium ${isCritical ? 'text-red-500' : 'text-slate-400'}`}>{trend}</div>
    </div>
  );
}

function CompetitorView() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-slate-800">Benchmark: Direkter Wettbewerbsvergleich</h3>
            <span className="text-xs font-semibold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">Score 1-5</span>
          </div>
          <div className="h-96 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={competitorData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="subject" tick={{fontSize: 12, fill: '#64748b'}} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 5]} tick={{fontSize: 12, fill: '#64748b'}} axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}/>
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }}/>
                <Bar dataKey="Nordzucker" fill="#10b981" radius={[4, 4, 0, 0]} barSize={30} />
                <Bar dataKey="Südzucker" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={30} />
                <Bar dataKey="PfeiferLangen" name="Pfeifer & Langen" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold mb-4 text-slate-800 flex items-center gap-2"><Target size={18} className="text-emerald-500"/> Unsere USPs</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm bg-emerald-50/50 p-3 rounded-lg border border-emerald-100">
                <CheckCircle size={18} className="text-emerald-600 mt-0.5 shrink-0"/> 
                <span><b className="text-emerald-900">Arbeitsbedingungen (4.2)</b><br/><span className="text-emerald-700/80 text-xs">Nordzucker schlägt hier Südzucker (3.9) deutlich in fast allen Freitexten.</span></span>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold mb-4 text-slate-800 flex items-center gap-2"><AlertCircle size={18} className="text-red-500"/> Handlungsbedarf</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm bg-red-50/50 p-3 rounded-lg border border-red-100">
                <AlertCircle size={18} className="text-red-600 mt-0.5 shrink-0"/> 
                <span><b className="text-red-900">Karrierewege (3.5)</b><br/><span className="text-red-700/80 text-xs">Südzucker schneidet hier leicht besser ab. Fehlende Aufstiegschancen kosten uns junge Talente.</span></span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function RagChatView() {
  const [messages, setMessages] = useState([
    { role: 'system', content: 'Guten Tag. Die Vektordatenbank ist geladen (Kununu/Glassdoor Daten für Nordzucker, Südzucker, Pfeifer & Langen). Wie kann ich HR-strategisch helfen?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [retrievedDocs, setRetrievedDocs] = useState([]);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => scrollToBottom(), [messages]);

  const sendQuery = async (query) => {
    if (!query.trim()) return;

    const userMsg = { role: 'user', content: query };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);
    setRetrievedDocs([]); 

    // 1. Simuliertes Retrieval (Vektordatenbank-Suche via Keyword-Matching)
    const lowerInput = query.toLowerCase();
    let matchedDocs = [];
    for (const scenario of ragScenarios) {
      if (scenario.keywords.some(kw => lowerInput.includes(kw))) {
        matchedDocs = scenario.retrievedDocs;
        break;
      }
    }
    
    // Für die UI-Anzeige der Quellen in der rechten Sidebar
    if (matchedDocs.length > 0) {
      setRetrievedDocs(matchedDocs);
    } else {
      // Fallback: Wenn kein spezifisches Cluster passt, geben wir dem LLM die ganze DB als Kontext
      matchedDocs = reviewDatabase; 
    }

    // 2. Echter Gemini API Call mit RAG-Kontext
    const contextText = matchedDocs.map(d => `[${d.company}] Thema: ${d.topic} | Bewertung: "${d.text}"`).join('\n');
    
    const systemPrompt = `Du bist ein hochintelligenter HR-Analytics Copilot für die Nordzucker AG.
    Beantworte die Anfrage des Nutzers auf Basis der folgenden Mitarbeiterbewertungen (Kununu/Glassdoor).
    Sei präzise, strategisch und erwähne konkrete Fakten aus den Bewertungen, wenn sie vorhanden sind.
    Wenn die Bewertungen die Frage nicht explizit beantworten, nutze dein allgemeines HR-Wissen, weise aber transparent darauf hin.
    
    RELEVANTER KONTEXT AUS DER BEWERTUNGSDATENBANK:
    ---
    ${contextText}
    ---`;

    const apiKey = ""; // API Key wird automatisch vom System bereitgestellt
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

    const payload = {
        contents: [{ parts: [{ text: query }] }],
        systemInstruction: { parts: [{ text: systemPrompt }] }
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const result = await response.json();
        const candidate = result.candidates?.[0];

        if (candidate && candidate.content?.parts?.[0]?.text) {
            setMessages(prev => [...prev, { role: 'assistant', content: candidate.content.parts[0].text }]);
        } else {
            setMessages(prev => [...prev, { role: 'assistant', content: "Entschuldigung, es gab ein Problem bei der Generierung der Antwort." }]);
        }
    } catch (error) {
        console.error("Gemini API Error:", error);
        setMessages(prev => [...prev, { role: 'assistant', content: "Fehler bei der Verbindung zur Gemini API. Bitte prüfen Sie Ihre Verbindung." }]);
    } finally {
        setIsTyping(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-140px)] animate-in fade-in duration-500">
      
      {/* Chat Area */}
      <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
        
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role === 'assistant' || msg.role === 'system' ? (
                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center mr-3 mt-1 shrink-0">
                  <Bot size={16} className="text-emerald-600" />
                </div>
              ) : null}
              <div className={`max-w-[80%] rounded-2xl p-4 shadow-sm text-sm leading-relaxed ${
                msg.role === 'user' ? 'bg-slate-800 text-white rounded-tr-none' : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
              }`}>
                <p className="whitespace-pre-line">{msg.content}</p>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
               <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center mr-3 mt-1 shrink-0">
                  <Bot size={16} className="text-emerald-600" />
                </div>
              <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-none p-4 shadow-sm flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                <span className="text-xs text-slate-400 ml-2">Suche in Vektordatenbank...</span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* NEU: Prompt Suggestions */}
        <div className="bg-slate-50 px-4 pt-3 pb-2 border-t border-slate-200 flex gap-2 overflow-x-auto no-scrollbar">
          <PromptPill text="Warum kritisieren Bewerber den Prozess?" onClick={() => sendQuery("Warum kritisieren Bewerber den Prozess?")} />
          <PromptPill text="Was sagen Schichtarbeiter (Produktion)?" onClick={() => sendQuery("Was sagen Schichtarbeiter in der Produktion?")} />
          <PromptPill text="Gehaltsvergleich mit Südzucker" onClick={() => sendQuery("Wie ist der Gehaltsvergleich mit Südzucker?")} />
        </div>

        <div className="p-4 bg-white border-t border-slate-200">
          <div className="flex gap-2 relative">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendQuery(input)}
              placeholder="Stellen Sie eine HR-Frage an die Daten..."
              className="flex-1 bg-slate-100 border-transparent rounded-lg px-4 py-3 text-sm focus:outline-none focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all"
            />
            <button 
              onClick={() => sendQuery(input)}
              disabled={isTyping || !input.trim()}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 rounded-lg flex items-center justify-center transition-colors disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* RAG Context Sidebar */}
      <div className="space-y-6 overflow-y-auto">
        {retrievedDocs.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 animate-in slide-in-from-right duration-500">
            <h3 className="font-bold text-slate-800 mb-4 text-xs uppercase tracking-wider flex items-center gap-2">
              <Search size={14} className="text-blue-500"/> 
              Gefundene Original-Zitate
            </h3>
            <div className="space-y-3">
              {retrievedDocs.map((doc, idx) => (
                <div key={idx} className="bg-blue-50/50 border border-blue-100 p-4 rounded-lg relative">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold bg-blue-100 text-blue-800 px-2 py-1 rounded-md">{doc.company}</span>
                    <span className="text-[10px] uppercase font-semibold text-slate-500 tracking-wider">{doc.topic}</span>
                  </div>
                  <p className="text-sm text-slate-700 italic">"{doc.text}"</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
}

function PromptPill({ text, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="shrink-0 text-xs font-medium text-slate-600 bg-white border border-slate-300 px-3 py-1.5 rounded-full hover:border-emerald-500 hover:text-emerald-700 transition-colors"
    >
      {text}
    </button>
  );
}

function ActionsView() {
  return (
    <div className="max-w-5xl animate-in fade-in duration-500 space-y-6">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Data to Value Pipeline</h2>
        <p className="text-slate-600">Aus der unstrukturierten Menge an Internetdaten hat die KI folgende strategische Initiativen abgeleitet und nach ROI priorisiert.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Action Card 1 */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1.5 h-full bg-red-500"></div>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-red-50 rounded-lg text-red-600"><Clock size={24}/></div>
            <div>
              <h3 className="font-bold text-slate-800 text-lg">Bewerber-Experience</h3>
              <span className="text-xs font-medium text-slate-500">Prio: Kritisch | Metrik: Score 2.4</span>
            </div>
          </div>
          <p className="text-sm text-slate-600 mb-4">
            Daten zeigen verheerende Bewertungen im Bewerbungsprozess. Bewerber warten bis zu 2 Monate auf Feedback.
          </p>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
            <h4 className="text-xs font-bold text-slate-700 mb-2 uppercase">Sofort-Maßnahmen:</h4>
            <ul className="text-sm text-slate-600 space-y-1 list-disc pl-4">
              <li>"7-Tage-Feedback-Regel" (SLA) einführen.</li>
              <li>Automatisierte Status-Mails aktivieren.</li>
            </ul>
          </div>
        </div>

        {/* Action Card 2 */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1.5 h-full bg-emerald-500"></div>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600"><Briefcase size={24}/></div>
            <div>
              <h3 className="font-bold text-slate-800 text-lg">Kampagne: Work-Life-Balance</h3>
              <span className="text-xs font-medium text-slate-500">Prio: Hoch | Bereich: Employer Branding</span>
            </div>
          </div>
          <p className="text-sm text-slate-600 mb-4">
            Nordzucker führt die Industrie beim Thema Arbeitsbedingungen (4.2) an. Pfeifer & Langen schwächelt hier.
          </p>
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
            <h4 className="text-xs font-bold text-slate-700 mb-2 uppercase">Maßnahmen:</h4>
            <ul className="text-sm text-slate-600 space-y-1 list-disc pl-4">
              <li>"Hansefit, Gleitzeit" als Headline in Anzeigen.</li>
              <li>Mitarbeiter-Testimonial-Kampagne starten.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}