import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { Search, AlertCircle, CheckCircle, TrendingUp, BellRing } from 'lucide-react';
import { baseSentiment, baseTopics } from '../mockData';


/**
 * High-Level Metric Dashboard. Standard View when accessing Website
 * 
 * Props:
 * @param {string} department - Global filter state determining which data partition to visualize.
 */
export default function DashboardView({ department }) {
  // Map static KPI definitions based on the active department prop. Currently snythetic data used for demonstration purposes.
  const kpis = {
    all: { score: '3.8', rec: '88%', top: 'Arbeitsbed.', crit: 'Bewerbung', trend: [3.7, 3.7, 3.8, 3.8, 3.8, 4.1] },
    production: { score: '3.6', rec: '76%', top: 'Gehalt', crit: 'Work-Life', trend: [3.5, 3.5, 3.4, 3.6, 3.6, 3.6] },
    admin: { score: '4.0', rec: '94%', top: 'Work-Life', crit: 'Karriere', trend: [3.9, 3.9, 4.0, 4.0, 4.0, 4.1] }
  };
  
  const currentKpi = kpis[department];
  // Format trend array into Recharts-compatible object array
  const trendData = currentKpi.trend.map((score, i) => ({ 
    month: ['Jan', 'Feb', 'Mrz', 'Apr', 'Mai', 'Jun'][i], 
    score 
  }));

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
    {/* Predictive NLP Alert: Conditionally rendered to simulate backend anomaly detection. In production, this would be triggered by new comments, or in regluar intervals*/}
      {department === 'production' && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-4 text-amber-800 shadow-sm items-start">
          <BellRing className="shrink-0 text-amber-600 animate-bounce" />
          <div>
            <h4 className="font-bold flex items-center gap-2">KI-Frühwarnung (Predictive Alert)</h4>
            <p className="text-sm mt-1">Die NLP-Analyse erkennt einen <b>24%igen Anstieg negativer Phrasen</b> im Zusammenhang mit der kommenden Rübenkampagne in den Werk-Bewertungen. Empfehlung: Präventive Kommunikation zur Personalplanung starten.</p>
          </div>
        </div>
      )}

      {/* KPI Overviews */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <KPICard title="Kununu Score (Filter)" value={currentKpi.score} icon={<Search className="text-blue-500" />} trend="Ø Branche: 3.5" />
        <KPICard title="Weiterempfehlung" value={currentKpi.rec} icon={<CheckCircle className="text-emerald-500" />} trend="Verifizierte Daten" />
        <KPICard title="Top Stärke" value={currentKpi.top} icon={<TrendingUp className="text-emerald-500" />} trend="Aus Text-Mining" />
        <KPICard title="Kritisches Feld" value={currentKpi.crit} icon={<AlertCircle className="text-red-500" />} trend="Prio HR-Maßnahme" isCritical={true} />
      </div>

      {/* Data Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
          <h3 className="text-lg font-bold mb-1 text-slate-800">Stimmung</h3>
          <p className="text-xs text-slate-500 mb-4">Basis: Freitexte der letzten 12 Monate</p>
          <div className="h-64">
            {/* ResponsiveContainer ensures SVG bounds map correctly on mobile */}
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

// Reusable micro-component for standardizing metric displays
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