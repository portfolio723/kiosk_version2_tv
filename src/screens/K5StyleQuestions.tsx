import React, { useState } from 'react';
import { KioskHeader } from '../components/KioskHeader';
import { Language, Occasion, StylePreference } from '../types';
import { translations } from '../data/translations';
import { playTouchFeedback } from '../utils/audio';
import { Mic, MicOff, Check } from 'lucide-react';

interface K5StyleQuestionsProps {
  occasions: Occasion[];
  onToggleOccasion: (occ: Occasion) => void;
  stylePreference: StylePreference;
  onStyleChange: (s: StylePreference) => void;
  supportingCloth: boolean;
  onSupportingClothChange: (val: boolean) => void;
  lookDescription: string;
  onDescriptionChange: (desc: string) => void;
  onContinue: () => void;
  onBack: () => void;
  language: Language;
}

export const K5StyleQuestions: React.FC<K5StyleQuestionsProps> = ({
  occasions,
  onToggleOccasion,
  stylePreference,
  onStyleChange,
  supportingCloth,
  onSupportingClothChange,
  lookDescription,
  onDescriptionChange,
  onContinue,
  onBack,
  language,
}) => {
  const t = translations[language];
  const [isRecording, setIsRecording] = useState(false);

  const OCCASIONS: Occasion[] = ['Wedding', 'Festival', 'Office', 'Party', 'Casual'];
  const STYLES: StylePreference[] = ['Classic', 'Bold', 'Elegant', 'Playful', 'Royal'];

  const toggleOcc = (occ: Occasion) => {
    playTouchFeedback('select');
    onToggleOccasion(occ);
  };

  const selectStyle = (s: StylePreference) => {
    playTouchFeedback('select');
    onStyleChange(s);
  };

  const handleVoiceToggle = () => {
    playTouchFeedback('tap');
    if (!isRecording) {
      // Check for SpeechRecognition
      const win = window as any;
      const SpeechRecognition = win.SpeechRecognition || win.webkitSpeechRecognition;

      if (SpeechRecognition) {
        try {
          const recognition = new SpeechRecognition();
          recognition.lang = language === 'hi' ? 'hi-IN' : language === 'te' ? 'te-IN' : 'en-IN';
          recognition.continuous = false;
          recognition.interimResults = false;

          recognition.onstart = () => {
            setIsRecording(true);
          };
          recognition.onresult = (e: any) => {
            const transcript = e.results[0][0].transcript;
            onDescriptionChange((lookDescription ? `${lookDescription} ` : '') + transcript);
            setIsRecording(false);
            playTouchFeedback('success');
          };
          recognition.onerror = () => {
            setIsRecording(false);
          };
          recognition.onend = () => {
            setIsRecording(false);
          };
          recognition.start();
        } catch {
          simulateVoice();
        }
      } else {
        simulateVoice();
      }
    } else {
      setIsRecording(false);
    }
  };

  const simulateVoice = () => {
    setIsRecording(true);
    setTimeout(() => {
      const phrases = [
        'A regal wedding look with antique gold zari embroidery and deep maroon tones.',
        'Modern cocktail party drape with fluid drape and subtle metallic highlights.',
        'Traditional festive look with vibrant contrast blouse.',
      ];
      const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
      onDescriptionChange((lookDescription ? `${lookDescription} ` : '') + randomPhrase);
      setIsRecording(false);
      playTouchFeedback('success');
    }, 2800);
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between select-none">
      <KioskHeader
        onBack={onBack}
        showBack={true}
        currentStep={3}
        totalSteps={4}
        stepLabel={t.stepOf(3, 4)}
      />

      <div className="flex-1 min-h-0 overflow-y-auto w-full max-w-[580px] mx-auto px-4 sm:px-6 py-4 flex flex-col items-center">
        {/* Title */}
        <div className="text-center mb-3 sm:mb-5 shrink-0">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-white font-normal">
            Help us style you perfectly
          </h2>
          <p className="font-ui text-xs sm:text-sm md:text-base text-[#EFD2A6]/80 mt-1">
            Choose your occasion, style aesthetic, and custom drapery preferences
          </p>
        </div>

        {/* 1. WHAT'S THE OCCASION? (Multi-select) */}
        <div className="w-full mb-4 sm:mb-6 shrink-0">
          <div className="flex items-center justify-between mb-2 px-1">
            <span className="font-ui text-[11px] sm:text-xs tracking-[0.3em] text-[#EFD2A6] uppercase font-bold">
              WHAT'S THE OCCASION?
            </span>
            <span className="text-[10px] sm:text-xs text-white/50 font-ui">(Select multiple)</span>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {OCCASIONS.map((occ) => {
              const isSelected = occasions.includes(occ);
              return (
                <button
                  key={occ}
                  type="button"
                  onClick={() => toggleOcc(occ)}
                  className={`h-11 sm:h-12 px-4 sm:px-5 rounded-xl sm:rounded-2xl border-2 font-display text-sm sm:text-base font-bold transition-all active:scale-95 flex items-center gap-2 ${
                    isSelected
                      ? 'bg-[#EFD2A6] text-[#07222B] border-[#EFD2A6] shadow-md'
                      : 'bg-[#0C2B35]/80 text-white border-[#EFD2A6]/25 hover:border-[#EFD2A6]/50'
                  }`}
                >
                  {isSelected && <Check className="w-4 h-4 text-[#07222B]" />}
                  <span>{occ}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. STYLE PREFERENCE (Single-select) */}
        <div className="w-full mb-4 sm:mb-6 shrink-0">
          <div className="font-ui text-[11px] sm:text-xs tracking-[0.3em] text-[#EFD2A6] uppercase font-bold mb-2 px-1">
            STYLE PREFERENCE
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {STYLES.map((st) => {
              const isSelected = stylePreference === st;
              return (
                <button
                  key={st}
                  type="button"
                  onClick={() => selectStyle(st)}
                  className={`h-11 sm:h-12 rounded-xl border-2 font-display text-xs sm:text-sm font-bold transition-all active:scale-95 flex items-center justify-center text-center px-1 ${
                    isSelected
                      ? 'bg-[#EFD2A6] text-[#07222B] border-[#EFD2A6] shadow-sm'
                      : 'bg-[#0C2B35]/80 text-white border-[#EFD2A6]/25 hover:border-[#EFD2A6]/50'
                  }`}
                >
                  {st}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. SUPPORTING CLOTH NEEDED? (Single-select) */}
        <div className="w-full mb-4 sm:mb-6 shrink-0">
          <div className="font-ui text-[11px] sm:text-xs tracking-[0.3em] text-[#EFD2A6] uppercase font-bold mb-2 px-1">
            SUPPORTING CLOTH NEEDED? (LINING, BLOUSE, CHURIDAR)
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => {
                playTouchFeedback('select');
                onSupportingClothChange(true);
              }}
              className={`h-12 sm:h-13 rounded-xl sm:rounded-2xl border-2 font-ui text-xs sm:text-sm font-bold transition-all active:scale-95 flex items-center justify-center gap-2 ${
                supportingCloth
                  ? 'bg-[#EFD2A6] text-[#07222B] border-[#EFD2A6] shadow-md'
                  : 'bg-[#0C2B35]/80 text-white border-[#EFD2A6]/25 hover:border-[#EFD2A6]/50'
              }`}
            >
              {supportingCloth && <Check className="w-4 h-4 text-[#07222B]" />}
              <span>Yes — suggest matching cloth</span>
            </button>

            <button
              type="button"
              onClick={() => {
                playTouchFeedback('select');
                onSupportingClothChange(false);
              }}
              className={`h-12 sm:h-13 rounded-xl sm:rounded-2xl border-2 font-ui text-xs sm:text-sm font-bold transition-all active:scale-95 flex items-center justify-center ${
                !supportingCloth
                  ? 'bg-[#EFD2A6] text-[#07222B] border-[#EFD2A6] shadow-md'
                  : 'bg-[#0C2B35]/80 text-white border-[#EFD2A6]/25 hover:border-[#EFD2A6]/50'
              }`}
            >
              <span>No, main fabric only</span>
            </button>
          </div>
        </div>

        {/* 4. DESCRIBE YOUR LOOK (Text + Voice Recording) */}
        <div className="w-full mb-3 shrink-0 pb-2">
          <div className="font-ui text-[11px] sm:text-xs tracking-[0.3em] text-[#EFD2A6] uppercase font-bold mb-2 px-1">
            DESCRIBE YOUR DREAM LOOK (OPTIONAL)
          </div>
          <div className="relative rounded-2xl bg-[#0C2B35]/80 border-2 border-[#EFD2A6]/25 p-3.5 sm:p-4 shadow-md">
            <textarea
              rows={3}
              value={lookDescription}
              onChange={(e) => onDescriptionChange(e.target.value)}
              placeholder="Type here or tap the microphone to speak your aesthetic..."
              className="w-full bg-transparent text-white font-ui text-sm sm:text-base placeholder-white/40 focus:outline-none resize-none pr-14"
            />

            {/* Voice Input Touch Button */}
            <button
              type="button"
              onClick={handleVoiceToggle}
              className={`absolute bottom-3 right-3 w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border-2 transition-all active:scale-90 shadow-sm ${
                isRecording
                  ? 'bg-rose-600 border-rose-300 text-white animate-pulse'
                  : 'bg-[#07222B] border-[#EFD2A6] text-[#EFD2A6] hover:bg-[#EFD2A6] hover:text-[#07222B]'
              }`}
              title={isRecording ? 'Listening...' : 'Tap to speak'}
            >
              {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>

            {isRecording && (
              <div className="mt-1 flex items-center gap-2 text-[#EFD2A6] text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                <span>Listening... Speak into kiosk microphone</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Primary CTA: GENERATE MY LOOK → */}
      <div className="w-full px-4 sm:px-6 py-3 sm:py-4 border-t border-[#EFD2A6]/20 bg-[#07222B]/90 backdrop-blur-md flex justify-center shrink-0">
        <button
          type="button"
          onClick={() => {
            playTouchFeedback('select');
            onContinue();
          }}
          className="w-full max-w-[480px] h-12 sm:h-14 md:h-16 rounded-full bg-gradient-to-r from-[#EFD2A6] via-[#F8EAD3] to-[#EFD2A6] text-[#07222B] font-ui font-bold text-base sm:text-xl tracking-widest uppercase shadow-md active:scale-[0.98] transition-all flex items-center justify-center"
        >
          <span>GENERATE MY LOOK →</span>
        </button>
      </div>
    </div>
  );
};
