import { useState } from "react";
import "./index.css";

const palette = {
  cream: "#FDF6F0",
  blush: "#F2C4CE",
  dustyRose: "#D4889A",
  mauve: "#9B6B7A",
  deepPlum: "#3D1F2D",
  sage: "#A8B5A2",
  warmGold: "#C9A96E",
  lightSage: "#E8EEE6",
};

const workoutDays = [
  {
    id: "A",
    label: "Giorno A",
    subtitle: "Glutei + Posteriore coscia",
    emoji: "🍑",
    color: palette.blush,
    warmup: {
      name: "Tapis roulant inclinato",
      duration: "8 min",
      detail: "Inclinazione 8-10 · Velocità 5.5",
    },
    exercises: [
      {
        name: "Hip Thrust",
        sets: 4,
        reps: 12,
        startWeight: "20kg (bilanciere vuoto)",
        progression: "Aggiungi 2.5kg ogni volta che completi tutte le reps con facilità per 2 sessioni consecutive",
        tip: "Schiena sul banco, piedi piatti a terra larghezza anche. Spingi i fianchi verso il soffitto contraendo il gluteo in cima. Non inarcare la lombare.",
        cues: ["Mento verso il petto", "Spingi dai talloni", "Strizza il gluteo in alto", "Tieni 1 secondo in cima"],
        priority: "⭐ PRIORITÀ MASSIMA",
      },
      {
        name: "Romanian Deadlift",
        sets: 3,
        reps: 12,
        startWeight: "2x8kg manubri",
        progression: "Aggiungi 2kg per mano ogni 2 settimane",
        tip: "Piedi larghezza anche, manubri davanti alle cosce. Scendi mantenendo la schiena dritta, sentendo lo stretch nel posteriore coscia. Non piegare le ginocchia.",
        cues: ["Schiena neutra sempre", "Spingisci i fianchi indietro", "Manubri vicini alle gambe", "Stop quando senti lo stretch"],
      },
      {
        name: "Sumo Squat",
        sets: 3,
        reps: 15,
        startWeight: "1x12kg manubrio",
        progression: "Aggiungi 2kg ogni 2 settimane",
        tip: "Piedi larghi con punte fuori a 45°. Tieni il manubrio verticale davanti a te. Scendi tenendo le ginocchia allineate con le punte dei piedi.",
        cues: ["Petto alto", "Ginocchia fuori", "Sediti tra i talloni", "Non piegare in avanti"],
      },
      {
        name: "Cable Kickback",
        sets: 3,
        reps: 15,
        startWeight: "5kg per lato",
        progression: "Aggiungi 2.5kg ogni 3 settimane",
        tip: "Cavigliera al cavo basso. Inclina leggermente il busto, tieni il core attivo. Spingi la gamba indietro e in alto senza ruotare il bacino.",
        cues: ["Core contratto", "Non ruotare il bacino", "Piede a martello", "Spingi col gluteo non con la schiena"],
      },
      {
        name: "Leg Curl sdraiata",
        sets: 3,
        reps: 12,
        startWeight: "15-20kg macchinario",
        progression: "Aggiungi 5kg ogni 2-3 settimane",
        tip: "Talloni sul rullo, fianchi premuti sul lettino. Piega le ginocchia verso il sedere in modo controllato. Scendi lentamente.",
        cues: ["Fianchi giù sempre", "Contrai in cima", "Scendi in 3 secondi", "Non usare lo slancio"],
      },
      {
        name: "Abductor Machine",
        sets: 3,
        reps: 20,
        startWeight: "30kg macchinario",
        progression: "Aggiungi 5kg ogni 2 settimane",
        tip: "Siediti dritta, schiena aderente allo schienale. Apri le gambe lentamente resistendo al ritorno. Non fare rimbalzare il peso.",
        cues: ["Schiena diritta", "Apri lento — chiudi lento", "Senti il bruciore laterale", "Non rimbalzare"],
      },
    ],
    core: [
      { name: "Dead Bug", sets: 3, reps: "8 per lato", tip: "Schiena a terra, lombare premuta. Allunga braccio opposto alla gamba senza toccare terra. Il respiro è tutto." },
      { name: "Bird Dog", sets: 3, reps: "10 per lato", tip: "A quattro zampe, allunga braccio e gamba opposta in linea con il corpo. Tieni 2 secondi." },
    ],
  },
  {
    id: "B",
    label: "Giorno B",
    subtitle: "Schiena + Braccia",
    emoji: "💪",
    color: palette.lightSage,
    warmup: {
      name: "Vogatore",
      duration: "5 min",
      detail: "Resistenza leggera · Ritmo regolare",
    },
    exercises: [
      {
        name: "Lat Machine presa larga",
        sets: 4,
        reps: 12,
        startWeight: "20-25kg",
        progression: "Aggiungi 5kg ogni 2 settimane",
        tip: "Siediti dritta, tieni il petto alto. Porta la barra verso la clavicola aprendo i gomiti verso il basso. Non portare la barra alla nuca.",
        cues: ["Petto fuori verso la barra", "Gomiti verso i fianchi", "Strizza la schiena in basso", "Non usare lo slancio"],
        priority: "⭐ PRIORITÀ — costruisce il V della schiena",
      },
      {
        name: "Cable Row seduta",
        sets: 3,
        reps: 12,
        startWeight: "20kg",
        progression: "Aggiungi 5kg ogni 2-3 settimane",
        tip: "Schiena dritta, non piegare avanti e indietro con il busto. Tira verso l'ombelico mantenendo i gomiti vicini al corpo.",
        cues: ["Busto fermo", "Gomiti vicino ai fianchi", "Strizza le scapole", "Torna lenta"],
      },
      {
        name: "Face Pull con corda",
        sets: 3,
        reps: 15,
        startWeight: "10kg",
        progression: "Aggiungi 2.5kg ogni 3 settimane",
        tip: "Cavo all'altezza del viso. Tira verso il viso con i gomiti alti, aprendo le mani verso le orecchie. Fondamentale per la postura.",
        cues: ["Gomiti alti come ali", "Mani alle orecchie", "Strizza le scapole indietro", "Essenziale per postura"],
      },
      {
        name: "Curl manubri alternati",
        sets: 3,
        reps: 12,
        startWeight: "5-6kg per mano",
        progression: "Aggiungi 1kg per mano ogni 3 settimane",
        tip: "In piedi, gomiti fermi ai fianchi. Ruota il polso salendo. Non dondolare il corpo.",
        cues: ["Gomiti fissi", "Ruota il polso salendo", "Scendi lentamente", "Non usare la schiena"],
      },
      {
        name: "Tricep Pushdown corda",
        sets: 3,
        reps: 15,
        startWeight: "10-12kg",
        progression: "Aggiungi 2.5kg ogni 3 settimane",
        tip: "Gomiti fermi ai fianchi, spingi verso il basso aprendo le mani alla fine del movimento. Estendi completamente.",
        cues: ["Gomiti fissi", "Apri le mani in basso", "Estendi completamente", "Strizza i tricipiti"],
      },
      {
        name: "Shoulder Press manubri",
        sets: 3,
        reps: 12,
        startWeight: "4-5kg per mano",
        progression: "Aggiungi 1kg per mano ogni 3 settimane",
        tip: "Seduta, manubri alle orecchie. Spingi verso l'alto senza bloccare i gomiti. Non inarcare la schiena.",
        cues: ["Core attivo", "Non inarcare la lombare", "Spingi in linea retta", "Scendi controllata"],
      },
      {
        name: "Hyperextension",
        sets: 3,
        reps: 15,
        startWeight: "A corpo libero prima",
        progression: "Aggiungi un disco da 5kg dopo 3 settimane",
        tip: "Sul macchinario a 45°. Scendi con la schiena neutra, risali contraendo i glutei e i lombari. Non iperestendere.",
        cues: ["Schiena neutra scendendo", "Risali con i glutei", "Stop alla linea del corpo", "Braccia incrociate al petto"],
      },
    ],
    core: [],
  },
  {
    id: "C",
    label: "Giorno C",
    subtitle: "Glutei Full + Core",
    emoji: "✨",
    color: "#EDE0F5",
    warmup: {
      name: "Cyclette",
      duration: "8 min",
      detail: "Resistenza media · Cadenza costante",
    },
    exercises: [
      {
        name: "Bulgarian Split Squat",
        sets: 4,
        reps: 10,
        startWeight: "2x6kg manubri",
        progression: "Aggiungi 1-2kg per mano ogni 2 settimane",
        tip: "Piede posteriore su una panchina. Scendi verticalmente con il busto eretto. Il ginocchio anteriore non va oltre la punta del piede.",
        cues: ["Busto dritto", "Ginocchio anteriore in asse", "Scendi verticale", "Spingi dal tallone anteriore"],
        priority: "⭐ Esercizio più efficace per gluteo e coscia",
      },
      {
        name: "Hip Thrust monopodalico",
        sets: 3,
        reps: 12,
        startWeight: "A corpo libero",
        progression: "Dopo 2 settimane aggiungi una resistenza leggera",
        tip: "Come l'hip thrust normale ma su una gamba sola. Mantieni il bacino orizzontale, non lasciarlo cadere dal lato della gamba sollevata.",
        cues: ["Bacino orizzontale", "Core contratto", "Spingi dal tallone", "Strizza in alto"],
      },
      {
        name: "Step-up su box",
        sets: 3,
        reps: 12,
        startWeight: "2x5kg manubri",
        progression: "Aggiungi 1-2kg per mano ogni 2 settimane",
        tip: "Box all'altezza del ginocchio. Metti tutto il piede sul box, spingi dal tallone per salire. Non aiutarti con la gamba di dietro.",
        cues: ["Tallone completo sul box", "Spingi dall'alto non dal basso", "Busto dritto", "Scendi controllata"],
      },
      {
        name: "Good Morning",
        sets: 3,
        reps: 15,
        startWeight: "Bilanciere vuoto 10kg",
        progression: "Aggiungi 2.5kg ogni 3 settimane — non aumentare troppo in fretta",
        tip: "Bilanciere sulle spalle, piedi larghezza spalle. Piegati in avanti con la schiena dritta fino a sentire lo stretch nel posteriore coscia.",
        cues: ["Mai con la schiena curva", "Ginocchia leggermente piegate", "Stop quando senti lo stretch", "Risali contraendo i glutei"],
      },
      {
        name: "Lateral Band Walk",
        sets: 3,
        reps: "20 passi per lato",
        startWeight: "Elastico medio",
        progression: "Passa a elastico pesante dopo 3-4 settimane",
        tip: "Elastico sopra le ginocchia, posizione squat leggera. Fai passi laterali tenendo la tensione sull'elastico. Non lasciare che le ginocchia cedano verso l'interno.",
        cues: ["Tieni la tensione sempre", "Ginocchia fuori", "Passi controllati", "Non raddrizzarti tra un passo e l'altro"],
      },
      {
        name: "Glute Bridge a terra",
        sets: 3,
        reps: 20,
        startWeight: "A corpo libero / elastico sul bacino",
        progression: "Aggiungi un disco da 5kg dopo 2-3 settimane",
        tip: "Schiena a terra, piedi piatti vicini ai glutei. Solleva i fianchi contraendo i glutei. Versione diastasi-safe dell'hip thrust.",
        cues: ["Lombari neutri", "Talloni premuti a terra", "Strizza in cima", "Scendi lento"],
      },
    ],
    core: [
      { name: "Plank su gomiti", sets: 3, reps: "30 sec", tip: "Corpo in linea retta, gomiti sotto le spalle. Non alzare il sedere né lasciarlo cadere. Respira." },
      { name: "Side Plank", sets: 3, reps: "20 sec per lato", tip: "Gomito sotto la spalla, corpo in linea. Tieni i fianchi alti. Fondamentale per la diastasi." },
      { name: "Pallof Press al cavo", sets: 3, reps: "12 per lato", tip: "Cavo all'altezza del petto, stai di fianco. Spingi le mani in avanti resistendo alla rotazione. Core antirotazionale." },
    ],
  },
];

