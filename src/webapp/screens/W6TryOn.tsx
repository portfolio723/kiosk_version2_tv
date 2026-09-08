import React, { useState, useRef } from 'react';
import { useWebApp } from '../WebAppContext';
import { FABRIC_CATALOG, calculateFabricRequirement } from '../../data/fabrics';
import { Fabric, GarmentStyle, ClothingSize, BodyType, Gender, Occasion, StylePreference, TryOnStep } from '../../types';
import { InquiryModal } from '../components/InquiryModal';
import { ShareModal } from '../components/ShareModal';
import {
  X,
  Upload,
  Camera,
  Check,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Search,
  Sparkles as SparklesStub,
  Mic,
  MicOff,
  Heart,
  Share2,
  BookmarkCheck,
  RotateCcw,
} from 'lucide-react';

const SAMPLE_MODELS = [
  {
    id: 'model-w1',
    label: 'Model 1 (Women)',
    gender: 'women' as Gender,
    url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'model-w2',
    label: 'Model 2 (Women)',
    gender: 'women' as Gender,
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'model-m1',
    label: 'Model 3 (Men)',
    gender: 'men' as Gender,
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
  },
];

const OCCASIONS: Occasion[] = ['Wedding', 'Festival', 'Office', 'Party', 'Casual'];
const STYLES: StylePreference[] = ['Classic', 'Bold', 'Elegant', 'Playful', 'Royal'];
const SIZES: ClothingSize[] = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];

