import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Moon, 
  Sparkles, 
  BookOpen, 
  Trophy, 
  ChevronLeft, 
  ChevronRight, 
  Calendar,
  Clock,
  Info
} from 'lucide-react';

// Prayer data from user
const PRAYERS = [
  { night: 1, rakkas: "10 rakkas (5 sallama)", recitation: "1 Fatiha, 2 Khoul ya ayouhal kafirouna, 2 Khoul hou allahou ahad", reward: "La chair sera préservée de la flamme de l’Enfer." },
  { night: 2, rakkas: "6 rakkas (3 sallama)", recitation: "1 Fatiha, 5 Inna a’taïlnaka", reward: "Les péchés sont annulés, grandes grâces accordées." },
  { night: 3, rakkas: "6 rakkas (3 sallama)", recitation: "1 Fatiha, 1 Inna anzal nahou", reward: "Récompenses équivalentes à libérer mille esclaves." },
  { night: 4, rakkas: "4 rakkas (2 sallama)", recitation: "1 Fatiha, 3 Khoul ya ayouhal kafirouna", reward: "Péchés effacés sur place." },
  { night: 5, rakkas: "8 rakkas (4 sallama)", recitation: "1 Fatiha, 1 Alam nasra, 3 Khoul hou allahou ahad", reward: "Anges inscrivent mérites et effacent actions mauvaises." },
  { night: 6, rakkas: "2 rakkas (1 sallama)", recitation: "1 Fatiha, 10 Khoul hou allahou ahad", reward: "Guidé par lumière vers le Paradis." },
  { night: 7, rakkas: "6 rakkas (3 sallama)", recitation: "1 Fatiha, 7 Khoul ya ayouhal kafirouna, 7 Khoul hou allahou ahad", reward: "Récompenses considérables et entrée au ciel." },
  { night: 8, rakkas: "2 rakkas (1 sallama)", recitation: "1 Fatiha, 12 Khoul hou allahou ahad, 12 Khoul aouzou birabbil nassi", reward: "Mérites équivalents à mille ans d’adoration." },
  { night: 9, rakkas: "8 rakkas (4 sallama)", recitation: "1 Fatiha, 3 Tabat yadha, 3 Khoul hou allahou ahad", reward: "Paradis grandement ouvert." },
  { night: 10, rakkas: "4 rakkas (2 sallama)", recitation: "1 Fatiha, Ayatoul Koursiyou, Inna anzal nahou, 12 Khoul hou allahou ahad", reward: "Péchés effacés et 70 personnes graciées." },
  { night: 11, rakkas: "4 rakkas (2 sallama)", recitation: "1 Fatiha, 7 Inna anzal nahou, 7 Khoul hou allahou ahad, puis 70 La hawla… et 70 Allahouma salli…", reward: "Pardon complet des péchés et protection spirituelle." },
  { night: 12, rakkas: "10 rakkas (5 sallama)", recitation: "1 Fatiha, 6 Khoul hou allahou ahad", reward: "Mille étages de paradis construits en bijoux." },
  { night: 13, rakkas: "10 rakkas (5 sallama)", recitation: "1 Fatiha, 7 Issadja a nasroulahi, 7 Khoul hou allahou ahad", reward: "Récompense infinie et 7 châteaux précieux." },
  { night: 14, rakkas: "8 rakkas (4 sallama)", recitation: "1 Fatiha, 7 Issadja a nasroulahi, 7 Khoul hou allahou ahad, puis 70 La hawla…", reward: "Préservé de la peur du jour de la résurrection." },
  { night: 15, rakkas: "6 rakkas (3 sallama)", recitation: "1 Fatiha, 1 Issadja a nasroulahi, 35 Khoul hou allahou ahad", reward: "DIEU exaucera comme demandé." },
  { night: 16, rakkas: "6 rakkas (3 sallama)", recitation: "1 Fatiha, 10 Izza zoulzilati ardi", reward: "Péchés pardonnés, protection divine." },
  { night: 17, rakkas: "10 rakkas (5 sallama)", recitation: "1 Fatiha, 2 Inna anzal nahou, 2 Khoul hou allahou ahad", reward: "Considéré comme vrai croyant." },
  { night: 18, rakkas: "12 rakkas (6 sallama)", recitation: "1 Fatiha, 1 Sabisma rabbika lahla, 1 Khoul ya ayouhal kafirouna, 1 Khoul hou allahou ahad", reward: "Récompense de richesse dépensée sur la voie de DIEU." },
  { night: 19, rakkas: "6 rakkas (3 sallama)", recitation: "1 Fatiha, 7 Khoul hou allahou ahad", reward: "Prières acceptées et entrée rapide au Paradis." },
  { night: 20, rakkas: "10 rakkas (5 sallama)", recitation: "1 Fatiha, 3 Inna anzal nahou, 3 Khoul hou allahou ahad", reward: "Considéré comme ayant jeûné 50 ans." },
  { night: 21, rakkas: "4 rakkas (2 sallama)", recitation: "1 Fatiha, 10 Khoul hou allahou ahad", reward: "Récompenses équivalentes à grands dons et lecture des livres sacrés." },
  { night: 22, rakkas: "2 rakkas (1 sallama)", recitation: "1 Fatiha, 1 Sabisma rabbika lahla, 3 Khoul aouzou birabbil nassi", reward: "70 cités de Paradis construites." },
  { night: 23, rakkas: "4 rakkas (2 sallama)", recitation: "1 Fatiha, 5 Issadja a nasroulahi, 5 Khoul hou allahou ahad", reward: "Péchés pardonnés et lumière jusqu’au Paradis." },
  { night: 24, rakkas: "6 rakkas (3 sallama)", recitation: "1 Fatiha, 6 Khoul aouzou birabbil falakhi, 6 Khoul aouzou birabbil nassi", reward: "Facilité le jour de la résurrection." },
  { night: 25, rakkas: "8 rakkas (4 sallama)", recitation: "1 Fatiha, 4 Khoul hou allahou ahad", reward: "Pardon immédiat et mérite de mille ans." },
  { night: 26, rakkas: "10 rakkas (5 sallama)", recitation: "1 Fatiha, 5 Khoul hou allahou ahad, puis 22 Astakhfiroulahi", reward: "Récompenses égales aux prières innombrables." },
  { night: 27, rakkas: "12 rakkas (6 sallama)", recitation: "1 Fatiha, 10 Inna anzal nahou", reward: "Récompenses incalculables (Laylatoul khadr)." },
  { night: 28, rakkas: "4 rakkas (2 sallama)", recitation: "1 Fatiha, 1 Watini wa zaytouni, 1 Khoul ya ayouhal kafirouna, 5 Khoul hou allahou ahad, puis 100 Astakhfiroulahi et 100 Allahouma salli…", reward: "Péchés anciens et futurs pardonnés." },
  { night: 29, rakkas: "6 rakkas (3 sallama)", recitation: "1 Fatiha, 10 Khoul hou allahou ahad", reward: "70 000 édifices en diamant construits au Paradis." },
  { night: 30, rakkas: "4 rakkas (2 sallama)", recitation: "1 Fatiha, 25 Khoul ya ayouhal kafirouna", reward: "À l’abri de l’enfer et proches pardonnés." }
];