const mealPlan = {
  macros: { kcal: "1700-1800", protein: "110-120g", carbs: "160-180g", fats: "55-65g" },
  meals: [
    {
      time: "07:30",
      name: "Colazione",
      emoji: "🌸",
      example: "2 uova strapazzate + 1 fetta pane integrale + 150g yogurt greco 0% + frutti di bosco",
      protein: "~30g",
      note: "Inizia sempre con le proteine — ti sazia e attiva il metabolismo",
    },
    {
      time: "10:30",
      name: "Spuntino",
      emoji: "🍎",
      example: "Frutta + 10 mandorle oppure yogurt greco piccolo",
      protein: "~8g",
      note: "Solo se hai fame. Non forzarti.",
    },
    {
      time: "13:00",
      name: "Pranzo",
      emoji: "🥗",
      example: null,
      protein: "~35g",
      note: "Il pasto critico — prepara sempre qualcosa in anticipo",
      emergencyOptions: [
        { label: "10 min", meal: "Pollo già cotto + riso precotto + verdure surgelate al vapore" },
        { label: "3 min", meal: "Tonno al naturale + pane integrale + pomodori" },
        { label: "5 min", meal: "Uova sode + avocado + cracker integrali" },
        { label: "0 min", meal: "Fiocchi di latte + frutta + noci" },
      ],
    },
    {
      time: "16:30",
      name: "Pre-workout",
      emoji: "⚡",
      example: "Banana + 1 cucchiaio burro di mandorle oppure shake proteico whey",
      protein: "~15g",
      note: "Fondamentale se ti alleni nel pomeriggio. Non allenarti a digiuno.",
    },
    {
      time: "20:00",
      name: "Cena",
      emoji: "🌙",
      example: null,
      protein: "~35g",
      note: "Varia le fonti proteiche ogni sera",
      dinnerOptions: [
        "Salmone al forno + patate dolci + insalata",
        "Manzo magro + quinoa + zucchine",
        "Pollo al forno + riso integrale + broccoli",
        "Uova in camicia + legumi + verdure grigliate",
      ],
    },
  ],
  rules: [
    { icon: "🥩", text: "Una fonte proteica in ogni singolo pasto — senza eccezioni" },
    { icon: "🚫", text: "Alcol ridotto al minimo — interferisce con recupero muscolare e ormoni" },
    { icon: "⏰", text: "Non saltare i pasti — abbassa il metabolismo e porta a mangiare in modo caotico" },
    { icon: "💧", text: "2 litri d'acqua al giorno — soprattutto nei giorni di allenamento" },
    { icon: "🥛", text: "Whey protein: 1 shake al giorno se non riesci a raggiungere le proteine col cibo" },
  ],
};

