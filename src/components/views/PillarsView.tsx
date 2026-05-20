import React from 'react';
import { PILARES } from '../../constants';
import { IconMap } from '../icons';
import { Pillar } from '../../types';
import { CheckCircle2, Lock } from 'lucide-react';

interface PillarsViewProps {
  onSelectPilar: (pilar: Pillar) => void;
  completedPillars?: string[];
}

export const PillarsView = ({ onSelectPilar, completedPillars = [] }: PillarsViewProps) => (
  <div className="space-y-6 pb-24 animate-in fade-in slide-in-from-right-4 duration-500">
    <header className="pt-4 px-2">
      <h2 className="text-2xl font-bold text-slate-800">Academia de Amor</h2>
      <p className="text-slate-500 text-sm">Fortalece tu relación nivel a nivel.</p>
    </header>
    <div className="flex flex-col gap-16 py-12 relative z-0 max-w-lg mx-auto min-h-[600px] overflow-visible">
      
      {/* Curved Serpentine connecting SVG line in background with dynamic theme gradient */}
      <svg 
        className="absolute inset-x-0 top-16 bottom-16 w-full h-[calc(100%-8rem)] pointer-events-none z-0 overflow-visible" 
        fill="none" 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="tree-path-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="33%" stopColor="#f43f5e" />
            <stop offset="66%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#f43f5e" floodOpacity="0.15" />
          </filter>
        </defs>
        
        {/* Shadow glow path */}
        <path 
          d="M 25,5 Q 75,20 75,35 T 30,65 T 70,95" 
          stroke="rgba(244, 63, 94, 0.08)" 
          strokeWidth="12" 
          strokeLinecap="round" 
          filter="url(#glow)"
        />
        
        {/* Primary progressive dashed line */}
        <path 
          d="M 25,5 Q 75,20 75,35 T 30,65 T 70,95" 
          stroke="url(#tree-path-grad)" 
          strokeWidth="4" 
          strokeDasharray="6 6"
          strokeLinecap="round"
        />
      </svg>
      
      {PILARES.map((p, idx) => {
        const Icon = IconMap[p.icon] || IconMap.Heart;
        const isCompleted = completedPillars.includes(p.id);
        const isUnlocked = idx === 0 || completedPillars.includes(PILARES[idx - 1].id);

        // Map alternate flex justify rules to layout nodes zig-zagging
        const justifyClasses = [
          'justify-start pl-[12%] sm:pl-[20%]', // Node 0: Left
          'justify-end pr-[12%] sm:pr-[20%]',   // Node 1: Right
          'justify-start pl-[16%] sm:pl-[24%]', // Node 2: Left 2
          'justify-end pr-[16%] sm:pr-[24%]',   // Node 3: Right 2
        ];

        const rowClasses = justifyClasses[idx % justifyClasses.length];

        return (
          <div key={p.id} className={`flex w-full items-center ${rowClasses} relative overflow-visible`}>
            <button 
              onClick={() => isUnlocked && onSelectPilar(p)} 
              disabled={!isUnlocked}
              className={`group relative z-10 flex flex-col items-center focus:outline-none ${!isUnlocked ? 'cursor-not-allowed' : ''}`}
              id={`pilar-${p.id}`}
            >
              <div className={`
                w-24 h-24 rounded-full border-b-[8px] border-black/15 flex items-center justify-center text-white shadow-xl transition-all duration-300 relative
                ${
                  isCompleted 
                    ? 'bg-gradient-to-tr from-amber-500 to-yellow-300 ring-4 ring-amber-400/20 scale-105 shadow-amber-500/10' 
                    : isUnlocked 
                    ? `${p.color} ring-4 ring-slate-100 group-hover:scale-110 group-active:scale-95 group-active:translate-y-1 shadow-md` 
                    : 'bg-slate-200 border-slate-300 text-slate-400'
                }
              `}>
                
                {isUnlocked ? (
                  <Icon size={36} className={`${isCompleted ? 'animate-pulse text-amber-50' : 'text-white'}`} />
                ) : (
                  <Lock size={30} className="text-slate-400/80 animate-in fade-in" strokeWidth={2.5} />
                )}

                {isCompleted && (
                  <div className="absolute -top-1 -right-1 bg-white rounded-full p-1.5 shadow-md border border-amber-100 animate-bounce">
                    <CheckCircle2 size={22} className="text-amber-500 fill-white" />
                  </div>
                )}
                
                {/* Visual ripple pulse for active/current unlocked level */}
                {isUnlocked && !isCompleted && (
                  <div className="absolute inset-0 rounded-full bg-current opacity-10 animate-ping -z-10 pointer-events-none" />
                )}
              </div>

              <div className="mt-4 text-center max-w-[140px] px-2 bg-slate-50/80 backdrop-blur-[2px] rounded-2xl py-1.5 border border-slate-100 shadow-sm">
                <h3 className={`font-black uppercase tracking-tight text-xs ${
                  isCompleted 
                    ? 'text-amber-700 font-extrabold' 
                    : isUnlocked 
                    ? 'text-slate-800' 
                    : 'text-slate-450'
                }`}>
                  {p.name}
                </h3>
                
                <div className="mt-1">
                  {isCompleted ? (
                    <span className="text-[9px] font-black text-amber-600 tracking-wider uppercase">Completo</span>
                  ) : isUnlocked ? (
                    <span className="text-[9px] font-bold text-emerald-600 tracking-wider uppercase">Disponible</span>
                  ) : (
                    <span className="text-[9px] font-bold text-slate-450 tracking-wider uppercase lowercase">Bloqueado</span>
                  )}
                </div>

                <div className="mt-1 flex gap-1 justify-center">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-1 h-1 rounded-full ${
                        isCompleted 
                          ? 'bg-amber-400' 
                          : isUnlocked 
                          ? 'bg-slate-400' 
                          : 'bg-slate-300'
                      }`} 
                    />
                  ))}
                </div>
              </div>
            </button>
          </div>
        );
      })}
    </div>
  </div>
);
