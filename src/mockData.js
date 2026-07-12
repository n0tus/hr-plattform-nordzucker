/**
 * Mock Data Repository
 * In a production environment, these datasets would be dynamically fetched 
 * via WebREST APIs or GraphQL from a backend database (e.g., PostgreSQL) 
 * and a vector database (e.g., ChromaDB).
 */

/**
 * Mock Data Repository
 * * In a production environment, these datasets would be dynamically fetched 
 * via REST APIs or GraphQL from a backend database (e.g., PostgreSQL) 
 * and a vector database (e.g., ChromaDB).
 */

export const baseSentiment = {
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

/**
 * This is currently mock data that does not necessarily reflect the actual sentiment of the reviews. Some were obtained manually from Kununu, while others were artifically included to showcase the dashboard
 */

export const baseTopics = {
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

export const competitorData = [
  { subject: 'Work-Life-Balance', Nordzucker: 4.1, Südzucker: 3.7, PfeiferLangen: 3.3, fullMark: 5 },
  { subject: 'Gehalt & Soziales', Nordzucker: 4.2, Südzucker: 4.3, PfeiferLangen: 3.8, fullMark: 5 },
  { subject: 'Karriere/Weiterbildung', Nordzucker: 3.5, Südzucker: 3.6, PfeiferLangen: 2.9, fullMark: 5 },
  { subject: 'Kultur & Kollegen', Nordzucker: 3.9, Südzucker: 3.8, PfeiferLangen: 3.1, fullMark: 5 },
  { subject: 'Kommunikation', Nordzucker: 3.5, Südzucker: 3.3, PfeiferLangen: 2.7, fullMark: 5 },
  { subject: 'Arbeitsbedingungen', Nordzucker: 4.2, Südzucker: 3.9, PfeiferLangen: 3.4, fullMark: 5 },
];

export const regionalCompetitorData = [
  { subject: 'Gesamt-Score', Nordzucker: 3.8, VW_FS: 4.2, Siemens: 3.9, NewYorker: 3.1, fullMark: 5 },
  { subject: 'Work-Life-Balance', Nordzucker: 4.1, VW_FS: 4.0, Siemens: 3.8, NewYorker: 2.8, fullMark: 5 },
  { subject: 'Gehalt & Soziales', Nordzucker: 4.2, VW_FS: 4.5, Siemens: 4.0, NewYorker: 3.0, fullMark: 5 },
  { subject: 'Karriere & Aufstieg', Nordzucker: 3.5, VW_FS: 3.9, Siemens: 3.7, NewYorker: 3.1, fullMark: 5 },
  { subject: 'Kultur', Nordzucker: 3.9, VW_FS: 4.1, Siemens: 3.7, NewYorker: 2.9, fullMark: 5 },
];

export const reviewDatabase = [
  { id: 1, source: "Kununu (Bewerber)", date: "Juni 2024", text: "Nach über einem Monat völliger Funkstille kam ein Anruf mit Rückfragen. Letztlich erhielt ich eine Standardabsage ohne jegliches Feedback, also insgesamt über zwei Monate nach meiner Bewerbung. Keine Zwischenbescheide oder transparente Kommunikation. Stattdessen hatte ich am Ende das deutliche Gefühl, nur 'zweite Wahl' gewesen zu sein und warmgehalten zu werden." },
  { id: 2, source: "Kununu (Bewerber)", date: "Januar 2025", text: "Es wird der 200% Kandidat gesucht - beim heutigen Arbeitsmarkt allerdings sollte man sich schneller entscheiden. Ganz ehrlich: Man braucht keine zwei Monate, um über eine Bewerbung zu entscheiden. Schon gar nicht, wenn in der Ausschreibung 'ab sofort' steht." },
  { id: 3, source: "Kununu (Bewerber)", date: "Juli 2023", text: "Positiver Eindruck, den das Unternehmen nach dem zweiten Gespräch ins Gegenteil verändert hat. Dem Bewerber eine Rückmeldung zukommen lassen, wenn das seitens des Unternehmens im Gespräch schon so avisiert wird, sollte wohl drin sein." }
];