const RAMADAN_START = new Date("2026-02-19T00:00:00");

const SURAH_MAP: Record<string, string> = {
  "fatiha": "Al-Fatiha",
  "khoul hou allahou ahad": "Al-Ikhlas",
  "khoul ya ayouhal kafirouna": "Al-Kafirun",
  "inna anzal nahou": "Al-Qadr",
  "inna a’taïlnaka": "Al-Kawthar",
  "alam nasra": "Ash-Sharh",
  "khoul aouzou birabbil nassi": "An-Nas",
  "khoul aouzou birabbil falakhi": "Al-Falaq",
  "tabat yadha": "Al-Masad",
  "issadja a nasroulahi": "An-Nasr",
  "izza zoulzilati ardi": "Az-Zalzalah",
  "sabisma rabbika lahla": "Al-A'la",
  "watini wa zaytouni": "At-Tin",
  "ayatoul koursiyou": "Ayat al-Kursi",
  "astakhfiroulahi": "Istighfar",
  "allahouma salli": "Salat ala Nabi",
  "la hawla": "Hawqala"
};

const RecitationDisplay = ({ text }: { text: string }) => {
  if (!text) return null;

  const parts = text.split(/[,]| puis | et /).map(p => p.trim()).filter(Boolean);

  return (
    <div className="flex flex-wrap gap-4 pl-11">
      {parts.map((part, index) => {
        const match = part.match(/^(\d+)\s+(.*)$/);
        const count = match ? match[1] : null;
        const rawName = match ? match[2] : part;
        
        // Find formal name
        const normalized = rawName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        const formalName = Object.entries(SURAH_MAP).find(([key]) => 
          normalized.includes(key.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
        )?.[1];

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="glass px-5 py-3 rounded-[1.5rem] flex items-center gap-4 border-amber-500/10 hover:border-amber-500/40 transition-all group/item hover:shadow-[0_0_30px_rgba(245,158,11,0.1)]"
          >
            {count && (
              <div className="relative">
                <span className="w-10 h-10 rounded-xl bg-amber-500 text-black flex items-center justify-center text-sm font-bold shadow-[0_0_15px_rgba(245,158,11,0.3)] group-hover/item:scale-110 transition-transform">
                  {count}
                </span>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full animate-pulse" />
              </div>
            )}
            <div className="flex flex-col">
              {formalName && (
                <span className="text-[10px] text-amber-400/60 uppercase tracking-widest font-bold mb-0.5">
                  {formalName}
                </span>
              )}
              <span className="text-sm md:text-base font-medium text-white/90 leading-tight">
                {rawName}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default function App() {
  const [selectedNight, setSelectedNight] = useState<number>(1);
  const [currentNight, setCurrentNight] = useState<number>(1);
  const [isWidget, setIsWidget] = useState(false);

  useEffect(() => {
    // Check for widget mode
    const params = new URLSearchParams(window.location.search);
    setIsWidget(params.get('widget') === 'true');

    const now = new Date();
    const diff = now.getTime() - RAMADAN_START.getTime();
    const night = Math.max(1, Math.min(30, Math.floor(diff / (24 * 60 * 60 * 1000)) + 1));
    setCurrentNight(night);
    setSelectedNight(night);
  }, []);

  const prayer = useMemo(() => PRAYERS.find(p => p.night === selectedNight), [selectedNight]);

  const handleNext = () => setSelectedNight(prev => Math.min(30, prev + 1));
  const handlePrev = () => setSelectedNight(prev => Math.max(1, prev - 1));

  return (
    <div className="min-h-screen bg-[#0a0502] text-white/90 selection:bg-amber-500/30 overflow-hidden relative">
      {/* Atmospheric Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-amber-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/20 via-transparent to-transparent blur-3xl" />
      </div>

      <main className={`relative z-10 max-w-4xl mx-auto px-6 flex flex-col min-h-screen ${isWidget ? 'py-6' : 'py-12'}`}>
        {/* Header */}
        <header className={isWidget ? 'mb-6 text-center' : 'mb-12 text-center'}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-[10px] uppercase tracking-widest font-semibold text-amber-400 mb-4"
          >
            <Calendar className="w-3 h-3" />
            Ramadan 2026
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={`${isWidget ? 'text-3xl' : 'text-5xl md:text-7xl'} font-serif font-bold tracking-tight mb-2 text-glow`}
          >
            Nafila <span className="italic text-amber-400">Ramadan</span>
          </motion.h1>
          {!isWidget && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-white/50 text-sm max-w-md mx-auto"
            >
              Guide spirituel des prières surérogatoires pour chaque nuit du mois béni.
            </motion.p>
          )}
        </header>

        {/* Night Selector Grid/Scroll */}
        <div className={isWidget ? 'mb-6' : 'mb-12'}>
          <div className="flex items-center justify-between mb-4 px-2">
            <h2 className="text-xs uppercase tracking-widest font-bold text-white/40">Choisir une nuit</h2>
            <div className="flex items-center gap-2 text-[10px] text-amber-400/60">
              <Clock className="w-3 h-3" />
              Nuit actuelle: {currentNight}
            </div>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide mask-fade-edges">
            {PRAYERS.map((p) => (
              <button
                key={p.night}
                onClick={() => setSelectedNight(p.night)}
                className={`
                  flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-sm font-medium transition-all duration-300
                  ${selectedNight === p.night 
                    ? 'bg-amber-500 text-black scale-110 shadow-[0_0_20px_rgba(245,158,11,0.4)]' 
                    : 'glass hover:bg-white/10 text-white/60'}
                  ${currentNight === p.night && selectedNight !== p.night ? 'ring-2 ring-amber-500/50 ring-offset-2 ring-offset-[#0a0502]' : ''}
                `}
              >
                {p.night}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Card */}
        <div className="flex-grow flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedNight}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.05, y: -20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`
                relative glass rounded-[2.5rem] p-8 md:p-12 overflow-hidden
                ${selectedNight === 27 ? 'ring-2 ring-amber-400/30' : ''}
              `}
            >
              {/* Special Badge for Laylatoul Qadr */}
              {selectedNight === 27 && (
                <motion.div 
                  initial={{ rotate: -10, scale: 0 }}
                  animate={{ rotate: -5, scale: 1 }}
                  className="absolute top-6 right-6 bg-amber-400 text-black px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter flex items-center gap-1 shadow-xl z-20"
                >
                  <Sparkles className="w-3 h-3" />
                  Laylatoul Qadr
                </motion.div>
              )}

              <div className="relative z-10">
                <div className={`flex items-center gap-6 ${isWidget ? 'mb-4' : 'mb-8'}`}>
                  <div className={`${isWidget ? 'w-12 h-12' : 'w-16 h-16'} rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-400 border border-amber-500/20`}>
                    <Moon className={isWidget ? 'w-6 h-6' : 'w-8 h-8'} />
                  </div>
                  <div>
                    <h3 className={`${isWidget ? 'text-2xl' : 'text-4xl'} font-serif font-bold mb-1`}>
                      Nuit <span className="text-amber-400">{selectedNight}</span>
                    </h3>
                    <p className="text-white/40 text-[10px] uppercase tracking-widest font-semibold">
                      {selectedNight === 1 ? 'Première nuit' : `${selectedNight}ème nuit`}
                    </p>
                  </div>
                </div>

                <div className={`grid ${isWidget ? 'gap-4' : 'gap-8'}`}>
                  {/* Rakkas */}
                  <div className="group">
                    <div className="flex items-center gap-3 mb-2 text-amber-400/80">
                      <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 group-hover:bg-amber-400/20 group-hover:border-amber-400/30 transition-colors">
                        <Info className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[9px] uppercase tracking-[0.2em] font-bold">Rakkas</span>
                    </div>
                    <p className={`${isWidget ? 'text-base' : 'text-xl md:text-2xl'} font-medium pl-10 leading-relaxed`}>
                      {prayer?.rakkas}
                    </p>
                  </div>

                  {/* Recitations */}
                  <div className="group">
                    <div className="flex items-center gap-3 mb-2 text-amber-400/80">
                      <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 group-hover:bg-amber-400/20 group-hover:border-amber-400/30 transition-colors">
                        <BookOpen className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[9px] uppercase tracking-[0.2em] font-bold">Récitations</span>
                    </div>
                    <div className={isWidget ? 'pl-0' : ''}>
                      <RecitationDisplay text={prayer?.recitation || ''} />
                    </div>
                  </div>

                  {/* Rewards */}
                  <div className="group">
                    <div className="flex items-center gap-3 mb-2 text-amber-400/80">
                      <div className="p-1.5 rounded-lg bg-white/5 border border-white/10 group-hover:bg-amber-400/20 group-hover:border-amber-400/30 transition-colors">
                        <Trophy className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-[9px] uppercase tracking-[0.2em] font-bold">Mérites</span>
                    </div>
                    <p className={`${isWidget ? 'text-sm' : 'text-lg md:text-xl'} font-medium pl-10 leading-relaxed text-amber-100/90`}>
                      {prayer?.reward}
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative background elements in card */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="mt-12 flex items-center justify-between">
          <button 
            onClick={handlePrev}
            disabled={selectedNight === 1}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/40 hover:text-amber-400 disabled:opacity-20 transition-colors group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Précédent
          </button>
          
          <div className="flex gap-1">
            <div className={`w-1.5 h-1.5 rounded-full ${selectedNight <= 10 ? 'bg-amber-500' : 'bg-white/10'}`} />
            <div className={`w-1.5 h-1.5 rounded-full ${selectedNight > 10 && selectedNight <= 20 ? 'bg-amber-500' : 'bg-white/10'}`} />
            <div className={`w-1.5 h-1.5 rounded-full ${selectedNight > 20 ? 'bg-amber-500' : 'bg-white/10'}`} />
          </div>

          <button 
            onClick={handleNext}
            disabled={selectedNight === 30}
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white/40 hover:text-amber-400 disabled:opacity-20 transition-colors group"
          >
            Suivant
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Footer */}
        <footer className="mt-auto pt-12 text-center">
          <p className="text-[10px] text-white/20 uppercase tracking-[0.3em]">
            Qu'Allah accepte nos prières et notre jeûne
          </p>
        </footer>
      </main>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .mask-fade-edges {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}</style>
    </div>
  );
}
