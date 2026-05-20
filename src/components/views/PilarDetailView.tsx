import React, { useState, useEffect } from 'react';
import { ChevronLeft, Trophy, BookOpen, ArrowUp, ArrowDown, Check, X, Sparkles, AlertCircle, HelpCircle } from 'lucide-react';
import { Button, Card, Textarea } from '../ui/Base';
import { Pillar, InteractiveChallenge } from '../../types';

interface PilarDetailViewProps {
  pilar: Pillar;
  onBack: () => void;
  onComplete?: () => void;
}

export const PilarDetailView = ({ pilar, onBack, onComplete }: PilarDetailViewProps) => {
  const [level, setLevel] = useState(1);
  const [completed, setCompleted] = useState(false);
  const [responseText, setResponseText] = useState("");
  const [responses, setResponses] = useState<Record<number, string>>({});

  // Interactive challenges state
  const [orderedItems, setOrderedItems] = useState<string[]>([]);
  const [selectedGapOption, setSelectedGapOption] = useState<string>("");
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");

  // Get current active challenge
  const challengeObj = pilar.challenges[level - 1];
  const isInteractiveObj = challengeObj && typeof challengeObj !== 'string';
  const challenge: InteractiveChallenge = isInteractiveObj
    ? (challengeObj as InteractiveChallenge)
    : { prompt: challengeObj as string, type: 'open' };

  // Sync state whenever level changes
  useEffect(() => {
    setSelectedGapOption("");
    setSelectedOptionIndex(null);
    setIsCorrect(false);
    setShowFeedback(false);
    setFeedbackMessage("");
    setResponseText("");

    if (challenge.type === 'order-principles' && challenge.items) {
      // Scramble sequence deterministically as simple starting point
      const itemsCopy = [...challenge.items];
      if (itemsCopy.length >= 2) {
        // Swap first and last item to give them an unsorted start
        const temp = itemsCopy[0];
        itemsCopy[0] = itemsCopy[itemsCopy.length - 1];
        itemsCopy[itemsCopy.length - 1] = temp;
      }
      setOrderedItems(itemsCopy);
    }
  }, [level, pilar.id]);

  const handleSelectGapOption = (opt: string) => {
    setSelectedGapOption(opt);
    setShowFeedback(true);
    if (opt === challenge.gapAnswer) {
      setIsCorrect(true);
      setFeedbackMessage("¡Correcto! Excelente comprensión de este principio.");
    } else {
      setIsCorrect(false);
      setFeedbackMessage("No es el término idóneo. ¡Sigue reflexionando e inténtalo de nuevo!");
    }
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const newItems = [...orderedItems];
    const temp = newItems[index];
    newItems[index] = newItems[index - 1];
    newItems[index - 1] = temp;
    setOrderedItems(newItems);
    // Hide feedback when editing after error to encourage fresh validation
    if (!isCorrect) setShowFeedback(false);
  };

  const handleMoveDown = (index: number) => {
    if (index === orderedItems.length - 1) return;
    const newItems = [...orderedItems];
    const temp = newItems[index];
    newItems[index] = newItems[index + 1];
    newItems[index + 1] = temp;
    setOrderedItems(newItems);
    if (!isCorrect) setShowFeedback(false);
  };

  const handleCheckOrder = () => {
    setShowFeedback(true);
    const matchesAll = orderedItems.every((val, i) => val === challenge.correctOrder?.[i]);
    if (matchesAll) {
      setIsCorrect(true);
      setFeedbackMessage("¡Fabuloso! El orden lógico es totalmente correcto.");
    } else {
      setIsCorrect(false);
      setFeedbackMessage("La secuencia aún no sigue el orden natural y constructivo de este principio. ¡Ajústala!");
    }
  };

  const handleSelectChoice = (index: number) => {
    setSelectedOptionIndex(index);
    setShowFeedback(true);
    if (index === challenge.correctOptionIndex) {
      setIsCorrect(true);
      setFeedbackMessage("¡Respuesta perfecta! Este comportamiento promueve el amor conyugal maduro.");
    } else {
      setIsCorrect(false);
      setFeedbackMessage("Esa decisión podría crear monólogos o dependencias emocionales regresivas. ¡Intenta de nuevo!");
    }
  };

  const handleNextLevel = () => {
    let finalAnswer = "";

    if (challenge.type === 'open') {
      if (!responseText.trim()) return;
      finalAnswer = responseText.trim();
    } else if (challenge.type === 'fill-gap') {
      if (!isCorrect) return;
      const parts = challenge.sentenceTemplate?.split('[blank]') || [];
      finalAnswer = `[Completado] ${parts[0]}"${selectedGapOption}"${parts[1]}`;
    } else if (challenge.type === 'order-principles') {
      if (!isCorrect) return;
      finalAnswer = `[Secuencia Ordenada]\n` + orderedItems.map((it, idx) => `${idx + 1}. ${it}`).join('\n');
    } else if (challenge.type === 'multi-choice') {
      if (!isCorrect || selectedOptionIndex === null) return;
      finalAnswer = `[Seleccionado] ${challenge.options?.[selectedOptionIndex]}`;
    }

    const updatedResponses = { ...responses, [level]: finalAnswer };
    setResponses(updatedResponses);

    if (level < pilar.levels) {
      setLevel(level + 1);
    } else {
      setCompleted(true);
      if (onComplete) onComplete();
    }
  };

  const isNextButtonDisabled = () => {
    if (challenge.type === 'open') {
      return !responseText.trim();
    }
    return !isCorrect;
  };

  if (completed) return (
    <div className="flex flex-col items-center justify-center p-6 space-y-6 animate-in zoom-in duration-500 pb-24">
      <div className="bg-amber-100 p-8 rounded-full border-4 border-amber-200">
        <Trophy size={80} className="text-amber-500 animate-bounce" />
      </div>
      <div className="space-y-2 text-center">
        <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tighter">¡Pilar Completado!</h2>
        <p className="text-slate-500">Has demostrado autoconocimiento y sabiduría en {pilar.name}.</p>
      </div>

      <Card className="w-full max-w-sm border-amber-100 bg-amber-50/30 p-6 space-y-4">
        <div className="flex items-center gap-2 text-amber-600 font-bold text-xs uppercase tracking-wider border-b border-amber-100 pb-2">
          <BookOpen size={16} />
          <span>Tus reflexiones guardadas</span>
        </div>
        <div className="space-y-3 max-h-[250px] overflow-y-auto pr-1">
          {pilar.challenges.map((chal, idx) => {
            const isObj = chal && typeof chal !== 'string';
            const promptStr = isObj ? (chal as InteractiveChallenge).prompt : (chal as string);
            return (
              <div key={idx} className="bg-white p-3 rounded-xl border border-amber-100 text-left text-xs space-y-1 animate-in fade-in duration-300">
                <span className="font-black text-[9px] text-amber-500 uppercase">Nivel {idx + 1}</span>
                <p className="font-medium text-slate-500 italic leading-snug">"{promptStr}"</p>
                <div className="text-slate-705 font-bold pt-1 border-t border-slate-50 leading-relaxed whitespace-pre-line">
                  {responses[idx + 1] || "Sin respuesta escrita."}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <Button onClick={onBack} className="w-full py-4 text-lg" id="celebration-back-button">Volver al Mapa</Button>
    </div>
  );

  return (
    <div className="space-y-6 pb-24 animate-in slide-in-from-right-8 duration-500">
      <div className="flex items-center gap-4 pt-4">
        <button 
          onClick={onBack} 
          className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          id="detail-back-button"
        >
          <ChevronLeft size={24} />
        </button>
        <span className="text-xs font-black uppercase tracking-widest text-slate-400">Pilar: {pilar.name}</span>
      </div>

      <div className="px-2">
        <h2 className="text-2xl font-bold text-slate-800">{pilar.name}</h2>
        <p className="text-slate-500 text-sm mt-1">{pilar.description}</p>
      </div>

      <Card className="min-h-[420px] flex flex-col justify-between border-rose-100 shadow-lg p-5 sm:p-7 rounded-2xl">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <span className="bg-rose-100 text-rose-650 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">Nivel {level} de {pilar.levels}</span>
            <div className="flex gap-1 text-amber-400">
              {Array.from({ length: pilar.levels }).map((_, i) => (
                <div key={i} className={`w-3.5 h-3.5 rounded-full border-2 ${level > i ? 'bg-amber-400 border-amber-500' : 'border-amber-200'}`} />
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-1.5 text-[10px] font-black text-rose-500 uppercase tracking-widest">
              <HelpCircle size={14} /> Reto interactivo
            </div>
            <p className="text-slate-800 text-sm sm:text-base font-extrabold leading-snug">
              {challenge.prompt}
            </p>
          </div>

          {/* RENDER BY CHALLENGE TYPE */}
          <div className="space-y-4">
            {challenge.type === 'open' && (
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest pl-1">Tu respuesta escrita</label>
                <Textarea
                  placeholder="Escribe tu reflexión, aprendizaje o compromiso aquí..."
                  value={responseText}
                  onChange={(e) => setResponseText(e.target.value)}
                  className="min-h-[120px] focus:border-rose-300 text-slate-700 font-medium leading-relaxed rounded-xl text-xs sm:text-sm"
                />
              </div>
            )}

            {challenge.type === 'fill-gap' && (
              <div className="space-y-4">
                <div className="text-slate-700 text-xs sm:text-sm leading-relaxed p-4 bg-slate-50 border border-slate-100 rounded-xl font-medium">
                  {(() => {
                    const parts = challenge.sentenceTemplate?.split('[blank]') || [];
                    return (
                      <>
                        {parts[0]}
                        <span className={`inline-block border-b-2 px-2.5 mx-1 font-black ${selectedGapOption ? 'text-rose-600 border-rose-400' : 'text-slate-400 border-slate-300'}`}>
                          {selectedGapOption || '________'}
                        </span>
                        {parts[1]}
                      </>
                    );
                  })()}
                </div>

                <div className="space-y-1.5">
                  <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest pl-1">Selecciona el principio correcto:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {challenge.gapOptions?.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleSelectGapOption(opt)}
                        className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all text-center ${
                          selectedGapOption === opt
                            ? isCorrect 
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-700 shadow-sm'
                              : 'bg-rose-50 border-rose-300 text-rose-700 shadow-sm'
                            : 'bg-white border-slate-100 hover:bg-slate-50/50 text-slate-650 hover:border-slate-200'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {challenge.type === 'order-principles' && (
              <div className="space-y-3">
                <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest pl-1">Organiza el orden correcto usando los botones:</p>
                <div className="space-y-2">
                  {orderedItems.map((item, index) => (
                    <div 
                      key={item} 
                      className="flex items-center gap-2 bg-white px-3 py-2.5 rounded-xl border border-slate-100 shadow-sm transition-all"
                    >
                      <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center font-bold text-[10px] flex-shrink-0">
                        {index + 1}
                      </span>
                      <p className="text-slate-700 text-xs font-semibold leading-relaxed flex-1">
                        {item}
                      </p>
                      <div className="flex flex-col gap-0.5 flex-shrink-0">
                        <button 
                          disabled={index === 0 || isCorrect}
                          onClick={() => handleMoveUp(index)}
                          className="p-1 hover:bg-slate-100 rounded text-slate-400 disabled:opacity-20 hover:text-slate-700"
                          title="Subir"
                        >
                          <ArrowUp size={13} />
                        </button>
                        <button 
                          disabled={index === orderedItems.length - 1 || isCorrect}
                          onClick={() => handleMoveDown(index)}
                          className="p-1 hover:bg-slate-100 rounded text-slate-400 disabled:opacity-20 hover:text-slate-700"
                          title="Bajar"
                        >
                          <ArrowDown size={13} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <Button 
                  onClick={handleCheckOrder}
                  variant="outline"
                  disabled={isCorrect}
                  className="w-full text-[10px] font-black uppercase tracking-wider py-2 border-slate-200 hover:border-rose-200 hover:bg-rose-50/10 mt-1"
                >
                  Verificar Secuencia
                </Button>
              </div>
            )}

            {challenge.type === 'multi-choice' && (
              <div className="space-y-2.5">
                <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest pl-1">Elige una de las alternativas:</p>
                <div className="space-y-2">
                  {challenge.options?.map((opt, oIdx) => {
                    const isSelected = selectedOptionIndex === oIdx;
                    const isThisCorrect = oIdx === challenge.correctOptionIndex;
                    return (
                      <button
                        key={oIdx}
                        onClick={() => handleSelectChoice(oIdx)}
                        className={`w-full text-left p-2.5 sm:p-3 rounded-xl border transition-all flex items-start gap-2.5 ${
                          isSelected
                            ? isThisCorrect
                              ? 'bg-emerald-50/50 border-emerald-300 text-emerald-900 shadow-sm font-semibold'
                              : 'bg-rose-50/30 border-rose-300 text-rose-900 shadow-sm font-semibold'
                            : 'bg-white border-slate-100 hover:bg-slate-50/30 hover:border-slate-200 text-slate-650'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5 ${
                          isSelected
                            ? isThisCorrect
                              ? 'bg-emerald-500 border-emerald-500 text-white'
                              : 'bg-rose-500 border-rose-500 text-white'
                            : 'border-slate-300 bg-white'
                        }`}>
                          {isSelected ? (
                            isThisCorrect ? <Check size={11} strokeWidth={3} /> : <X size={11} strokeWidth={3} />
                          ) : null}
                        </div>
                        <span className="text-xs font-semibold leading-relaxed">
                          {opt}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* FEEDBACK MASSAGE */}
            {showFeedback && (
              <div className={`p-3 rounded-xl border flex items-start gap-2 animate-in slide-in-from-top-2 duration-300 font-bold text-[11px] leading-snug ${
                isCorrect 
                  ? 'bg-emerald-50 border-emerald-100 text-emerald-800' 
                  : 'bg-rose-50 border-rose-100 text-rose-800'
              }`}>
                {isCorrect ? (
                  <Sparkles size={14} className="text-emerald-500 animate-pulse flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle size={14} className="text-rose-500 flex-shrink-0 mt-0.5" />
                )}
                <p className="flex-1">{feedbackMessage}</p>
              </div>
            )}
          </div>
        </div>

        <Button 
          onClick={handleNextLevel} 
          disabled={isNextButtonDisabled()}
          className="w-full py-3.5 text-xs sm:text-sm font-black uppercase tracking-wider mt-6 bg-rose-500 text-white hover:bg-rose-600 disabled:opacity-40 rounded-xl shadow-md cursor-pointer"
          id="next-level-button"
        >
          {level === pilar.levels ? 'Responder y Completar Pilar' : 'Responder e Ir al Nivel Siguiente'}
        </Button>
      </Card>

      <div className="px-2 pt-4">
         <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-rose-500 h-full transition-all duration-500 ease-out" 
              style={{ width: `${(level / pilar.levels) * 100}%` }}
            />
         </div>
      </div>
    </div>
  );
};
