import React from 'react';
import { Clock, Briefcase, TrendingUp } from 'lucide-react';

export default function ActionsView() {
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