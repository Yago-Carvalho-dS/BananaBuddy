import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { 
  Apple, 
  Chrome, 
  Lock, 
  Plus, 
  Flame, 
  Users, 
  Trophy, 
  Dumbbell, 
  Bike, 
  Zap, 
  Target, 
  Heart,
  ChevronRight,
  Search,
  Check,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

// --- Types ---
type Screen = "splash" | "login" | "health" | "onboarding" | "dashboard" | "customization" | "bananeira-selection" | "bananeira-map" | "achievements";

type Sport = { id: string, name: string, icon: string, target: number, unit: string, rewardSkin: string };

const availableSports: Sport[] = [
  { id: "judo", name: "Judô/Jiu-Jitsu", icon: "🥋", target: 20, unit: "aulas", rewardSkin: "judo" },
  { id: "run", name: "Corrida", icon: "🏃", target: 50, unit: "km", rewardSkin: "run" },
  { id: "musculacao", name: "Musculação", icon: "🏋️", target: 20, unit: "dias", rewardSkin: "boxe" },
  { id: "yoga", name: "Yoga", icon: "🧘", target: 5, unit: "sessões", rewardSkin: "yoga" },
];

// --- Components ---

const BananaIcon = ({ className, mood = "happy", size = "md", skin = "base" }: { className?: string, mood?: "happy" | "on-fire" | "dead" | "zen", size?: "sm" | "md" | "lg", skin?: string }) => {
  const [frame, setFrame] = useState(1);

  useEffect(() => {
    if (skin === "base") return;
    const intervalTime = mood === "dead" ? 300 : mood === "on-fire" ? 100 : 150;
    const interval = setInterval(() => {
      setFrame((prev) => (prev % 4) + 1);
    }, intervalTime);
    return () => clearInterval(interval);
  }, [skin, mood]);

  const sizes = {
    sm: "w-12 h-12 text-2xl",
    md: "w-32 h-32 text-5xl",
    lg: "w-48 h-48 text-7xl"
  };

  const imgSrc = skin === "base" ? "/banana.png" : `/banana_${skin}_${frame}.png`;

  return (
    <motion.div 
      initial={{ scale: 0.8, rotate: -5 }}
      animate={{ 
        scale: 1, 
        rotate: [ -5, 5, -5 ],
        y: [ 0, -10, 0 ]
      }}
      transition={{ 
        rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
      }}
      className={`relative flex items-center justify-center drop-shadow-2xl ${sizes[size]} ${className}`}
    >
      <img src={imgSrc} alt="Banana Buddy" className="w-full h-full object-contain drop-shadow-xl scale-[1.15]" />
      
      {mood === "on-fire" && (
        <motion.div 
          animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="absolute -top-4 text-4xl"
        >
          🔥
        </motion.div>
      )}
    </motion.div>
  );
};

const SplashScreen = ({ onNext }: { onNext: () => void }) => {
  const skins = ["base", "ballet", "boxe", "cycle", "judo", "run", "soccer", "swim", "yoga"];
  const [skinIndex, setSkinIndex] = useState(0);

  useEffect(() => {
    const skinTimer = setInterval(() => {
      setSkinIndex((prev) => (prev + 1) % skins.length);
    }, 300);
    const nextTimer = setTimeout(onNext, 4000);
    return () => { clearInterval(skinTimer); clearTimeout(nextTimer); };
  }, [onNext]);

  return (
    <div className="relative h-full w-full flex flex-col items-center justify-center overflow-hidden bg-black">
      <div className="z-10 flex flex-col items-center gap-8">
        <div className="w-32 h-32">
          <BananaIcon skin={skins[skinIndex]} mood="happy" />
        </div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="font-display text-4xl font-extrabold tracking-tighter text-white text-center"
        >
          Banana Buddy
        </motion.h1>
      </div>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-16 flex flex-col items-center text-center px-8 w-full"
      >
        <p className="font-sans text-xs italic font-bold mb-3 text-white/90">
          "A saúde é um estado de espírito,<br />que se reflete no corpo."
        </p>
        <p className="font-sans text-[10px] uppercase tracking-widest text-white/50">
          Cuidar da saúde é um ato de amor próprio.
        </p>
      </motion.div>
    </div>
  );
};

const LoginScreen = ({ onNext }: { onNext: () => void }) => {
  return (
    <div className="relative h-full w-full flex flex-col px-8 py-16 bg-black overflow-hidden">
      <div className="flex flex-col items-center justify-center gap-3 mb-10 w-full mt-12">
        <span className="font-display font-black text-3xl tracking-tight text-white">Banana Buddy</span>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center text-center mt-8">
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-4xl font-extrabold leading-tight mb-4"
        >
          Bem-vindo à sua<br />nova rotina.
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-white/60 text-lg mb-12"
        >
          Transformando suor em diversão.
        </motion.p>

        <div className="flex flex-col gap-4 w-full">
          <Button onClick={onNext} className="h-14 rounded-3xl bg-white text-black hover:bg-white/90 font-bold flex items-center justify-center gap-3 w-full">
            <Apple className="w-5 h-5 fill-current" />
            Continuar com Apple
          </Button>
          <Button onClick={onNext} className="h-14 rounded-3xl bg-white text-black hover:bg-white/90 font-bold flex items-center justify-center gap-3 w-full">
            <Chrome className="w-5 h-5 text-blue-500" />
            Continuar com Google
          </Button>
        </div>
      </div>
      <p className="mt-auto text-center text-[10px] text-white/40 uppercase tracking-widest">
        Ao continuar, você concorda com nossos Termos e Privacidade.
      </p>
    </div>
  );
};

const HealthIntegrationScreen = ({ onNext }: { onNext: () => void }) => {
  return (
    <div className="relative h-full w-full flex flex-col px-8 py-16 bg-black overflow-hidden">
      <h2 className="font-display text-2xl font-bold text-center mb-8">Conecte sua Saúde</h2>
      <p className="text-white/60 text-center mb-12 px-4">
        Sincronize seus dados para que sua banana reflita seu esforço real em tempo real.
      </p>
      <div className="flex flex-col gap-6">
        <Card className="p-6 rounded-[24px] bg-[#111] border border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <Heart className="text-red-500 w-6 h-6 fill-current" />
            </div>
            <span className="font-bold text-white">Apple Health</span>
          </div>
          <Switch defaultChecked />
        </Card>
        <Card className="p-6 rounded-[24px] bg-[#111] border border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <Chrome className="text-blue-500 w-6 h-6" />
            </div>
            <span className="font-bold text-white">Google Fit</span>
          </div>
          <Switch />
        </Card>
      </div>
      <div className="mt-12 flex items-center justify-center gap-2 text-white/40">
        <Lock className="w-4 h-4" />
        <span className="text-xs">Sincronização de dados segura e criptografada.</span>
      </div>
      <Button onClick={onNext} className="mt-auto h-14 rounded-3xl bg-banana text-black hover:bg-banana-dark font-bold text-lg">
        Continuar
      </Button>
    </div>
  );
};

const OnboardingScreen = ({ onNext, buddyName, setBuddyName, practicedSports, toggleSport }: { 
  onNext: () => void, buddyName: string, setBuddyName: (n: string) => void, 
  practicedSports: Record<string, number>, toggleSport: (id: string) => void 
}) => {
  return (
    <div className="relative h-full w-full flex flex-col px-8 py-16 bg-black overflow-hidden">
      <div className="mb-8">
        <label className="block text-white/40 text-xs uppercase tracking-widest mb-3 ml-2">Dê um nome ao seu Buddy</label>
        <Input 
          value={buddyName}
          onChange={(e) => setBuddyName(e.target.value)}
          placeholder="Ex: Bananinha" 
          className="h-14 rounded-[24px] bg-white/5 border-white/10 text-white text-lg px-6 focus:ring-banana" 
        />
      </div>
      <div className="flex-1">
        <label className="block text-white/40 text-xs uppercase tracking-widest mb-4 ml-2">O que você pratica?</label>
        <p className="text-xs text-white/50 mb-6 ml-2">Escolha seus esportes para desbloquear missões exclusivas.</p>
        <div className="grid grid-cols-2 gap-4">
          {availableSports.map((m) => {
            const isSelected = practicedSports[m.id] !== undefined;
            return (
              <motion.div
                key={m.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => toggleSport(m.id)}
                className={`rounded-[24px] p-4 flex flex-col items-center justify-center gap-3 cursor-pointer transition-colors border ${isSelected ? "bg-banana/10 border-banana text-banana" : "bg-white/5 border-white/10 text-white hover:bg-white/10"}`}
              >
                <span className="text-3xl">{m.icon}</span>
                <span className="font-bold text-sm text-center">{m.name}</span>
                {isSelected && <Check className="w-4 h-4 absolute top-3 right-3 text-banana" />}
              </motion.div>
            )
          })}
        </div>
      </div>
      <Button 
        onClick={() => {
          if (!buddyName) setBuddyName("Bananinha");
          onNext();
        }} 
        className="mt-8 h-14 rounded-3xl bg-banana text-black hover:bg-banana-dark font-bold text-lg"
      >
        Começar Jornada
      </Button>
    </div>
  );
};

const DashboardScreen = ({ onCustomization, onBananeiras, onAchievements, buddyName, activeSkin, isOnFire, raios }: { 
  onCustomization: () => void, onBananeiras: () => void, onAchievements: () => void, 
  buddyName: string, activeSkin: string, isOnFire: boolean, raios: number 
}) => {
  return (
    <div className="relative h-full w-full flex flex-col bg-black overflow-hidden">
      <div className="relative z-10 flex-1 flex flex-col p-6 pt-12">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-white">{buddyName}</h1>
          <p className="text-xs text-banana uppercase tracking-widest font-bold">Nível 12 • Pro Fitness</p>
        </div>

        <div className="flex-1 flex items-center justify-center relative px-2 mb-6 cursor-pointer group" onClick={onCustomization}>
          <div className="relative border border-white/20 rounded-3xl w-full max-w-xs aspect-square flex items-center justify-center bg-[#0a0a0a]">
            {isOnFire && <div className="absolute inset-0 border-2 border-red-500 rounded-3xl animate-pulse" />}
            <div className="absolute w-40 h-40 bg-banana/5 rounded-full blur-2xl group-hover:bg-banana/10 transition-all duration-500" />
            <BananaIcon mood={isOnFire ? "on-fire" : "happy"} size="lg" skin={activeSkin} className="group-hover:scale-105 transition-transform" />
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-4 text-[10px] font-bold text-white/60 uppercase tracking-widest bg-black/60 px-3 py-1 rounded-full border border-white/10 group-hover:text-white transition-colors"
            >
              Customizar
            </motion.div>
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-auto">
          <Button onClick={onBananeiras} className="h-14 rounded-3xl bg-banana text-black hover:bg-banana-dark font-bold text-lg transition-transform active:scale-95 w-full flex items-center justify-center gap-2">
            <Users className="w-5 h-5" /> Minhas Bananeiras
          </Button>
          <Button onClick={onAchievements} className="h-14 rounded-3xl bg-white/10 text-white hover:bg-white/20 font-bold text-lg transition-transform active:scale-95 w-full flex items-center justify-center gap-2">
            <Trophy className="w-5 h-5" /> Conquistas e Metas
          </Button>
        </div>
      </div>
    </div>
  );
};

const AchievementsScreen = ({ onBack, practicedSports, toggleSport, updateProgress, isOnFire, setIsOnFire, raios }: { 
  onBack: () => void, practicedSports: Record<string, number>, toggleSport: (id: string, forceDelete?: boolean) => void, 
  updateProgress: (id: string, amt: number) => void, isOnFire: boolean, setIsOnFire: (val: boolean) => void, raios: number 
}) => {
  const [goalText, setGoalText] = useState("");
  const [deletingSport, setDeletingSport] = useState<string | null>(null);

  const handleGoalSubmit = () => {
    if (goalText.trim().length > 0) {
      setIsOnFire(true);
      setGoalText("");
    }
  };

  const handleRemoveClick = (sportId: string) => {
    const prog = practicedSports[sportId];
    if (prog > 0) {
      setDeletingSport(sportId); // Require confirmation
    } else {
      toggleSport(sportId, true); // Delete directly
    }
  };

  const handleConfirmDelete = (sportId: string) => {
    toggleSport(sportId, true);
    setDeletingSport(null);
  };

  return (
    <div className="relative h-full w-full flex flex-col bg-black overflow-hidden px-6 pt-12 pb-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-white" onClick={onBack}>
            <ChevronRight className="w-5 h-5 rotate-180" />
          </Button>
          <h2 className="font-display text-2xl font-bold">Conquistas</h2>
        </div>
        <div className="flex items-center gap-1 bg-banana/10 text-banana px-3 py-1 rounded-full font-bold">
          <Zap className="w-4 h-4" /> {raios}
        </div>
      </div>

      <ScrollArea className="flex-1 -mx-2 px-2">
        <div className="flex flex-col gap-6 pb-20">
          
          {/* Suas Missões (Esportes Praticados) */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-2 mb-3">Suas Missões Ativas</h3>
            <div className="flex flex-col gap-3">
              {Object.keys(practicedSports).length === 0 && (
                <p className="text-xs text-white/30 italic ml-2">Nenhum esporte ativo no momento.</p>
              )}
              {Object.entries(practicedSports).map(([id, prog]) => {
                const sport = availableSports.find(s => s.id === id);
                if (!sport) return null;
                const isComplete = prog >= sport.target;
                const isConfirming = deletingSport === id;
                return (
                  <div key={id} className="bg-[#111] border border-white/10 rounded-[20px] p-4 flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-2xl">{sport.icon}</div>
                      <div className="flex-1">
                        <div className="font-bold text-sm">{sport.name}</div>
                        <div className="text-[10px] text-banana uppercase tracking-widest mt-1">
                          {isComplete ? "Concluído" : `${prog} / ${sport.target} ${sport.unit}`}
                        </div>
                      </div>
                      {isComplete ? <Check className="text-green-400 w-5 h-5" /> : null}
                    </div>
                    
                    {!isComplete && (
                      <div className="flex items-center gap-2 mt-2">
                        <Button size="sm" onClick={() => updateProgress(id, 1)} className="flex-1 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-bold text-white flex items-center justify-center gap-1">
                          <Plus className="w-3 h-3"/> 1 Progresso <span className="text-banana ml-1 flex items-center"><Zap className="w-3 h-3"/> 20</span>
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={() => isConfirming ? handleConfirmDelete(id) : handleRemoveClick(id)} 
                          className={`flex-1 h-8 rounded-lg text-xs font-bold transition-colors ${isConfirming ? "bg-red-500/20 text-red-500 hover:bg-red-500/30" : "bg-white/5 hover:bg-white/10 text-white/60"}`}
                        >
                          {isConfirming ? "Confirmar Exclusão" : "Excluir"}
                        </Button>
                      </div>
                    )}
                    {isConfirming && <p className="text-[9px] text-red-400 text-center mt-1">Conquista em andamento! Você perderá os pontos se excluir.</p>}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Adicionar Esportes */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-2 mb-3">Mais Esportes</h3>
            <div className="flex gap-2 overflow-x-auto pb-2 -mx-2 px-2 snap-x">
              {availableSports.filter(s => practicedSports[s.id] === undefined).map(sport => (
                <div key={sport.id} className="min-w-[120px] bg-[#111] border border-white/10 rounded-[20px] p-4 flex flex-col items-center gap-2 snap-start">
                  <span className="text-2xl">{sport.icon}</span>
                  <span className="text-xs font-bold text-center h-8">{sport.name}</span>
                  <Button size="sm" onClick={() => toggleSport(sport.id)} className="w-full h-7 rounded-md bg-banana/10 hover:bg-banana/20 text-banana text-[10px] font-bold mt-auto">
                    Praticar
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Setar Metas */}
          <div className="mt-4 bg-gradient-to-br from-red-500/10 to-orange-500/5 border border-red-500/20 rounded-[24px] p-5">
            <h3 className="flex items-center gap-2 font-display font-bold text-lg text-white mb-2">
              <Flame className="w-5 h-5 text-red-500" /> Setar Meta Pessoal
            </h3>
            <p className="text-xs text-white/60 mb-4">
              Crie uma meta exclusiva para hoje. Ao iniciar, sua banana ficará com o status <strong className="text-red-400">On Fire</strong>!
            </p>
            <div className="flex gap-2">
              <Input 
                value={goalText}
                onChange={(e) => setGoalText(e.target.value)}
                placeholder="Ex: Beber 3L de água" 
                className="h-12 rounded-xl bg-black/50 border-white/10 text-sm focus:ring-red-500"
              />
              <Button onClick={handleGoalSubmit} disabled={isOnFire || goalText.trim() === ""} className="h-12 px-6 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold disabled:opacity-50">
                Iniciar
              </Button>
            </div>
            {isOnFire && <p className="text-[10px] text-red-400 mt-3 font-bold uppercase tracking-widest text-center">Modo On Fire Ativado 🔥</p>}
          </div>

        </div>
      </ScrollArea>
    </div>
  );
};

const CustomizationScreen = ({ 
  onBack, activeSkin, setActiveSkin, practicedSports, raios, setRaios, unlockedStoreSkins, setUnlockedStoreSkins 
}: { 
  onBack: () => void, activeSkin: string, setActiveSkin: (s: string) => void, practicedSports: Record<string, number>,
  raios: number, setRaios: (v: number | ((prev: number) => number)) => void,
  unlockedStoreSkins: string[], setUnlockedStoreSkins: (v: string[] | ((prev: string[]) => string[])) => void
}) => {
  const [tab, setTab] = useState<"loja" | "conquistas">("loja");

  const storeItems = [
    { id: "ballet", name: "Sapatilha", price: 500, icon: "🩰" },
    { id: "soccer", name: "Chuteira", price: 1200, icon: "⚽" },
    { id: "cycle", name: "Bike Pro", price: 300, icon: "🚴" },
    { id: "swim", name: "Touca", price: 800, icon: "🏊" },
  ];

  // Map achievement skins based on progress
  const achievementItems = [
    { id: "base", name: "Banana Padrão", requirement: "Desbloqueado", icon: "🍌", unlocked: true },
    ...availableSports.map(sport => {
      const prog = practicedSports[sport.id] || 0;
      const isUnlocked = prog >= sport.target;
      return {
        id: sport.rewardSkin,
        name: `Skin ${sport.name}`,
        requirement: `${sport.target} ${sport.unit}`,
        icon: sport.icon,
        unlocked: isUnlocked
      };
    })
  ];

  return (
    <div className="relative h-full w-full flex flex-col bg-black overflow-hidden px-6 pt-12 pb-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-white" onClick={onBack}>
            <ChevronRight className="w-5 h-5 rotate-180" />
          </Button>
          <h2 className="font-display text-2xl font-bold">Estilo</h2>
        </div>
        <div className="flex items-center gap-1 bg-banana/10 text-banana px-3 py-1 rounded-full font-bold">
          <Zap className="w-4 h-4" /> {raios}
        </div>
      </div>

      <div className="flex bg-white/5 rounded-full p-1 mb-6">
        <button onClick={() => setTab("loja")} className={`flex-1 rounded-full py-2 text-xs font-bold uppercase tracking-wider transition-colors ${tab === "loja" ? "bg-banana text-black" : "text-white/60 hover:text-white"}`}>Loja</button>
        <button onClick={() => setTab("conquistas")} className={`flex-1 rounded-full py-2 text-xs font-bold uppercase tracking-wider transition-colors ${tab === "conquistas" ? "bg-banana text-black" : "text-white/60 hover:text-white"}`}>Conquistas</button>
      </div>

      <ScrollArea className="flex-1 -mx-2 px-2">
        {tab === "loja" ? (
          <div className="grid grid-cols-2 gap-4 pb-10">
            {storeItems.map((item, i) => {
              const isUnlocked = unlockedStoreSkins.includes(item.id);
              const canBuy = raios >= item.price;
              
              const handleAction = () => {
                if (isUnlocked) {
                  setActiveSkin(item.id);
                } else if (canBuy) {
                  setRaios(r => r - item.price);
                  setUnlockedStoreSkins(prev => [...prev, item.id]);
                  setActiveSkin(item.id);
                }
              };

              return (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} key={i} className="bg-[#111] border border-white/10 rounded-[24px] p-4 flex flex-col items-center text-center gap-2">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-3xl mb-2">{item.icon}</div>
                  <span className="font-bold text-sm h-10 flex items-center">{item.name}</span>
                  <Button 
                    onClick={handleAction}
                    disabled={!isUnlocked && !canBuy}
                    className={`w-full rounded-xl mt-auto text-xs font-bold transition-colors ${
                      activeSkin === item.id ? "bg-banana text-black hover:bg-banana" : 
                      isUnlocked ? "bg-white/10 hover:bg-white/20 text-white" :
                      canBuy ? "bg-green-500/20 text-green-400 hover:bg-green-500/30" : 
                      "bg-white/5 text-white/30"
                    }`}
                  >
                    {activeSkin === item.id ? "Equipado" : 
                     isUnlocked ? "Usar" : 
                     <><Zap className="w-3 h-3 mr-1" /> {item.price}</>}
                  </Button>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col gap-4 pb-10">
            {achievementItems.map((item, i) => (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} key={i} className={`bg-[#111] border border-white/10 rounded-[24px] p-4 flex items-center gap-4 ${!item.unlocked ? "opacity-50 grayscale" : ""}`}>
                <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-2xl">{item.icon}</div>
                <div className="flex-1">
                  <div className="font-bold text-sm">{item.name}</div>
                  <div className="text-[10px] text-banana uppercase tracking-widest mt-1">{item.unlocked ? "Desbloqueado" : item.requirement}</div>
                </div>
                {item.unlocked ? (
                  <Button 
                    size="sm"
                    onClick={() => setActiveSkin(item.id)}
                    className={`h-8 rounded-lg text-[10px] font-bold px-3 transition-colors ${activeSkin === item.id ? "bg-banana text-black hover:bg-banana" : "bg-white/10 text-white hover:bg-white/20"}`}
                  >
                    {activeSkin === item.id ? "Equipado" : "Usar"}
                  </Button>
                ) : (
                  <Lock className="text-white/40 w-5 h-5" />
                )}
              </motion.div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

const BananeiraSelectionScreen = ({ onBack, onSelect }: { onBack: () => void, onSelect: (id: string) => void }) => {
  const groups = [
    { id: "1", name: "Clã dos Marombeiros", members: 42, activity: "Alta" },
    { id: "2", name: "Jiu-Jitsu Elite", members: 15, activity: "Média" },
    { id: "3", name: "Corredores da Orla", members: 89, activity: "Muito Alta" },
  ];

  return (
    <div className="relative h-full w-full flex flex-col bg-black overflow-hidden px-6 pt-12 pb-6">
      <div className="flex items-center mb-8 gap-4">
        <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-white" onClick={onBack}>
          <ChevronRight className="w-5 h-5 rotate-180" />
        </Button>
        <h2 className="font-display text-2xl font-bold">Bananeiras</h2>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
        <Input placeholder="Buscar ou código..." className="h-12 rounded-[20px] bg-[#111] border-white/10 text-white pl-12 focus:ring-banana" />
      </div>

      <ScrollArea className="flex-1 -mx-2 px-2">
        <div className="flex flex-col gap-4 pb-20">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-2">Suas Bananeiras</h3>
          {groups.map((g, i) => (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} key={g.id} onClick={() => onSelect(g.id)} className="bg-[#111] border border-white/10 rounded-[24px] p-5 cursor-pointer hover:border-banana/50 transition-colors group relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-banana/5 rounded-bl-full -z-10 group-hover:bg-banana/10 transition-colors" />
              <div className="flex justify-between items-start mb-2">
                <span className="font-bold text-lg">{g.name}</span>
                <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-banana group-hover:translate-x-1 transition-all" />
              </div>
              <div className="flex items-center gap-4 text-xs font-semibold text-white/60">
                <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {g.members}</span>
                <span className="flex items-center gap-1 text-green-400"><Zap className="w-3 h-3" /> {g.activity}</span>
              </div>
            </motion.div>
          ))}
          <Button className="mt-4 h-14 rounded-3xl bg-white/5 text-white border border-white/10 hover:bg-white/10 font-bold border-dashed w-full">
            <Plus className="w-5 h-5 mr-2" /> Criar Bananeira
          </Button>
        </div>
      </ScrollArea>
    </div>
  );
};

const BananeiraMapScreen = ({ onBack, buddyName, activeSkin }: { onBack: () => void, buddyName: string, activeSkin: string }) => {
  const [selectedBanana, setSelectedBanana] = useState<any>(null);

  const mapBananas = [
    { id: 1, name: buddyName, state: "Focado", mood: "happy", skin: activeSkin, x: 50, y: 50, duration: 25 },
    { id: 2, name: "Maria", state: "Amadurecendo", mood: "zen", skin: "yoga", x: 60, y: 40, duration: 30 },
    { id: 3, name: "Pedro", state: "Podre", mood: "dead", skin: "base", x: 80, y: 70, duration: 40 },
    { id: 4, name: "Ana", state: "On Fire", mood: "on-fire", skin: "boxe", x: 40, y: 60, duration: 20 },
    { id: 5, name: "Lucas", state: "Reluzente", mood: "happy", skin: "run", x: 30, y: 80, duration: 35 },
  ];

  return (
    <div className="relative h-full w-full flex flex-col bg-black overflow-hidden">
      <div className="absolute inset-0 z-0 bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,225,53,0.05)_0%,transparent_80%)]" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '30px 30px' }} />
      </div>

      <div className="relative z-20 px-6 pt-12 pb-4 bg-gradient-to-b from-black/80 to-transparent flex items-center justify-between">
        <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md text-white" onClick={onBack}>
          <ChevronRight className="w-5 h-5 rotate-180" />
        </Button>
        <div className="text-center">
          <div className="text-[10px] uppercase tracking-[2px] text-banana font-bold">Mapa Ativo</div>
          <div className="font-display font-bold text-white">Clã dos Marombeiros</div>
        </div>
        <div className="w-10" />
      </div>

      <div className="flex-1 relative z-10 w-full h-full">
        {mapBananas.map((b) => (
          <motion.div
            key={b.id}
            initial={{ left: `${b.x}%`, top: `${b.y}%` }}
            animate={{ 
              left: [`${b.x}%`, `${Math.max(10, (b.x + Math.random() * 40 - 20))}%`, `${b.x}%`],
              top: [`${b.y}%`, `${Math.max(10, (b.y + Math.random() * 40 - 20))}%`, `${b.y}%`]
            }}
            transition={{ duration: b.duration, repeat: Infinity, ease: "easeInOut" }}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
            onClick={() => setSelectedBanana(b)}
          >
            <div className="relative">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-bold uppercase whitespace-nowrap bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm opacity-50">
                {b.name}
              </div>
              <BananaIcon mood={b.mood as any} size="sm" skin={b.skin} className={`transition-all ${b.state === "Podre" ? "grayscale opacity-50 blur-[1px]" : "hover:scale-110"}`} />
            </div>
          </motion.div>
        ))}

        <AnimatePresence>
          {selectedBanana && (
            <motion.div initial={{ opacity: 0, y: 50, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.9 }} className="absolute bottom-6 left-6 right-6 z-30">
              <div className="bg-[#111] border border-white/10 rounded-[24px] p-5 shadow-2xl relative overflow-hidden">
                <Button size="icon" variant="ghost" className="absolute top-2 right-2 w-8 h-8 rounded-full text-white/40 hover:text-white z-10" onClick={() => setSelectedBanana(null)}>
                  ✕
                </Button>
                <div className="flex gap-4 items-center relative z-10">
                  <div className="w-16 h-16 flex items-center justify-center bg-white/5 rounded-2xl">
                    <BananaIcon mood={selectedBanana.mood} size="sm" skin={selectedBanana.skin} className={selectedBanana.state === "Podre" ? "grayscale opacity-50" : ""} />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-white">
                      {selectedBanana.name} {selectedBanana.id === 1 && "(Você)"}
                    </h3>
                    <div className="text-[10px] uppercase font-black tracking-widest text-banana mb-1">Estado: {selectedBanana.state}</div>
                    <div className="flex gap-2 mt-2">
                       <span className="text-xs bg-white/10 px-2 py-1 rounded-md text-white/80">Lvl 12</span>
                       <span className="text-xs bg-white/10 px-2 py-1 rounded-md text-white/80 flex items-center"><Flame className="w-3 h-3 mr-1 text-red-500" /> 5</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("splash");
  const [buddyName, setBuddyName] = useState("");
  const [activeSkin, setActiveSkin] = useState<string>("base");
  const [isOnFire, setIsOnFire] = useState(false);
  const [practicedSports, setPracticedSports] = useState<Record<string, number>>({});
  
  // Moedas e Loja
  const [raios, setRaios] = useState(0);
  const [unlockedStoreSkins, setUnlockedStoreSkins] = useState<string[]>([]);

  const toggleSport = (id: string, forceDelete: boolean = false) => {
    setPracticedSports(prev => {
      const next = { ...prev };
      if (next[id] !== undefined || forceDelete) {
        delete next[id];
      } else {
        next[id] = 0; // init progress
      }
      return next;
    });
  };

  const updateProgress = (id: string, amt: number) => {
    setPracticedSports(prev => {
      if (prev[id] === undefined) return prev;
      return { ...prev, [id]: prev[id] + amt };
    });
    setRaios(prev => prev + (20 * amt)); // 20 raios por progresso
  };

  return (
    <div className="min-h-screen w-full bg-black flex items-center justify-center p-4 md:p-10 overflow-hidden font-sans text-white">
      <div className="showcase-container grid grid-cols-1 lg:grid-cols-[280px_1fr_280px] gap-10 w-full max-w-6xl h-full max-h-[800px]">
        
        {/* Left Side Panel */}
        <div className="hidden lg:flex flex-col gap-6 side-panel">
          <div className="app-preview-card bg-[#111] border border-white/10 rounded-[24px] p-5 flex-1 flex flex-col justify-center items-center text-center cursor-pointer hover:border-banana/50 transition-colors" onClick={() => setCurrentScreen('splash')}>
            <div className="text-[10px] font-semibold uppercase tracking-[2px] text-banana mb-2">Início Rápido</div>
            <div className="text-4xl mb-4">🍌</div>
            <p className="text-xs text-white italic">"A saúde é um estado de espírito."</p>
          </div>
          
          <div className="app-preview-card bg-[#111] border border-white/10 rounded-[24px] p-5 flex-1 flex flex-col justify-center items-center text-center cursor-pointer hover:border-banana/50 transition-colors" onClick={() => setCurrentScreen('achievements')}>
            <div className="text-[10px] font-semibold uppercase tracking-[2px] text-banana mb-2">Conquistas & Metas</div>
            <div className="flex gap-2 mt-2 mb-4">
               <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-xl">🥋</div>
               <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-xl">🏃</div>
               <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-xl">🔥</div>
            </div>
            <p className="text-xs text-white/50">Cumpra missões e fique On Fire.</p>
          </div>
        </div>

        {/* Center Phone Mockup */}
        <div className="phone-mockup bg-black rounded-[40px] border-[8px] border-[#222] relative flex flex-col overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.5)] aspect-[9/19.5] max-h-[768px] mx-auto w-full max-w-[360px]">
          <div className="notch w-[120px] h-[30px] bg-[#222] absolute top-0 left-1/2 -translate-x-1/2 rounded-b-[15px] z-30" />
          
          <div className="flex-1 relative overflow-hidden bg-black">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentScreen}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="h-full w-full"
              >
                {currentScreen === "splash" && <SplashScreen onNext={() => setCurrentScreen("login")} />}
                {currentScreen === "login" && <LoginScreen onNext={() => setCurrentScreen("health")} />}
                {currentScreen === "health" && <HealthIntegrationScreen onNext={() => setCurrentScreen("onboarding")} />}
                {currentScreen === "onboarding" && <OnboardingScreen onNext={() => setCurrentScreen("dashboard")} buddyName={buddyName} setBuddyName={setBuddyName} practicedSports={practicedSports} toggleSport={toggleSport} />}
                {currentScreen === "dashboard" && <DashboardScreen onCustomization={() => setCurrentScreen("customization")} onBananeiras={() => setCurrentScreen("bananeira-selection")} onAchievements={() => setCurrentScreen("achievements")} buddyName={buddyName || "Bananinha"} activeSkin={activeSkin} isOnFire={isOnFire} raios={raios} />}
                {currentScreen === "customization" && <CustomizationScreen onBack={() => setCurrentScreen("dashboard")} activeSkin={activeSkin} setActiveSkin={setActiveSkin} practicedSports={practicedSports} raios={raios} setRaios={setRaios} unlockedStoreSkins={unlockedStoreSkins} setUnlockedStoreSkins={setUnlockedStoreSkins} />}
                {currentScreen === "bananeira-selection" && <BananeiraSelectionScreen onBack={() => setCurrentScreen("dashboard")} onSelect={(id) => setCurrentScreen("bananeira-map")} />}
                {currentScreen === "bananeira-map" && <BananeiraMapScreen onBack={() => setCurrentScreen("bananeira-selection")} buddyName={buddyName || "Bananinha"} activeSkin={activeSkin} />}
                {currentScreen === "achievements" && <AchievementsScreen onBack={() => setCurrentScreen("dashboard")} practicedSports={practicedSports} toggleSport={toggleSport} updateProgress={updateProgress} isOnFire={isOnFire} setIsOnFire={setIsOnFire} raios={raios} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Right Side Panel */}
        <div className="hidden lg:flex flex-col gap-6 side-panel">
          <div className="app-preview-card bg-[#111] border border-white/10 rounded-[24px] p-5 flex-1 flex flex-col justify-center items-center text-center cursor-pointer hover:border-banana/50 transition-colors" onClick={() => setCurrentScreen('bananeira-map')}>
            <div className="text-[10px] font-semibold uppercase tracking-[2px] text-banana mb-2">Mapa da Bananeira</div>
            <p className="text-xs text-white/50 mb-3">Veja o status do seu clã em tempo real.</p>
            <div className="relative w-full h-24 bg-black/40 rounded-xl overflow-hidden mt-2 border border-white/10">
              <div className="absolute left-4 top-4 text-2xl animate-pulse">🍌</div>
              <div className="absolute right-6 bottom-4 text-2xl grayscale">🍌</div>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl">🔥</div>
            </div>
          </div>
          
          <div className="app-preview-card bg-[#111] border border-white/10 rounded-[24px] p-5 flex-1 flex flex-col justify-center items-center text-center">
            <div className="text-[10px] font-semibold uppercase tracking-[2px] text-banana mb-2">Integração</div>
            <div className="flex gap-4 mb-4 mt-2">
               <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center"><Heart className="text-red-500 w-6 h-6 fill-current" /></div>
               <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center"><Chrome className="text-blue-500 w-6 h-6" /></div>
            </div>
            <p className="text-xs text-white/50">Conectado aos principais apps de saúde.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