export const W6TryOn: React.FC = () => {
  const {
    tryOnStep,
    setTryOnStep,
    photoUrl,
    setPhotoUrl,
    heightFeet,
    heightInches,
    setHeight,
    bodyType,
    setBodyType,
    size,
    setSize,
    gender,
    setGender,
    occasions,
    toggleOccasion,
    stylePreference,
    setStylePreference,
    supportingCloth,
    setSupportingCloth,
    lookDescription,
    setLookDescription,
    selectedFabric,
    setSelectedFabric,
    selectedGarment,
    setSelectedGarment,
    saveLook,
    setCurrentScreen,
  } = useWebApp();

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Search in fabric selector
  const [fabricSearch, setFabricSearch] = useState('');
  const [fabricCategory, setFabricCategory] = useState<string>('All');
  const [isProcessingDrape, setIsProcessingDrape] = useState(false);
  const [saveSuccessToast, setSaveSuccessToast] = useState(false);
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);

  // Stepper helper
  const steps: { id: TryOnStep; label: string; num: number }[] = [
    { id: 'photo', label: 'Photo', num: 1 },
    { id: 'details', label: 'Details', num: 2 },
    { id: 'style', label: 'Style', num: 3 },
    { id: 'fabric', label: 'Fabric', num: 4 },
    { id: 'result', label: 'Result', num: 5 },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === tryOnStep);

  const goToNextStep = () => {
    if (tryOnStep === 'photo') setTryOnStep('details');
    else if (tryOnStep === 'details') setTryOnStep('style');
    else if (tryOnStep === 'style') setTryOnStep('fabric');
    else if (tryOnStep === 'fabric') handleRunTryOn();
  };

  const goToPrevStep = () => {
    if (tryOnStep === 'details') setTryOnStep('photo');
    else if (tryOnStep === 'style') setTryOnStep('details');
    else if (tryOnStep === 'fabric') setTryOnStep('style');
    else if (tryOnStep === 'result') setTryOnStep('fabric');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRunTryOn = () => {
    setIsProcessingDrape(true);
    setTimeout(() => {
      setIsProcessingDrape(false);
      setTryOnStep('result');
    }, 1200);
  };

  // Calculations for current selection
  const requirement = selectedFabric
    ? calculateFabricRequirement(
        selectedFabric,
        selectedGarment,
        heightFeet + heightInches / 12,
        bodyType
      )
    : { components: [], totalMetres: 6.5, totalCost: 5525 };

  const handleSaveLookAction = () => {
    if (!selectedFabric) return;
    saveLook({
      fabricId: selectedFabric.id,
      fabricName: selectedFabric.name,
      garment: selectedGarment,
      imageUrl: selectedFabric.tryOnPreviewUrl,
      metres: requirement.totalMetres,
      estimatedCost: requirement.totalCost,
      occasion: occasions[0] || 'Celebration',
    });
    setSaveSuccessToast(true);
    setTimeout(() => setSaveSuccessToast(false), 3000);
  };

  // Mock speech dictation
  const toggleSpeech = () => {
    if (isListening) {
      setIsListening(false);
    } else {
      setIsListening(true);
      setTimeout(() => {
        setLookDescription('Royal wedding look with antique gold zari embroidery and elegant pleated pallu drape');
        setIsListening(false);
      }, 1500);
    }
  };

  // Filter fabrics for step 4
  const filteredFabricsForStep = FABRIC_CATALOG.filter((f) => {
    if (fabricCategory !== 'All' && f.category !== fabricCategory) return false;
    if (fabricSearch.trim()) {
      const q = fabricSearch.toLowerCase();
      return f.name.toLowerCase().includes(q) || f.type.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-[#07222B] text-white select-none py-6 sm:py-10">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-8">
        {/* GLOBAL STEPPER HEADER */}
        <div className="bg-[#0C2B35] rounded-3xl border border-[#EFD2A6]/25 p-5 sm:p-6 mb-8 shadow-xl font-ui">
          {/* Top Line: Step label & Exit */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-widest text-[#EFD2A6] font-bold">
                Padavala Virtual Atelier
              </span>
              <span className="text-white/30">|</span>
              <span className="text-xs text-white/70">
                Step {currentStepIndex + 1} of 5: <strong className="text-white">{steps[currentStepIndex].label}</strong>
              </span>
            </div>
            <button
              type="button"
              onClick={() => setCurrentScreen('W5')}
              className="p-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              title="Exit Try-On"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Desktop Horizontal Stepper Bar */}
          <div className="hidden sm:flex items-center justify-between pt-5 px-4">
            {steps.map((step, idx) => {
              const isPassed = idx < currentStepIndex;
              const isCurrent = idx === currentStepIndex;
              return (
                <React.Fragment key={step.id}>
                  <div
                    onClick={() => {
                      if (idx < currentStepIndex) setTryOnStep(step.id);
                    }}
                    className={`flex items-center gap-2.5 ${
                      idx <= currentStepIndex ? 'cursor-pointer' : 'cursor-default'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isPassed
                          ? 'bg-[#EFD2A6] text-[#07222B]'
                          : isCurrent
                          ? 'bg-transparent border-2 border-[#EFD2A6] text-[#EFD2A6]'
                          : 'bg-[#07222B] border border-white/20 text-white/40'
                      }`}
                    >
                      {isPassed ? <Check className="w-4 h-4" /> : step.num}
                    </div>
                    <span
                      className={`text-xs uppercase tracking-wider font-semibold ${
                        isCurrent ? 'text-[#EFD2A6]' : isPassed ? 'text-white' : 'text-white/40'
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>

                  {idx < steps.length - 1 && (
                    <div
                      className={`flex-1 h-[2px] mx-3 transition-colors ${
                        idx < currentStepIndex ? 'bg-[#EFD2A6]' : 'bg-white/15'
                      }`}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>

          {/* Mobile Compact Progress */}
          <div className="sm:hidden pt-4 space-y-1.5">
            <div className="flex justify-between text-xs text-white/70">
              <span className="font-bold text-[#EFD2A6]">STEP {currentStepIndex + 1} OF 5</span>
              <span>{steps[currentStepIndex].label}</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#07222B] overflow-hidden">
              <div
                className="h-full bg-[#EFD2A6] transition-all duration-300"
                style={{ width: `${((currentStepIndex + 1) / 5) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* STEP CONTENT CONTAINER */}
        <div className="bg-[#0C2B35] rounded-3xl border border-[#EFD2A6]/25 p-6 sm:p-10 shadow-2xl min-h-[500px] flex flex-col justify-between">
          {/* ==============================
              STEP 1: UPLOAD PHOTO (W6a)
             ============================== */}
          {tryOnStep === 'photo' && (
            <div className="space-y-8 font-ui">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#EFD2A6] font-bold">Step 1 of 5</span>
                <h2 className="font-display text-2xl sm:text-3xl text-white font-normal mt-1">
                  Upload Your Posture Photo
                </h2>
                <p className="text-xs sm:text-sm text-white/70 mt-1">
                  Our AI drapes fabric directly onto your posture for realistic falls, folds, and seam alignment.
                </p>
              </div>

              {/* Desktop Split / Mobile Stack */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                {/* Left Instructions & Upload Options */}
                <div className="md:col-span-6 space-y-6">
                  {/* Photo Best Practices */}
                  <div className="p-5 rounded-2xl bg-[#07222B] border border-[#EFD2A6]/20 space-y-3">
                    <p className="text-xs uppercase tracking-wider text-[#EFD2A6] font-bold">
                      For Flawless Draping Results:
                    </p>
                    <ul className="text-xs text-white/80 space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#EFD2A6] shrink-0" />
                        <span>Good, even lighting without deep shadows</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#EFD2A6] shrink-0" />
                        <span>Full body visible from shoulders to feet</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#EFD2A6] shrink-0" />
                        <span>Plain, neutral wall or background</span>
                      </li>
                    </ul>
                  </div>

                  {/* Upload Actions */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex-1 py-3 px-4 rounded-xl bg-[#EFD2A6] text-[#07222B] font-bold text-xs uppercase tracking-wider hover:bg-white active:scale-95 transition-all flex items-center justify-center gap-2 shadow-md"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Upload Photo</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="py-3 px-4 rounded-xl bg-[#07222B] border border-[#EFD2A6]/40 text-white font-bold text-xs uppercase tracking-wider hover:bg-[#0E3440] active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                      <Camera className="w-4 h-4 text-[#EFD2A6]" />
                      <span>Take Photo</span>
                    </button>
                  </div>

                  {/* Sample Models Selection */}
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-white/60 font-semibold mb-2">
                      Or Pick Representative Posture:
                    </span>
                    <div className="grid grid-cols-3 gap-3">
                      {SAMPLE_MODELS.map((model) => {
                        const isSelected = photoUrl === model.url;
                        return (
                          <div
                            key={model.id}
                            onClick={() => {
                              setPhotoUrl(model.url);
                              setGender(model.gender);
                            }}
                            className={`cursor-pointer rounded-xl overflow-hidden border-2 transition-all p-1 bg-[#07222B] ${
                              isSelected ? 'border-[#EFD2A6] ring-2 ring-[#EFD2A6]/30' : 'border-white/15 hover:border-white/40'
                            }`}
                          >
                            <img
                              src={model.url}
                              alt={model.label}
                              className="w-full aspect-[3/4] object-cover rounded-lg"
                              referrerPolicy="no-referrer"
                            />
                            <p className="text-[10px] text-center text-white/70 truncate mt-1">
                              {model.label}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Right Photo Preview Area */}
                <div className="md:col-span-6 flex justify-center">
                  <div className="relative w-full max-w-[340px] aspect-[3/4] rounded-3xl overflow-hidden border-2 border-[#EFD2A6]/40 shadow-2xl bg-black/40 flex items-center justify-center">
                    {photoUrl ? (
                      <>
                        <img
                          src={photoUrl}
                          alt="Customer Posture Preview"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#07222B]/85 backdrop-blur-md border border-[#EFD2A6]/40 text-[11px] font-bold text-[#EFD2A6] flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#EFD2A6]" />
                          <span>Posture Calibrated</span>
                        </div>
                      </>
                    ) : (
                      <div className="text-center p-6 space-y-2 text-white/50">
                        <Upload className="w-8 h-8 mx-auto text-white/30" />
                        <p className="text-xs font-semibold">No posture photo selected yet</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Step Navigation Bar */}
              <div className="pt-6 border-t border-white/10 flex justify-end">
                <button
                  type="button"
                  onClick={goToNextStep}
                  disabled={!photoUrl}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#EFD2A6] via-[#F8EAD3] to-[#EFD2A6] text-[#07222B] font-bold text-xs sm:text-sm uppercase tracking-wider shadow-xl hover:bg-white active:scale-95 transition-all flex items-center gap-2"
                >
                  <span>CONTINUE</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ==============================
              STEP 2: BODY DETAILS (W6b)
             ============================== */}
          {tryOnStep === 'details' && (
            <div className="space-y-8 font-ui">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#EFD2A6] font-bold">Step 2 of 5</span>
                <h2 className="font-display text-2xl sm:text-3xl text-white font-normal mt-1">
                  Tell Us a Bit About Yourself
                </h2>
                <p className="text-xs sm:text-sm text-white/70 mt-1">
                  Accurate sizing ensures our virtual drape falls naturally and calculates exact cloth yardage.
                </p>
              </div>

              <div className="max-w-2xl mx-auto space-y-6">
                {/* Height Slider */}
                <div className="p-5 rounded-2xl bg-[#07222B] border border-[#EFD2A6]/20 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs uppercase tracking-wider text-[#EFD2A6] font-bold">
                      Height
                    </span>
                    <span className="font-display text-xl font-bold text-white">
                      {heightFeet}'{heightInches}"
                    </span>
                  </div>
                  <input
                    type="range"
                    min={48} // 4'0"
                    max={78} // 6'6"
                    value={heightFeet * 12 + heightInches}
                    onChange={(e) => {
                      const totalInches = Number(e.target.value);
                      const f = Math.floor(totalInches / 12);
                      const i = totalInches % 12;
                      setHeight(f, i);
                    }}
                    className="w-full accent-[#EFD2A6] cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-white/50 font-mono">
                    <span>4'0"</span>
                    <span>5'4" (Avg)</span>
                    <span>6'6"</span>
                  </div>
                </div>

                {/* Body Type */}
                <div>
                  <span className="block text-xs uppercase tracking-wider text-[#EFD2A6] font-bold mb-2.5">
                    Body Type
                  </span>
                  <div className="grid grid-cols-3 gap-3">
                    {(['slim', 'regular', 'plus'] as BodyType[]).map((bt) => {
                      const isSelected = bodyType === bt;
                      return (
                        <button
                          key={bt}
                          type="button"
                          onClick={() => setBodyType(bt)}
                          className={`py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all capitalize ${
                            isSelected
                              ? 'bg-[#EFD2A6] text-[#07222B] shadow-lg scale-100 font-bold'
                              : 'bg-[#07222B] text-white/80 border border-white/20 hover:border-white/40'
                          }`}
                        >
                          {bt}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Size */}
                <div>
                  <span className="block text-xs uppercase tracking-wider text-[#EFD2A6] font-bold mb-2.5">
                    Standard Clothing Size
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {SIZES.map((sz) => {
                      const isSelected = size === sz;
                      return (
                        <button
                          key={sz}
                          type="button"
                          onClick={() => setSize(sz)}
                          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all ${
                            isSelected
                              ? 'bg-[#EFD2A6] text-[#07222B] shadow-lg font-bold'
                              : 'bg-[#07222B] text-white/80 border border-white/20 hover:border-white/40'
                          }`}
                        >
                          {sz}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Gender */}
                <div>
                  <span className="block text-xs uppercase tracking-wider text-[#EFD2A6] font-bold mb-2.5">
                    Garment Silhouette / Gender
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    {(['women', 'men'] as Gender[]).map((g) => {
                      const isSelected = gender === g;
                      return (
                        <button
                          key={g}
                          type="button"
                          onClick={() => {
                            setGender(g);
                            setSelectedGarment(g === 'women' ? 'Saree' : 'Sherwani');
                          }}
                          className={`py-3.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all capitalize ${
                            isSelected
                              ? 'bg-[#EFD2A6] text-[#07222B] shadow-lg font-bold'
                              : 'bg-[#07222B] text-white/80 border border-white/20 hover:border-white/40'
                          }`}
                        >
                          {g}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Step Navigation Bar */}
              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={goToPrevStep}
                  className="px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/5 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>BACK</span>
                </button>
                <button
                  type="button"
                  onClick={goToNextStep}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#EFD2A6] via-[#F8EAD3] to-[#EFD2A6] text-[#07222B] font-bold text-xs sm:text-sm uppercase tracking-wider shadow-xl hover:bg-white active:scale-95 transition-all flex items-center gap-2"
                >
                  <span>CONTINUE</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ==============================
              STEP 3: STYLE QUESTIONS (W6c)
             ============================== */}
          {tryOnStep === 'style' && (
            <div className="space-y-8 font-ui">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#EFD2A6] font-bold">Step 3 of 5</span>
                <h2 className="font-display text-2xl sm:text-3xl text-white font-normal mt-1">
                  Help Us Style You Perfectly
                </h2>
                <p className="text-xs sm:text-sm text-white/70 mt-1">
                  Tailored aesthetics to match the venue, mood, and supporting fabrics.
                </p>
              </div>

              <div className="max-w-3xl mx-auto space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Occasion */}
                  <div className="p-5 rounded-2xl bg-[#07222B] border border-[#EFD2A6]/20 space-y-3">
                    <span className="block text-xs uppercase tracking-wider text-[#EFD2A6] font-bold">
                      What's the Occasion?
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {OCCASIONS.map((occ) => {
                        const isSelected = occasions.includes(occ);
                        return (
                          <button
                            key={occ}
                            type="button"
                            onClick={() => toggleOccasion(occ)}
                            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                              isSelected
                                ? 'bg-[#EFD2A6] text-[#07222B] shadow-md font-bold'
                                : 'bg-[#0C2B35] text-white/80 border border-white/15'
                            }`}
                          >
                            {occ}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Style Preference */}
                  <div className="p-5 rounded-2xl bg-[#07222B] border border-[#EFD2A6]/20 space-y-3">
                    <span className="block text-xs uppercase tracking-wider text-[#EFD2A6] font-bold">
                      Style Preference
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {STYLES.map((st) => {
                        const isSelected = stylePreference === st;
                        return (
                          <button
                            key={st}
                            type="button"
                            onClick={() => setStylePreference(st)}
                            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                              isSelected
                                ? 'bg-[#EFD2A6] text-[#07222B] shadow-md font-bold'
                                : 'bg-[#0C2B35] text-white/80 border border-white/15'
                            }`}
                          >
                            {st}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Supporting Cloth Requirement */}
                <div className="p-5 rounded-2xl bg-[#07222B] border border-[#EFD2A6]/20 space-y-3">
                  <span className="block text-xs uppercase tracking-wider text-[#EFD2A6] font-bold">
                    Supporting Cloth Needed? (Lining / Blouse / Border)
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setSupportingCloth(true)}
                      className={`py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                        supportingCloth
                          ? 'bg-[#EFD2A6] text-[#07222B] shadow-md font-bold'
                          : 'bg-[#0C2B35] text-white/80 border border-white/15'
                      }`}
                    >
                      Yes — Suggest Matching Cloth
                    </button>
                    <button
                      type="button"
                      onClick={() => setSupportingCloth(false)}
                      className={`py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                        !supportingCloth
                          ? 'bg-[#EFD2A6] text-[#07222B] shadow-md font-bold'
                          : 'bg-[#0C2B35] text-white/80 border border-white/15'
                      }`}
                    >
                      No — Fabric Only
                    </button>
                  </div>
                </div>

                {/* Describe Your Look / Voice Input */}
                <div className="p-5 rounded-2xl bg-[#07222B] border border-[#EFD2A6]/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-[#EFD2A6] font-bold">
                      Describe Your Look
                    </span>
                    <button
                      type="button"
                      onClick={toggleSpeech}
                      className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all ${
                        isListening
                          ? 'bg-rose-500 text-white animate-pulse'
                          : 'bg-[#0C2B35] border border-[#EFD2A6]/40 text-[#EFD2A6]'
                      }`}
                    >
                      {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                      <span>{isListening ? 'Listening...' : 'Voice Dictate'}</span>
                    </button>
                  </div>
                  <textarea
                    rows={3}
                    value={lookDescription}
                    onChange={(e) => setLookDescription(e.target.value)}
                    placeholder="e.g. Royal wedding look with antique gold zari border and flared kalis..."
                    className="w-full p-3.5 rounded-xl bg-[#0C2B35] border border-white/20 text-white text-xs sm:text-sm focus:border-[#EFD2A6] focus:outline-none"
                  />
                </div>
              </div>

              {/* Step Navigation Bar */}
              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={goToPrevStep}
                  className="px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/5 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>BACK</span>
                </button>
                <button
                  type="button"
                  onClick={goToNextStep}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#EFD2A6] via-[#F8EAD3] to-[#EFD2A6] text-[#07222B] font-bold text-xs sm:text-sm uppercase tracking-wider shadow-xl hover:bg-white active:scale-95 transition-all flex items-center gap-2"
                >
                  <span>CONTINUE</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ==============================
              STEP 4: SELECT FABRIC (W6d)
             ============================== */}
          {tryOnStep === 'fabric' && (
            <div className="space-y-6 font-ui">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#EFD2A6] font-bold">Step 4 of 5</span>
                <h2 className="font-display text-2xl sm:text-3xl text-white font-normal mt-1">
                  Choose Your Fabric
                </h2>
                <p className="text-xs sm:text-sm text-white/70 mt-1">
                  Select an authentic weave to simulate the real-time AI drape.
                </p>
              </div>

              {/* Search & Category Pills */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#EFD2A6]" />
                  <input
                    type="text"
                    value={fabricSearch}
                    onChange={(e) => setFabricSearch(e.target.value)}
                    placeholder="Search handloom weaves..."
                    className="w-full h-11 pl-10 pr-4 rounded-xl bg-[#07222B] border border-[#EFD2A6]/30 text-white text-xs sm:text-sm focus:outline-none"
                  />
                </div>
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                  {['All', 'Saree', 'Lehenga', 'Salwar', 'Kurti'].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setFabricCategory(cat)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider whitespace-nowrap ${
                        fabricCategory === cat
                          ? 'bg-[#EFD2A6] text-[#07222B]'
                          : 'bg-[#07222B] text-white/70 border border-white/10'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Grid of Fabrics with Radio-style Selection */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-h-[400px] overflow-y-auto pr-1">
                {filteredFabricsForStep.map((fab) => {
                  const isSelected = selectedFabric?.id === fab.id;
                  return (
                    <div
                      key={fab.id}
                      onClick={() => {
                        setSelectedFabric(fab);
                        setSelectedGarment(fab.defaultGarment);
                      }}
                      className={`cursor-pointer rounded-2xl bg-[#07222B] border-2 overflow-hidden transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#EFD2A6] ring-2 ring-[#EFD2A6]/40 shadow-xl'
                          : 'border-white/15 hover:border-white/40'
                      }`}
                    >
                      <div className="relative aspect-[4/5] overflow-hidden bg-black/40">
                        <img
                          src={fab.imageUrl}
                          alt={fab.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/70 text-[10px] font-bold text-[#EFD2A6]">
                          ₹{fab.pricePerMetre}/m
                        </div>
                        {isSelected && (
                          <div className="absolute inset-0 bg-[#EFD2A6]/20 flex items-center justify-center">
                            <span className="w-8 h-8 rounded-full bg-[#EFD2A6] text-[#07222B] flex items-center justify-center font-bold shadow-lg">
                              <Check className="w-5 h-5" />
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-3">
                        <span className="text-[10px] text-[#EFD2A6] uppercase font-semibold">
                          {fab.category}
                        </span>
                        <h4 className="font-display text-xs sm:text-sm font-bold text-white truncate">
                          {fab.name}
                        </h4>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Selected Fabric Summary Bar */}
              {selectedFabric && (
                <div className="p-4 rounded-2xl bg-[#07222B] border border-[#EFD2A6]/30 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedFabric.imageUrl}
                      alt={selectedFabric.name}
                      className="w-12 h-12 rounded-xl object-cover border border-[#EFD2A6]/40"
                    />
                    <div>
                      <span className="text-[10px] uppercase text-[#EFD2A6] font-bold">Selected Fabric</span>
                      <p className="font-display text-sm sm:text-base font-bold text-white">
                        {selectedFabric.name} ({selectedFabric.type})
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-ui">
                    <div className="text-right">
                      <p className="text-white/60">Estimated Metres</p>
                      <p className="font-bold text-white">{requirement.totalMetres} metres</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white/60">Estimated Total</p>
                      <p className="font-bold text-[#EFD2A6] text-sm sm:text-base">
                        ₹{requirement.totalCost.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step Navigation Bar */}
              <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={goToPrevStep}
                  className="px-6 py-3 rounded-full border border-white/20 text-white hover:bg-white/5 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>BACK</span>
                </button>
                <button
                  type="button"
                  onClick={goToNextStep}
                  disabled={!selectedFabric || isProcessingDrape}
                  className="px-8 py-3.5 rounded-full bg-gradient-to-r from-[#EFD2A6] via-[#F8EAD3] to-[#EFD2A6] text-[#07222B] font-bold text-xs sm:text-sm uppercase tracking-wider shadow-xl hover:bg-white active:scale-95 transition-all flex items-center gap-2"
                >
                  {isProcessingDrape ? (
                    <span>SIMULATING REAL-DRAPE™...</span>
                  ) : (
                    <>
                      <span>TRY THIS ON</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* ==============================
              STEP 5: RESULT PAYOFF (W6e)
             ============================== */}
          {tryOnStep === 'result' && selectedFabric && (
            <div className="space-y-8 font-ui animate-fadeIn">
              <div className="text-center sm:text-left">
                <span className="text-xs uppercase tracking-widest text-[#EFD2A6] font-bold">
                  Draping Complete
                </span>
                <h2 className="font-display text-3xl sm:text-4xl text-white font-normal mt-0.5">
                  Here's Your Look!
                </h2>
                <p className="text-xs sm:text-sm text-white/70 mt-1">
                  Photorealistic virtual drape based on your posture and custom measurements.
                </p>
              </div>

              {/* Desktop Split / Mobile Stacked Result */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Large AI Try-On Result Visual */}
                <div className="lg:col-span-7 flex justify-center">
                  <div className="relative w-full max-w-[460px] aspect-[4/5] rounded-3xl overflow-hidden border-2 border-[#EFD2A6]/40 shadow-2xl bg-black/40">
                    <img
                      src={selectedFabric.tryOnPreviewUrl}
                      alt={selectedFabric.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#07222B]/85 via-transparent to-transparent" />

                    {/* Quality Insignia Badge */}
                    <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-[#0C2B35]/85 backdrop-blur-md border border-[#EFD2A6]/40 text-[#EFD2A6] text-xs font-semibold flex items-center gap-2 shadow-lg">
                      <img
                        src="/assets/padavala-Logo.png"
                        alt="Padavala"
                        className="h-5 w-auto object-contain"
                      />
                      <span>Padavala AI Real-Drape™</span>
                    </div>

                    {/* Bottom overlay badge */}
                    <div className="absolute bottom-4 inset-x-4 p-3 rounded-2xl bg-[#07222B]/85 backdrop-blur-md border border-[#EFD2A6]/20 flex items-center justify-between text-xs">
                      <div>
                        <p className="text-white font-bold">{selectedFabric.name}</p>
                        <p className="text-[#EFD2A6]">{selectedGarment} Drape</p>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[11px] font-semibold">
                        Ready to Tailor
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Details + Actions Panel */}
                <div className="lg:col-span-5 space-y-6">
                  {/* Fabric & Yardage Card */}
                  <div className="p-6 rounded-3xl bg-[#07222B] border border-[#EFD2A6]/25 space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div>
                        <span className="text-[10px] uppercase text-[#EFD2A6] font-bold">Fabric Selection</span>
                        <h4 className="font-display text-xl font-bold text-white">{selectedFabric.name}</h4>
                      </div>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-[#0C2B35] text-[#EFD2A6] font-semibold">
                        {selectedGarment}
                      </span>
                    </div>

                    {/* Meterage Breakdown */}
                    <div className="space-y-2 text-xs">
                      <p className="text-white/60 font-semibold uppercase tracking-wider">Required Components</p>
                      {requirement.components.map((comp, idx) => (
                        <div key={idx} className="flex justify-between text-white/80">
                          <span>{comp.name}</span>
                          <span className="font-mono font-bold text-white">{comp.metres} mtrs</span>
                        </div>
                      ))}
                      <div className="pt-2 border-t border-white/10 flex justify-between font-bold text-white text-sm">
                        <span>Total Fabric Needed</span>
                        <span className="text-[#EFD2A6]">{requirement.totalMetres} metres</span>
                      </div>
                    </div>

                    {/* Estimated Total Price */}
                    <div className="p-4 rounded-2xl bg-[#0C2B35] border border-[#EFD2A6]/20 flex items-center justify-between">
                      <div>
                        <p className="text-[11px] text-white/50 uppercase tracking-wider">Estimated Fabric Cost</p>
                        <p className="text-xs text-white/70">₹{selectedFabric.pricePerMetre} × {requirement.totalMetres}m</p>
                      </div>
                      <p className="font-display text-2xl font-bold text-[#EFD2A6]">
                        ₹{requirement.totalCost.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Actions Buttons */}
                  <div className="space-y-3 font-ui">
                    {/* Primary CTA */}
                    <button
                      type="button"
                      onClick={() => setInquiryModalOpen(true)}
                      className="w-full py-4 rounded-full bg-gradient-to-r from-[#EFD2A6] via-[#F8EAD3] to-[#EFD2A6] text-[#07222B] font-bold text-xs sm:text-sm uppercase tracking-wider shadow-xl hover:bg-white active:scale-95 transition-all"
                    >
                      I WANT TO BUY THIS
                    </button>

                    {/* Secondary Action 1: Save Look */}
                    <button
                      type="button"
                      onClick={handleSaveLookAction}
                      className="w-full py-3 rounded-full bg-[#07222B] border border-[#EFD2A6]/40 text-[#EFD2A6] hover:bg-[#0E3440] font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                    >
                      <BookmarkCheck className="w-4 h-4" />
                      <span>SAVE LOOK TO LOOKBOOK</span>
                    </button>

                    {/* Secondary Action 2: Send to My Phone */}
                    <button
                      type="button"
                      onClick={() => setShareModalOpen(true)}
                      className="w-full py-3 rounded-full bg-[#07222B] border border-white/20 text-white hover:bg-white/5 font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>SEND TO MY PHONE</span>
                    </button>

                    {/* Secondary Action 3: Try Another Fabric */}
                    <button
                      type="button"
                      onClick={() => setTryOnStep('fabric')}
                      className="w-full py-2.5 text-center text-xs text-white/60 hover:text-white transition-colors flex items-center justify-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Try Another Fabric</span>
                    </button>
                  </div>

                  {saveSuccessToast && (
                    <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs text-center animate-fadeIn">
                      Look saved to your Lookbook! Check under "Lookbook" in the top bar.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={inquiryModalOpen}
        onClose={() => setInquiryModalOpen(false)}
        fabric={selectedFabric}
        garment={selectedGarment}
        metres={requirement.totalMetres}
        totalCost={requirement.totalCost}
      />

      {/* Share Modal */}
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
        title="Send Look to Phone"
        lookTitle={`${selectedFabric?.name} — ${selectedGarment}`}
      />
    </div>
  );
};