const hotelRoutine = {
  duration: "25-30 min",
  equipment: "Mini band elastica",
  note: "Stessa logica del piano principale. Mantieni il ritmo neuromuscolare così quando torni non stai ricominciando — stai solo tornando alla versione completa.",
  warmup: {
    name: "Marcia sul posto + Hip circle",
    duration: "3 min",
    detail: "2 min marcia alzando le ginocchia · 1 min rotazioni del bacino",
  },
  circuit: {
    label: "Circuito unico — 3 giri",
    rest: "30 sec tra gli esercizi · 90 sec tra i giri",
    exercises: [
      {
        name: "Glute Bridge con elastico",
        reps: "20 reps",
        emoji: "🍑",
        tip: "Elastico sopra le ginocchia, schiena a terra. Spingi le ginocchia verso l'esterno contro l'elastico mentre sollevi i fianchi. Strizza forte in cima.",
        cues: ["Ginocchia fuori contro l'elastico", "Talloni vicini ai glutei", "1 secondo di hold in cima", "Scendi lento"],
        why: "Sostituisce l'hip thrust — stesso pattern di movimento",
      },
      {
        name: "Sumo Squat con pulse",
        reps: "15 reps + 10 pulse in basso",
        emoji: "✨",
        tip: "Piedi larghi, punte fuori. Scendi a 90°, fai 10 piccoli 'pulse' in basso, poi risali. Brucia molto — è normale.",
        cues: ["Petto alto", "Ginocchia fuori", "Pulse piccoli e controllati", "Non rimbalzare"],
        why: "Gluteo e interno coscia senza attrezzi",
      },
      {
        name: "Donkey Kick con elastico",
        reps: "15 per lato",
        emoji: "🦵",
        tip: "A quattro zampe, elastico sopra le ginocchia. Spingi il tallone verso il soffitto mantenendo il ginocchio piegato a 90°. Non ruotare il bacino.",
        cues: ["Bacino fisso — non ruotare", "Spingi col tallone", "Core attivo", "Senti il gluteo lavorare"],
        why: "Sostituisce il cable kickback",
      },
      {
        name: "Hip Abduction laterale con elastico",
        reps: "20 per lato",
        emoji: "🌸",
        tip: "Sdraiata su un fianco, elastico sopra le ginocchia. Alza la gamba superiore aprendo le anche. Torna lenta.",
        cues: ["Fianchi impilati", "Apri lenta — chiudi lenta", "Non rotolare in avanti", "Senti il bruciore laterale"],
        why: "Sostituisce l'abductor machine — gluteo medio",
      },
      {
        name: "Pike Push-up",
        reps: "10-12 reps",
        emoji: "💪",
        tip: "Posizione a V rovesciata, mani larghezza spalle. Piega i gomiti portando la testa verso il pavimento. Esercizio per spalle e tricipiti.",
        cues: ["Schiena dritta", "Gomiti verso l'esterno", "Testa verso il pavimento", "Spingi col corpo intero"],
        why: "Sostituisce shoulder press e parte di tricipiti",
      },
      {
        name: "Superman hold",
        reps: "12 reps — 3 sec hold",
        emoji: "🦸",
        tip: "Sdraiata a pancia in giù, alza contemporaneamente braccia e gambe tenendo 3 secondi. Attiva tutta la catena posteriore. Diastasi-safe.",
        cues: ["Strizza i glutei", "Guarda il pavimento", "Tieni 3 secondi", "Scendi controllata"],
        why: "Sostituisce hyperextension — lombari e glutei",
      },
      {
        name: "Squat Jump (opzionale)",
        reps: "10 reps",
        emoji: "⚡",
        tip: "Solo se ti senti in forma quel giorno. Scendi in squat ed esplodi verso l'alto. Atterra morbida sulle punte poi sui talloni. Cardio finale.",
        cues: ["Atterra morbida", "Ginocchia leggermente piegate all'atterraggio", "Esplodi dalla posizione squat", "Opzionale — non obbligatorio"],
        why: "Bonus cardio finale — skip se sei stanca",
        optional: true,
      },
    ],
  },
  coreFinale: [
    { name: "Dead Bug", reps: "8 per lato × 2 serie", tip: "Come in palestra — schiena neutra, lombare a terra, respira." },
    { name: "Side Plank", reps: "20 sec per lato × 2", tip: "Fondamentale per la diastasi. Corpo in linea, fianchi alti." },
  ],
  rule: "Nei 3 giorni di trasferta fai almeno 2 sessioni su 3. Non tutte e 3 se non riesci — 2 bastano per non perdere il ritmo.",
};

