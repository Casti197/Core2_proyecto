import React, { useState, useEffect } from 'react';
import { Lightbulb, Heart, Star, BrainCircuit, CheckCircle2, Trophy, ArrowRight, BookOpen } from 'lucide-react';
import { Card } from '../ui/Base';
import { CONSEJOS_DIARIOS, PILARES } from '../../constants';
import { IconMap } from '../icons';
import { motion, AnimatePresence } from 'motion/react';

interface HomeViewProps {
  setView: (view: string) => void;
  completedPillars?: string[];
}

export const HomeView = ({ setView, completedPillars = [] }: HomeViewProps) => {
  const [consejo, setConsejo] = useState("");
  const [onboardingStep, setOnboardingStep] = useState<number | null>(null);
  const progressPercent = Math.round((completedPillars.length / PILARES.length) * 100);

  useEffect(() => {
    const randomIdx = Math.floor(Math.random() * CONSEJOS_DIARIOS.length);
    setConsejo(CONSEJOS_DIARIOS[randomIdx]);

    const hasSeenOnboarding = localStorage.getItem('has_seen_onboarding');
    if (!hasSeenOnboarding) {
      setOnboardingStep(0);
    } else {
      setOnboardingStep(4);
    }
  }, []);

  const finishOnboarding = () => {
    localStorage.setItem('has_seen_onboarding', 'true');
    setOnboardingStep(4);
  };

  const nextStep = () => {
    if (onboardingStep !== null) {
      if (onboardingStep < 3) {
        setOnboardingStep(onboardingStep + 1);
      } else {
        finishOnboarding();
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <AnimatePresence mode="wait">
      {onboardingStep === 0 && (
        <motion.div
          key="welcome"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center p-8 text-center"
        >
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="bg-rose-500 p-4 rounded-[2.5rem] text-white shadow-2xl mb-8"
          >
            <Heart size={48} fill="currentColor" />
          </motion.div>
          <h1 className="text-4xl font-black text-slate-800 tracking-tighter uppercase mb-4">
            Persona & <br/><span className="text-rose-500">Afectividad</span>
          </h1>
          <p className="text-slate-500 text-lg mb-12 font-medium max-w-xs">
            Bienvenidos a su espacio de crecimiento emocional y antropológico.
          </p>
          <button 
            onClick={nextStep}
            className="bg-slate-900 text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-sm shadow-xl active:scale-95 transition-all"
          >
            Siguiente
          </button>
        </motion.div>
      )}

      {onboardingStep === 1 && (
        <motion.div
          key="step1"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center p-8 text-center"
        >
          <div className="bg-rose-100 p-6 rounded-full text-rose-500 mb-8">
            <Star size={64} fill="currentColor" />
          </div>
          <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tighter mb-4">
            Academia de Amor
          </h2>
          <p className="text-slate-500 text-lg mb-12 font-medium max-w-xs">
            Explora 5 pilares fundamentales de la relación a través de retos y niveles de profundidad.
          </p>
          <button 
            onClick={nextStep}
            className="bg-rose-500 text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-sm shadow-xl active:scale-95 transition-all"
          >
            Continuar
          </button>
        </motion.div>
      )}

      {onboardingStep === 2 && (
        <motion.div
          key="step2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center p-8 text-center"
        >
          <div className="bg-blue-100 p-6 rounded-full text-blue-500 mb-8">
            <BrainCircuit size={64} />
          </div>
          <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tighter mb-4">
            Mentor IA
          </h2>
          <p className="text-slate-500 text-lg mb-12 font-medium max-w-xs">
            Resuelve dudas complejas sobre afectividad y antropología con nuestro asistente inteligente.
          </p>
          <button 
            onClick={nextStep}
            className="bg-blue-600 text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-sm shadow-xl active:scale-95 transition-all"
          >
            Entendido
          </button>
        </motion.div>
      )}

      {onboardingStep === 3 && (
        <motion.div
          key="step3"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center p-8 text-center"
        >
          <div className="bg-slate-100 p-6 rounded-full text-slate-800 mb-8">
            <BookOpen size={64} />
          </div>
          <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tighter mb-4">
            Biblioteca Viva
          </h2>
          <p className="text-slate-500 text-lg mb-12 font-medium max-w-xs">
            Lee reflexiones profundas y comparte tus pensamientos con la comunidad en nuestro blog.
          </p>
          <button 
            onClick={finishOnboarding}
            className="bg-slate-900 text-white px-10 py-5 rounded-full font-black uppercase tracking-widest text-sm shadow-xl active:scale-95 transition-all"
          >
            ¡Empezar ahora!
          </button>
        </motion.div>
      )}

      {onboardingStep === 4 && (
        <motion.div 
          key="dashboard"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6 pb-24"
        >
      <header className="pt-6 px-2 flex justify-between items-start">
        <motion.div variants={itemVariants}>
          <h1 className="text-3xl font-black text-slate-800 tracking-tighter">
            HOLA, <span className="text-rose-500">PAREJA</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">Acompañamiento Afectivo</p>
        </motion.div>
        <motion.div 
          variants={itemVariants}
          className="bg-white p-2 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-2"
        >
          <Trophy size={16} className="text-amber-500" />
          <span className="text-xs font-black text-slate-700">{progressPercent}%</span>
        </motion.div>
      </header>

      {/* Hero Card - Quote of the Day */}
      <motion.div variants={itemVariants}>
        <Card className="bg-gradient-to-br from-rose-500 to-rose-600 text-white border-none overflow-hidden relative p-8 shadow-rose-200 shadow-xl">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4 opacity-80">
              <Lightbulb size={18} className="text-amber-200" />
              <span className="font-black tracking-widest text-[10px] uppercase">Reflexión Diaria</span>
            </div>
            <p className="text-xl font-bold leading-tight italic font-serif">"{consejo}"</p>
            
            <div className="mt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest bg-black/10 w-fit px-3 py-1 rounded-full">
              Pausar & Conectar
            </div>
          </div>
          <Heart className="absolute -bottom-6 -right-6 text-white/10 w-40 h-40" />
        </Card>
      </motion.div>

      {/* Progress Bar */}
      <motion.div variants={itemVariants} className="px-2">
        <div className="flex justify-between items-end mb-2">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tu camino juntos</span>
          <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest">
            {completedPillars.length} de {PILARES.length} pilares
          </span>
        </div>
        <div className="h-3 bg-slate-200 rounded-full overflow-hidden border border-slate-100">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-full bg-rose-500 rounded-full"
          />
        </div>
      </motion.div>

      {/* Main Actions */}
      <div className="grid grid-cols-2 gap-4 px-1">
        <motion.button 
          variants={itemVariants}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setView('pillars')} 
          className="flex flex-col items-start p-5 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden"
        >
          <div className="w-10 h-10 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Star size={20} fill="currentColor" />
          </div>
          <span className="font-black text-slate-800 text-sm uppercase tracking-tight">Academia</span>
          <span className="text-[10px] text-slate-400 font-bold uppercase mt-1">Niveles de Amor</span>
          <ArrowRight size={14} className="absolute bottom-5 right-5 text-slate-200 group-hover:text-rose-500 group-hover:translate-x-1 transition-all" />
        </motion.button>

        <motion.button 
          variants={itemVariants}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setView('chat')} 
          className="flex flex-col items-start p-5 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all group relative overflow-hidden"
        >
          <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <BrainCircuit size={20} />
          </div>
          <span className="font-black text-slate-800 text-sm uppercase tracking-tight">Mentor IA</span>
          <span className="text-[10px] text-slate-400 font-bold uppercase mt-1">Dudas & Antropología</span>
          <ArrowRight size={14} className="absolute bottom-5 right-5 text-slate-200 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
        </motion.button>
      </div>



      {/* Blog Teaser */}
      <motion.div variants={itemVariants} className="px-1">
        <Card 
          onClick={() => setView('blog')}
          className="bg-slate-900 text-white border-none p-6 rounded-3xl cursor-pointer hover:bg-slate-800 transition-colors flex justify-between items-center group"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BookOpen size={14} className="text-rose-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nuevas lecturas</span>
            </div>
            <h3 className="text-lg font-bold tracking-tight">Biblioteca Conceptual</h3>
            <p className="text-xs text-slate-400 mt-1">Aprende sobre lenguaje del amor y más</p>
          </div>
          <div className="bg-white/10 p-3 rounded-2xl group-hover:bg-rose-500 transition-colors">
            <ArrowRight size={20} />
          </div>
        </Card>
      </motion.div>
      </motion.div>
    )}
    </AnimatePresence>
  );
};
