import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Info, Target, AlertCircle, CheckCircle, MapPin } from 'lucide-react';
import { competitorData, regionalCompetitorData } from '../mockData';

/**
 * Competitor Analysis Dashboard
 * 
 * Visualizes benchmarking data against industry and regional peers.
 * Implements min-width wrappers and overflow-x-auto to prevent chart 
 * squishing on narrow mobile screens.
 * Analyses are currently hard-coded in Front-End. For production, these comparisons metrics would be regularly updated and send to the AI for analysis.
 */
export default function CompetitorView() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 flex gap-4 text-blue-800 shadow-sm items-start">
        <Info className="shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold">Marktdaten & Standort-Analysen</h4>
          <p className="text-sm mt-1">Nordzucker dominiert im Industrie-Branchenvergleich. Der Regional-Vergleich zeigt jedoch eine hohe Konkurrenzsituation bei Fachkräften am Hauptstandort Braunschweig.</p>
        </div>
      </div>

      {/* Industry Chart Container */}
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

        {/* Actionable Strengths/Weaknesses Extracted from Benchmarks and given as a response by LLM*/}
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

      {/* Regional Chart Container */}
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