const progressionGuide = [
  { week: "Settimane 1-2", focus: "Tecnica", color: palette.blush, detail: "Vai leggera sui pesi. L'obiettivo è imparare il movimento correttamente. Non aumentare nulla." },
  { week: "Settimane 3-4", focus: "Adattamento", color: "#F5E6B8", detail: "Inizia ad aggiungere carico quando le reps diventano facili. Dovresti sentire la fatica all'ultima reps." },
  { week: "Settimane 5-6", focus: "Progressione", color: palette.lightSage, detail: "Aumenti regolari ogni 2 settimane. Dovresti iniziare a vedere i primi cambiamenti visibili." },
  { week: "Settimane 7-8", focus: "Risultati", color: "#E8D5F5", detail: "Progressivo overload consolidato. I glutei iniziano a rispondere. La postura migliora visibilmente." },
];

export default function FitnessPlan() {
  const [activeTab, setActiveTab] = useState("workout");
  const [activeDay, setActiveDay] = useState("A");
  const [expandedExercise, setExpandedExercise] = useState(null);
  const [expandedHotel, setExpandedHotel] = useState(null);
  const [checkedDays, setCheckedDays] = useState({});
  const toggleDay = (key) => setCheckedDays(prev => ({ ...prev, [key]: !prev[key] }));
  const streak = Object.values(checkedDays).filter(Boolean).length;

  const currentDay = workoutDays.find((d) => d.id === activeDay);

  return (
    <div style={{
      fontFamily: "'DM Sans', sans-serif",
      background: palette.cream,
      minHeight: "100vh",
      color: palette.deepPlum,
      maxWidth: 480,
      margin: "0 auto",
      paddingBottom: 100,
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&family=Playfair+Display:ital,wght@1,400;1,600&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, ${palette.dustyRose} 0%, ${palette.mauve} 100%)`,
        padding: "32px 24px 28px",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: -20, right: -20,
          width: 120, height: 120,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.1)",
        }} />
        <div style={{
          position: "absolute", bottom: -30, left: -10,
          width: 80, height: 80,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.08)",
        }} />
        <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 12, letterSpacing: 3, textTransform: "uppercase", margin: "0 0 6px", fontWeight: 500 }}>
          Il tuo piano
        </p>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontStyle: "italic",
          fontSize: 28,
          color: "white",
          margin: "0 0 4px",
          fontWeight: 400,
        }}>
          Fit & Lean
        </h1>
        <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 13, margin: 0, fontWeight: 300 }}>
          3 giorni pesi · 1 corso · 8 settimane
        </p>

        {/* Quick stats */}
        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          {[{ label: "Sessioni/sett.", value: "3-4" }, { label: "Durata", value: "~50 min" }, { label: "Obiettivo", value: "Lean & toned" }].map((s) => (
            <div key={s.label} style={{
              background: "rgba(255,255,255,0.2)",
              borderRadius: 10,
              padding: "8px 12px",
              flex: 1,
              backdropFilter: "blur(10px)",
            }}>
              <div style={{ color: "white", fontSize: 15, fontWeight: 500 }}>{s.value}</div>
              <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 10, marginTop: 1 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        display: "flex",
        background: "white",
        borderBottom: `1px solid ${palette.blush}`,
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}>
        {[
          { id: "workout", label: "Allenamento", icon: "🏋️" },
          { id: "nutrition", label: "Alimentazione", icon: "🥗" },
          { id: "hotel", label: "Hotel", icon: "🧳" },
          { id: "progression", label: "Piano", icon: "📈" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1,
              padding: "14px 8px",
              border: "none",
              background: "none",
              cursor: "pointer",
              fontSize: 11,
              fontWeight: activeTab === tab.id ? 600 : 400,
              color: activeTab === tab.id ? palette.dustyRose : palette.mauve,
              borderBottom: activeTab === tab.id ? `2px solid ${palette.dustyRose}` : "2px solid transparent",
              transition: "all 0.2s",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            <div style={{ fontSize: 16, marginBottom: 2 }}>{tab.icon}</div>
            {tab.label}
          </button>
        ))}
      </div>

      {/* WORKOUT TAB */}
      {activeTab === "workout" && (
        <div style={{ padding: "20px 16px" }}>
          {/* Weekly schedule */}
          <div style={{
            background: "white",
            borderRadius: 16,
            padding: 16,
            marginBottom: 20,
            boxShadow: "0 2px 12px rgba(61,31,45,0.06)",
          }}>
            <p style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: palette.mauve, margin: "0 0 12px", fontWeight: 600 }}>
              Schema settimanale
            </p>
            {[
              { day: "Lunedì", session: "Giorno A — Glutei + Post. coscia", emoji: "🍑" },
              { day: "Martedì", session: "Riposo attivo", emoji: "🧘", rest: true },
              { day: "Mercoledì", session: "Giorno B — Schiena + Braccia", emoji: "💪" },
              { day: "Giovedì", session: "Riposo attivo", emoji: "🧘", rest: true },
              { day: "Venerdì", session: "Giorno C — Glutei Full + Core", emoji: "✨" },
              { day: "Sabato", session: "Barre o Pilates (corso)", emoji: "🩰" },
              { day: "Domenica", session: "Riposo completo", emoji: "💤", rest: true },
            ].map((item) => (
              <div key={item.day} style={{
                display: "flex",
                alignItems: "center",
                padding: "8px 0",
                borderBottom: `1px solid ${palette.cream}`,
                opacity: item.rest ? 0.5 : 1,
              }}>
                <span style={{ fontSize: 16, width: 28 }}>{item.emoji}</span>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: palette.mauve }}>{item.day}</span>
                  <p style={{ margin: 0, fontSize: 12, color: palette.deepPlum }}>{item.session}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Day selector */}
          <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
            {workoutDays.map((day) => (
              <button
                key={day.id}
                onClick={() => { setActiveDay(day.id); setExpandedExercise(null); }}
                style={{
                  flex: 1,
                  padding: "12px 8px",
                  borderRadius: 12,
                  border: activeDay === day.id ? `2px solid ${palette.dustyRose}` : "2px solid transparent",
                  background: activeDay === day.id ? palette.blush : "white",
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                  transition: "all 0.2s",
                }}
              >
                <div style={{ fontSize: 20 }}>{day.emoji}</div>
                <div style={{ fontSize: 11, fontWeight: 600, color: palette.deepPlum, marginTop: 4 }}>{day.label}</div>
                <div style={{ fontSize: 9, color: palette.mauve }}>{day.subtitle.split(" + ")[0]}</div>
              </button>
            ))}
          </div>

          {/* Warmup */}
          <div style={{
            background: `linear-gradient(135deg, ${palette.sage}33, ${palette.lightSage})`,
            borderRadius: 12,
            padding: 14,
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}>
            <span style={{ fontSize: 24 }}>🔥</span>
            <div>
              <p style={{ margin: 0, fontSize: 11, color: palette.mauve, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>Warm-up</p>
              <p style={{ margin: "2px 0 0", fontSize: 14, fontWeight: 500, color: palette.deepPlum }}>{currentDay.warmup.name}</p>
              <p style={{ margin: 0, fontSize: 12, color: palette.mauve }}>{currentDay.warmup.duration} · {currentDay.warmup.detail}</p>
            </div>
          </div>

          {/* Exercises */}
          <p style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: palette.mauve, margin: "0 0 10px", fontWeight: 600 }}>
            Esercizi principali
          </p>
          {currentDay.exercises.map((ex, i) => (
            <div key={ex.name} style={{
              background: "white",
              borderRadius: 14,
              marginBottom: 10,
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(61,31,45,0.06)",
            }}>
              <button
                onClick={() => setExpandedExercise(expandedExercise === i ? null : i)}
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                <div style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: currentDay.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 13,
                  fontWeight: 700,
                  color: palette.deepPlum,
                  flexShrink: 0,
                }}>
                  {i + 1}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: palette.deepPlum }}>{ex.name}</p>
                  <p style={{ margin: "2px 0 0", fontSize: 11, color: palette.mauve }}>
                    {ex.sets} serie × {ex.reps} reps · {ex.startWeight}
                  </p>
                  {ex.priority && (
                    <p style={{ margin: "4px 0 0", fontSize: 10, color: palette.dustyRose, fontWeight: 600 }}>{ex.priority}</p>
                  )}
                </div>
                <span style={{ color: palette.mauve, fontSize: 16, transform: expandedExercise === i ? "rotate(180deg)" : "rotate(0)", transition: "0.2s" }}>▾</span>
              </button>

              {expandedExercise === i && (
                <div style={{ padding: "0 16px 16px", borderTop: `1px solid ${palette.cream}` }}>
                  {/* Sets/Reps/Weight visual */}
                  <div style={{ display: "flex", gap: 8, marginTop: 12, marginBottom: 12 }}>
                    {[
                      { label: "Serie", value: ex.sets },
                      { label: "Reps", value: ex.reps },
                      { label: "Peso inizio", value: ex.startWeight },
                    ].map((s) => (
                      <div key={s.label} style={{
                        flex: 1,
                        background: palette.cream,
                        borderRadius: 10,
                        padding: "10px 6px",
                        textAlign: "center",
                      }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: palette.dustyRose }}>{s.value}</div>
                        <div style={{ fontSize: 9, color: palette.mauve, marginTop: 2 }}>{s.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Tip */}
                  <div style={{
                    background: `${palette.blush}50`,
                    borderRadius: 10,
                    padding: "10px 12px",
                    marginBottom: 10,
                  }}>
                    <p style={{ margin: "0 0 4px", fontSize: 10, fontWeight: 700, color: palette.dustyRose, letterSpacing: 1, textTransform: "uppercase" }}>Come si fa</p>
                    <p style={{ margin: 0, fontSize: 12, color: palette.deepPlum, lineHeight: 1.5 }}>{ex.tip}</p>
                  </div>

                  {/* Cues */}
                  {ex.cues && (
                    <div style={{ marginBottom: 10 }}>
                      <p style={{ margin: "0 0 6px", fontSize: 10, fontWeight: 700, color: palette.mauve, letterSpacing: 1, textTransform: "uppercase" }}>Cues mentali</p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {ex.cues.map((c) => (
                          <span key={c} style={{
                            background: palette.lightSage,
                            borderRadius: 20,
                            padding: "4px 10px",
                            fontSize: 11,
                            color: palette.deepPlum,
                          }}>{c}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Progression */}
                  <div style={{
                    background: `${palette.warmGold}20`,
                    borderRadius: 10,
                    padding: "10px 12px",
                    borderLeft: `3px solid ${palette.warmGold}`,
                  }}>
                    <p style={{ margin: "0 0 3px", fontSize: 10, fontWeight: 700, color: palette.warmGold, letterSpacing: 1, textTransform: "uppercase" }}>📈 Progressione pesi</p>
                    <p style={{ margin: 0, fontSize: 12, color: palette.deepPlum, lineHeight: 1.5 }}>{ex.progression}</p>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Core */}
          {currentDay.core.length > 0 && (
            <>
              <p style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: palette.mauve, margin: "16px 0 10px", fontWeight: 600 }}>
                Core diastasi-safe 🦋
              </p>
              {currentDay.core.map((ex) => (
                <div key={ex.name} style={{
                  background: "white",
                  borderRadius: 12,
                  padding: "12px 16px",
                  marginBottom: 8,
                  boxShadow: "0 1px 6px rgba(61,31,45,0.05)",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <p style={{ margin: 0, fontWeight: 600, fontSize: 13, color: palette.deepPlum }}>{ex.name}</p>
                    <span style={{ fontSize: 11, color: palette.dustyRose, fontWeight: 500 }}>{ex.sets} × {ex.reps}</span>
                  </div>
                  <p style={{ margin: "6px 0 0", fontSize: 11, color: palette.mauve, lineHeight: 1.4 }}>{ex.tip}</p>
                </div>
              ))}
            </>
          )}
        </div>
      )}

      {/* NUTRITION TAB */}
      {activeTab === "nutrition" && (
        <div style={{ padding: "20px 16px" }}>
          {/* Macros */}
          <div style={{
            background: `linear-gradient(135deg, ${palette.mauve}, ${palette.dustyRose})`,
            borderRadius: 16,
            padding: 18,
            marginBottom: 20,
            color: "white",
          }}>
            <p style={{ margin: "0 0 14px", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", opacity: 0.8, fontWeight: 600 }}>
              Il tuo fabbisogno giornaliero
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              {[
                { label: "Calorie", value: mealPlan.macros.kcal, unit: "kcal" },
                { label: "Proteine", value: mealPlan.macros.protein, unit: "" },
                { label: "Carbo", value: mealPlan.macros.carbs, unit: "" },
                { label: "Grassi", value: mealPlan.macros.fats, unit: "" },
              ].map((m) => (
                <div key={m.label} style={{
                  flex: 1,
                  background: "rgba(255,255,255,0.2)",
                  borderRadius: 10,
                  padding: "10px 6px",
                  textAlign: "center",
                  backdropFilter: "blur(10px)",
                }}>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{m.value}</div>
                  <div style={{ fontSize: 9, opacity: 0.8, marginTop: 2 }}>{m.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Meals */}
          <p style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: palette.mauve, margin: "0 0 12px", fontWeight: 600 }}>
            Struttura dei pasti
          </p>
          {mealPlan.meals.map((meal) => (
            <div key={meal.name} style={{
              background: "white",
              borderRadius: 14,
              padding: "14px 16px",
              marginBottom: 10,
              boxShadow: "0 2px 8px rgba(61,31,45,0.05)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: 22 }}>{meal.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: palette.deepPlum }}>{meal.name}</p>
                    <span style={{ fontSize: 10, background: palette.blush, borderRadius: 20, padding: "2px 8px", color: palette.mauve }}>{meal.time}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: 11, color: palette.dustyRose, fontWeight: 500 }}>Proteine: {meal.protein}</p>
                </div>
              </div>

              {meal.example && (
                <p style={{
                  margin: "0 0 8px",
                  fontSize: 12,
                  color: palette.deepPlum,
                  background: palette.cream,
                  padding: "8px 10px",
                  borderRadius: 8,
                  lineHeight: 1.4,
                }}>{meal.example}</p>
              )}

              {meal.emergencyOptions && (
                <div style={{ marginBottom: 8 }}>
                  <p style={{ margin: "0 0 6px", fontSize: 10, fontWeight: 700, color: palette.mauve, letterSpacing: 1, textTransform: "uppercase" }}>Opzioni veloci</p>
                  {meal.emergencyOptions.map((opt) => (
                    <div key={opt.label} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 4 }}>
                      <span style={{
                        background: palette.lightSage,
                        borderRadius: 20,
                        padding: "2px 8px",
                        fontSize: 10,
                        color: palette.mauve,
                        fontWeight: 600,
                        flexShrink: 0,
                      }}>{opt.label}</span>
                      <p style={{ margin: 0, fontSize: 11, color: palette.deepPlum, lineHeight: 1.4 }}>{opt.meal}</p>
                    </div>
                  ))}
                </div>
              )}

              {meal.dinnerOptions && (
                <div style={{ marginBottom: 8 }}>
                  {meal.dinnerOptions.map((opt) => (
                    <p key={opt} style={{ margin: "0 0 4px", fontSize: 11, color: palette.deepPlum }}>· {opt}</p>
                  ))}
                </div>
              )}

              <p style={{
                margin: 0,
                fontSize: 11,
                color: palette.mauve,
                fontStyle: "italic",
              }}>{meal.note}</p>
            </div>
          ))}

          {/* Rules */}
          <p style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: palette.mauve, margin: "16px 0 12px", fontWeight: 600 }}>
            Le regole d'oro
          </p>
          {mealPlan.rules.map((rule) => (
            <div key={rule.text} style={{
              display: "flex",
              gap: 10,
              alignItems: "flex-start",
              padding: "10px 14px",
              background: "white",
              borderRadius: 12,
              marginBottom: 8,
              boxShadow: "0 1px 6px rgba(61,31,45,0.04)",
            }}>
              <span style={{ fontSize: 18, flexShrink: 0 }}>{rule.icon}</span>
              <p style={{ margin: 0, fontSize: 12, color: palette.deepPlum, lineHeight: 1.4 }}>{rule.text}</p>
            </div>
          ))}

          {/* PT Note */}
          <div style={{
            background: `linear-gradient(135deg, ${palette.warmGold}20, ${palette.blush}50)`,
            borderRadius: 14,
            padding: 16,
            marginTop: 16,
            borderLeft: `3px solid ${palette.warmGold}`,
          }}>
            <p style={{ margin: "0 0 6px", fontSize: 12, fontWeight: 700, color: palette.warmGold }}>💛 Nota importante</p>
            <p style={{ margin: 0, fontSize: 12, color: palette.deepPlum, lineHeight: 1.5 }}>
              Venendo da Mounjaro il tuo appetito sta tornando alla normalità. Non entrare in un deficit calorico aggressivo — il tuo obiettivo ora è costruire muscolo, non perdere peso. Mangiare abbastanza è parte del piano.
            </p>
          </div>
        </div>
      )}

      {/* HOTEL TAB */}
      {activeTab === "hotel" && (
        <div style={{ padding: "20px 16px" }}>
          {/* Header card */}
          <div style={{
            background: `linear-gradient(135deg, ${palette.mauve}, #7B5EA7)`,
            borderRadius: 16,
            padding: 18,
            marginBottom: 20,
            color: "white",
          }}>
            <p style={{ margin: "0 0 4px", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", opacity: 0.8, fontWeight: 600 }}>
              Routine trasferta
            </p>
            <h2 style={{ margin: "0 0 6px", fontSize: 22, fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 400 }}>
              Hotel Workout 🧳
            </h2>
            <p style={{ margin: "0 0 14px", fontSize: 12, opacity: 0.85, lineHeight: 1.5 }}>
              {hotelRoutine.note}
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              {[{ label: "Durata", value: hotelRoutine.duration }, { label: "Attrezzo", value: hotelRoutine.equipment }, { label: "Sessioni", value: "2/3 giorni" }].map(s => (
                <div key={s.label} style={{
                  flex: 1, background: "rgba(255,255,255,0.2)", borderRadius: 10,
                  padding: "8px 6px", textAlign: "center", backdropFilter: "blur(10px)",
                }}>
                  <div style={{ fontSize: 12, fontWeight: 700 }}>{s.value}</div>
                  <div style={{ fontSize: 9, opacity: 0.8, marginTop: 1 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Streak tracker */}
          <div style={{
            background: "white",
            borderRadius: 16,
            padding: 16,
            marginBottom: 20,
            boxShadow: "0 2px 12px rgba(61,31,45,0.06)",
          }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <p style={{ margin: 0, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: palette.mauve, fontWeight: 600 }}>
                Non rompere la catena
              </p>
              <span style={{
                background: streak > 0 ? palette.blush : palette.cream,
                borderRadius: 20, padding: "4px 10px", fontSize: 12, fontWeight: 700,
                color: streak > 0 ? palette.dustyRose : palette.mauve,
              }}>🔥 {streak} sessioni</span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {Array.from({ length: 32 }, (_, i) => {
                const key = `day-${i}`;
                const isChecked = checkedDays[key];
                return (
                  <button
                    key={key}
                    onClick={() => toggleDay(key)}
                    style={{
                      width: 36, height: 36, borderRadius: 8,
                      border: isChecked ? "none" : `1px solid ${palette.blush}`,
                      background: isChecked ? `linear-gradient(135deg, ${palette.dustyRose}, ${palette.mauve})` : palette.cream,
                      cursor: "pointer",
                      fontSize: 14,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: isChecked ? "white" : palette.mauve,
                      fontWeight: 600,
                      transition: "all 0.15s",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    {isChecked ? "✓" : i + 1}
                  </button>
                );
              })}
            </div>
            <p style={{ margin: "10px 0 0", fontSize: 11, color: palette.mauve, fontStyle: "italic" }}>
              Tocca ogni giorno dopo aver completato la sessione — in palestra o in hotel
            </p>
          </div>

          {/* Warmup */}
          <div style={{
            background: `linear-gradient(135deg, ${palette.sage}33, ${palette.lightSage})`,
            borderRadius: 12, padding: 14, marginBottom: 16,
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <span style={{ fontSize: 24 }}>🔥</span>
            <div>
              <p style={{ margin: 0, fontSize: 11, color: palette.mauve, fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>Warm-up · {hotelRoutine.warmup.duration}</p>
              <p style={{ margin: "2px 0 0", fontSize: 14, fontWeight: 500, color: palette.deepPlum }}>{hotelRoutine.warmup.name}</p>
              <p style={{ margin: 0, fontSize: 12, color: palette.mauve }}>{hotelRoutine.warmup.detail}</p>
            </div>
          </div>

          {/* Circuit info */}
          <div style={{
            background: `${palette.warmGold}20`,
            borderRadius: 12, padding: "10px 14px", marginBottom: 14,
            borderLeft: `3px solid ${palette.warmGold}`,
          }}>
            <p style={{ margin: 0, fontSize: 12, color: palette.deepPlum, fontWeight: 600 }}>{hotelRoutine.circuit.label}</p>
            <p style={{ margin: "2px 0 0", fontSize: 11, color: palette.mauve }}>{hotelRoutine.circuit.rest}</p>
          </div>

          {/* Hotel exercises */}
          {hotelRoutine.circuit.exercises.map((ex, i) => (
            <div key={ex.name} style={{
              background: ex.optional ? `${palette.lightSage}80` : "white",
              borderRadius: 14, marginBottom: 10, overflow: "hidden",
              boxShadow: "0 2px 8px rgba(61,31,45,0.05)",
              border: ex.optional ? `1px dashed ${palette.sage}` : "none",
            }}>
              <button
                onClick={() => setExpandedHotel(expandedHotel === i ? null : i)}
                style={{
                  width: "100%", padding: "14px 16px",
                  display: "flex", alignItems: "center", gap: 12,
                  background: "none", border: "none", cursor: "pointer",
                  textAlign: "left", fontFamily: "'DM Sans', sans-serif",
                }}
              >
                <span style={{ fontSize: 22, flexShrink: 0 }}>{ex.emoji}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: 14, fontWeight: 600, color: palette.deepPlum }}>
                    {ex.name}
                    {ex.optional && <span style={{ fontSize: 10, color: palette.sage, marginLeft: 6, fontWeight: 400 }}>opzionale</span>}
                  </p>
                  <p style={{ margin: "2px 0 0", fontSize: 11, color: palette.mauve }}>{ex.reps}</p>
                  <p style={{ margin: "3px 0 0", fontSize: 10, color: palette.dustyRose, fontStyle: "italic" }}>{ex.why}</p>
                </div>
                <span style={{ color: palette.mauve, fontSize: 16, transform: expandedHotel === i ? "rotate(180deg)" : "rotate(0)", transition: "0.2s" }}>▾</span>
              </button>

              {expandedHotel === i && (
                <div style={{ padding: "0 16px 16px", borderTop: `1px solid ${palette.cream}` }}>
                  <div style={{ background: `${palette.blush}50`, borderRadius: 10, padding: "10px 12px", margin: "12px 0 10px" }}>
                    <p style={{ margin: "0 0 4px", fontSize: 10, fontWeight: 700, color: palette.dustyRose, letterSpacing: 1, textTransform: "uppercase" }}>Come si fa</p>
                    <p style={{ margin: 0, fontSize: 12, color: palette.deepPlum, lineHeight: 1.5 }}>{ex.tip}</p>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {ex.cues.map(c => (
                      <span key={c} style={{
                        background: palette.lightSage, borderRadius: 20,
                        padding: "4px 10px", fontSize: 11, color: palette.deepPlum,
                      }}>{c}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Core finale */}
          <p style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: palette.mauve, margin: "16px 0 10px", fontWeight: 600 }}>
            Core finale 🦋
          </p>
          {hotelRoutine.coreFinale.map(ex => (
            <div key={ex.name} style={{
              background: "white", borderRadius: 12, padding: "12px 16px",
              marginBottom: 8, boxShadow: "0 1px 6px rgba(61,31,45,0.05)",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <p style={{ margin: 0, fontWeight: 600, fontSize: 13, color: palette.deepPlum }}>{ex.name}</p>
                <span style={{ fontSize: 11, color: palette.dustyRose, fontWeight: 500 }}>{ex.reps}</span>
              </div>
              <p style={{ margin: "6px 0 0", fontSize: 11, color: palette.mauve, lineHeight: 1.4 }}>{ex.tip}</p>
            </div>
          ))}

          {/* The rule */}
          <div style={{
            background: `linear-gradient(135deg, ${palette.dustyRose}, ${palette.mauve})`,
            borderRadius: 14, padding: 16, marginTop: 16, color: "white",
          }}>
            <p style={{ margin: "0 0 6px", fontSize: 13, fontWeight: 700 }}>La regola della trasferta</p>
            <p style={{ margin: 0, fontSize: 12, opacity: 0.9, lineHeight: 1.6 }}>{hotelRoutine.rule}</p>
          </div>
        </div>
      )}


      {activeTab === "progression" && (
        <div style={{ padding: "20px 16px" }}>
          <p style={{ fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: palette.mauve, margin: "0 0 12px", fontWeight: 600 }}>
            La tua roadmap 8 settimane
          </p>

          {progressionGuide.map((phase, i) => (
            <div key={phase.week} style={{
              background: "white",
              borderRadius: 14,
              padding: 16,
              marginBottom: 10,
              boxShadow: "0 2px 8px rgba(61,31,45,0.05)",
              borderLeft: `4px solid ${[palette.blush, palette.warmGold, palette.sage, palette.dustyRose][i]}`,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <div style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: [palette.blush, "#F5E6B8", palette.lightSage, "#E8D5F5"][i],
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 12,
                  fontWeight: 700,
                  color: palette.deepPlum,
                }}>
                  {i + 1}
                </div>
                <div>
                  <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: palette.deepPlum }}>{phase.week}</p>
                  <p style={{ margin: 0, fontSize: 11, color: palette.dustyRose, fontWeight: 600 }}>{phase.focus}</p>
                </div>
              </div>
              <p style={{ margin: 0, fontSize: 12, color: palette.mauve, lineHeight: 1.5 }}>{phase.detail}</p>
            </div>
          ))}

          {/* Progression rule */}
          <div style={{
            background: `linear-gradient(135deg, ${palette.dustyRose}, ${palette.mauve})`,
            borderRadius: 16,
            padding: 18,
            marginTop: 8,
            color: "white",
          }}>
            <p style={{ margin: "0 0 10px", fontSize: 13, fontWeight: 700 }}>La regola del progressive overload</p>
            <p style={{ margin: "0 0 14px", fontSize: 12, opacity: 0.9, lineHeight: 1.5 }}>
              Aumenta il peso solo quando riesci a completare tutte le serie e le reps con buona tecnica per 2 sessioni consecutive. Mai sacrificare la forma per il carico.
            </p>
            <div style={{ background: "rgba(255,255,255,0.15)", borderRadius: 10, padding: "10px 14px" }}>
              <p style={{ margin: 0, fontSize: 12, opacity: 0.9 }}>
                <strong>Quanto aumentare:</strong><br />
                Esercizi grandi (squat, hip thrust, deadlift) → +2.5-5kg<br />
                Esercizi piccoli (curl, tricep) → +1-2kg<br />
                Macchinari → +5kg
              </p>
            </div>
          </div>

          {/* PT recommendation */}
          <div style={{
            background: "white",
            borderRadius: 14,
            padding: 16,
            marginTop: 10,
            boxShadow: "0 2px 8px rgba(61,31,45,0.05)",
          }}>
            <p style={{ margin: "0 0 8px", fontSize: 13, fontWeight: 700, color: palette.deepPlum }}>🎯 Consiglio PT</p>
            <p style={{ margin: 0, fontSize: 12, color: palette.mauve, lineHeight: 1.5 }}>
              Fai almeno 2-3 sessioni iniziali con il personal trainer di Virgin Active per impostare la tecnica di hip thrust, romanian deadlift e lat machine. È l'investimento più importante che puoi fare per questi 8 mesi.
            </p>
          </div>

          {/* Barre/Pilates note */}
          <div style={{
            background: "#F9F0FF",
            borderRadius: 14,
            padding: 16,
            marginTop: 10,
            borderLeft: `3px solid #C49FE8`,
          }}>
            <p style={{ margin: "0 0 8px", fontSize: 13, fontWeight: 700, color: palette.deepPlum }}>🩰 Pilates / Barre</p>
            <p style={{ margin: 0, fontSize: 12, color: palette.mauve, lineHeight: 1.5 }}>
              Il corso del sabato è un complemento perfetto, non un sostituto. Lavorerà sul core profondo, il trasverso addominale (ottimo per la diastasi), e sulla postura. Col tempo sentirai una connessione mente-muscolo molto più forte che trasferirà i benefici anche ai pesi.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
