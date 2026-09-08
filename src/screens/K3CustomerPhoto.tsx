import React, { useState, useRef, useEffect } from 'react';
import { KioskHeader } from '../components/KioskHeader';
import { Language } from '../types';
import { translations } from '../data/translations';
import { playTouchFeedback } from '../utils/audio';
import { Camera, Upload, RotateCcw, Check, User, AlertCircle } from 'lucide-react';

interface K3CustomerPhotoProps {
  photoUrl: string | null;
  onPhotoSelected: (url: string, source: 'camera' | 'upload' | 'sample') => void;
  consentSave: boolean;
  onToggleConsent: (val: boolean) => void;
  onContinue: () => void;
  onBack: () => void;
  language: Language;
}

// Curated high quality portrait reference models if user wants instant selection
const SAMPLE_MODELS = [
  {
    name: 'Sample 1 (Ananya)',
    url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop',
    gender: 'women',
  },
  {
    name: 'Sample 2 (Rohan)',
    url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
    gender: 'men',
  },
  {
    name: 'Sample 3 (Priya)',
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
    gender: 'women',
  },
];

export const K3CustomerPhoto: React.FC<K3CustomerPhotoProps> = ({
  photoUrl,
  onPhotoSelected,
  consentSave,
  onToggleConsent,
  onContinue,
  onBack,
  language,
}) => {
  const t = translations[language];
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Stop camera when unmounting
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    playTouchFeedback('tap');
    setCameraError(null);
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: { ideal: 1080 }, height: { ideal: 1920 } },
          audio: false,
        });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
        setCameraActive(true);
      } else {
        setCameraError('Camera access not supported on this device.');
      }
    } catch (err) {
      console.warn('Camera access denied or unavailable:', err);
      setCameraError('Please allow camera access or choose an upload/sample profile.');
    }
  };

  const capturePhoto = () => {
    playTouchFeedback('select');
    setCountdown(3);
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(interval);
          snapImage();
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const snapImage = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 720;
    canvas.height = videoRef.current.videoHeight || 960;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      // Flip if front camera mirror
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      onPhotoSelected(dataUrl, 'camera');
      playTouchFeedback('success');
    }
    // stop camera stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert('Please use a JPG or PNG image under 10 MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        playTouchFeedback('success');
        onPhotoSelected(event.target.result as string, 'upload');
      }
    };
    reader.readAsDataURL(file);
  };

  const selectSample = (url: string) => {
    playTouchFeedback('select');
    onPhotoSelected(url, 'sample');
  };

  const handleRetake = () => {
    playTouchFeedback('tap');
    onPhotoSelected('', 'camera');
    startCamera();
  };

  const handleContinue = () => {
    if (!photoUrl) return;
    playTouchFeedback('select');
    onContinue();
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between select-none">
      <KioskHeader
        onBack={onBack}
        showBack={true}
        currentStep={1}
        totalSteps={4}
        stepLabel={t.stepOf(1, 4)}
      />

      <div className="flex-1 min-h-0 overflow-y-auto w-full max-w-[560px] mx-auto px-4 sm:px-6 py-4 flex flex-col items-center">
        {/* Title */}
        <div className="text-center mb-3 sm:mb-5 shrink-0">
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl text-white font-normal">
            Let's start with your photo
          </h2>
          <p className="font-ui text-xs sm:text-sm md:text-base text-[#EFD2A6]/80 mt-1">
            Padavala AI will analyze your posture & drape fabrics with millimeter precision
          </p>
        </div>

        {/* Portrait Capture Frame */}
        <div className="relative w-full max-w-[440px] aspect-[4/3] sm:aspect-square max-h-[34vh] sm:max-h-[40vh] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#07222B] border-2 border-[#EFD2A6]/40 shadow-lg flex items-center justify-center shrink-0">
          {/* Case 1: Photo Captured */}
          {photoUrl ? (
            <div className="relative w-full h-full">
              <img
                src={photoUrl}
                alt="Captured customer profile"
                className="w-full h-full object-cover"
              />
              {/* Overlay Confirmation */}
              <div className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-[#0C2B35]/90 border border-[#EFD2A6] text-[#EFD2A6] font-ui text-xs font-semibold flex items-center gap-1.5 shadow-lg backdrop-blur-md">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Photo Ready</span>
              </div>

              {/* Retake Button Floating on bottom */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2">
                <button
                  type="button"
                  onClick={handleRetake}
                  className="px-5 py-2 rounded-full bg-[#07222B]/90 border border-[#EFD2A6] text-[#EFD2A6] font-ui text-sm font-semibold flex items-center gap-2 shadow-xl backdrop-blur-md active:scale-95 transition-all hover:bg-[#0C2B35]"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Retake Photo</span>
                </button>
              </div>
            </div>
          ) : cameraActive ? (
            /* Case 2: Camera Stream Active */
            <div className="relative w-full h-full flex items-center justify-center bg-black">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover -scale-x-100"
              />

              {/* Body Silhouette Framing Guide */}
              <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center opacity-40">
                {/* Head circle */}
                <div className="w-20 h-24 sm:w-28 sm:h-32 rounded-full border-2 border-dashed border-[#EFD2A6] mb-2 sm:mb-4" />
                {/* Torso outline */}
                <div className="w-44 h-48 sm:w-60 sm:h-64 rounded-t-[40px] sm:rounded-t-[60px] border-2 border-dashed border-[#EFD2A6]" />
              </div>

              {/* Countdown Overlay */}
              {countdown !== null && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="text-6xl sm:text-8xl font-display font-bold text-[#EFD2A6] animate-ping">
                    {countdown}
                  </span>
                </div>
              )}

              {/* Snap CTA button inside frame */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                <button
                  type="button"
                  onClick={capturePhoto}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#EFD2A6] border-4 border-white/60 shadow-[0_0_24px_rgba(239,210,166,0.8)] active:scale-90 transition-all flex items-center justify-center"
                  aria-label="Snap photo"
                >
                  <div className="w-11 h-11 sm:w-14 sm:h-14 rounded-full border-2 border-[#07222B] flex items-center justify-center">
                    <Camera className="w-6 h-6 sm:w-7 sm:h-7 text-[#07222B]" />
                  </div>
                </button>
              </div>
            </div>
          ) : (
            /* Case 3: Empty State / Standby */
            <div className="flex flex-col items-center justify-center text-center p-4">
              {/* Framing Silhouette Graphic */}
              <div className="relative mb-3">
                <div className="w-24 h-28 sm:w-32 sm:h-36 rounded-2xl border-2 border-dashed border-[#EFD2A6]/30 flex flex-col items-center justify-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#EFD2A6]/40 mb-1" />
                  <div className="w-16 h-10 sm:w-20 sm:h-12 rounded-t-xl border-2 border-[#EFD2A6]/40" />
                </div>
              </div>

              <p className="font-display text-lg sm:text-xl text-[#EFD2A6] mb-1">
                Position yourself inside the frame
              </p>
              <p className="font-ui text-xs sm:text-sm text-white/70 max-w-xs mb-3">
                Tap below to activate camera or upload photo
              </p>

              {cameraError && (
                <div className="flex items-center gap-1.5 text-rose-300 text-xs bg-rose-950/40 px-3 py-1.5 rounded-xl border border-rose-800/50 mb-2">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>{cameraError}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons: Take Photo & Upload Photo */}
        <div className="w-full max-w-[440px] grid grid-cols-2 gap-3 mt-3 sm:mt-4 shrink-0">
          <button
            type="button"
            onClick={startCamera}
            className="h-12 sm:h-14 rounded-xl sm:rounded-2xl bg-[#0C2B35] border-2 border-[#EFD2A6]/40 hover:border-[#EFD2A6] text-[#EFD2A6] font-ui text-sm sm:text-base font-bold flex items-center justify-center gap-2 active:scale-98 transition-all shadow-sm"
          >
            <Camera className="w-5 h-5" />
            <span>Take Photo</span>
          </button>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="h-12 sm:h-14 rounded-xl sm:rounded-2xl bg-[#0C2B35] border-2 border-[#EFD2A6]/40 hover:border-[#EFD2A6] text-[#EFD2A6] font-ui text-sm sm:text-base font-bold flex items-center justify-center gap-2 active:scale-98 transition-all shadow-sm"
          >
            <Upload className="w-5 h-5" />
            <span>Upload Photo</span>
          </button>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleFileUpload}
          />
        </div>

        {/* Quick Sample Profiles for Instant Testing */}
        <div className="w-full max-w-[440px] mt-3 sm:mt-4 p-3 rounded-xl bg-[#0C2B35]/50 border border-[#EFD2A6]/20 shrink-0">
          <div className="flex items-center justify-between mb-2">
            <span className="font-ui text-[10px] sm:text-xs tracking-wider uppercase text-[#EFD2A6]/80 font-semibold flex items-center">
              <span>Or Choose Sample Profile</span>
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {SAMPLE_MODELS.map((m, i) => (
              <button
                key={i}
                type="button"
                onClick={() => selectSample(m.url)}
                className="flex items-center gap-2 p-1.5 sm:p-2 rounded-lg bg-[#07222B] border border-[#EFD2A6]/30 hover:border-[#EFD2A6] active:scale-95 transition-all text-left"
              >
                <img
                  src={m.url}
                  alt={m.name}
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-md object-cover shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="font-ui text-xs text-white font-semibold truncate">{m.name}</div>
                  <div className="font-ui text-[9px] text-[#EFD2A6]/70 capitalize">{m.gender}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Framing Tips & Consent Checkbox */}
        <div className="w-full max-w-[440px] mt-3 sm:mt-4 flex flex-col gap-2.5 text-white/80 font-ui text-xs shrink-0 pb-2">
          <div className="p-3 rounded-xl bg-[#07222B]/60 border border-[#EFD2A6]/15">
            <div className="font-bold text-[#EFD2A6] mb-1 text-xs">For best results</div>
            <ul className="space-y-0.5 text-[11px] text-white/70">
              <li>• Stand against a plain wall</li>
              <li>• Use good lighting with face visible</li>
              <li>• Keep your full body visible</li>
            </ul>
          </div>

          <label className="flex items-center gap-2.5 cursor-pointer py-1 select-none">
            <input
              type="checkbox"
              checked={consentSave}
              onChange={(e) => onToggleConsent(e.target.checked)}
              className="w-4 h-4 rounded accent-[#EFD2A6] cursor-pointer"
            />
            <span className="text-xs text-white/90">
              Save my photo for future visits and digital lookbook
            </span>
          </label>
        </div>
      </div>

      {/* Primary CTA (Disabled until photo available) */}
      <div className="w-full px-4 sm:px-6 py-3 sm:py-4 border-t border-[#EFD2A6]/20 bg-[#07222B]/90 backdrop-blur-md flex justify-center shrink-0">
        <button
          type="button"
          disabled={!photoUrl}
          onClick={handleContinue}
          className={`w-full max-w-[480px] h-12 sm:h-14 md:h-16 rounded-full font-ui font-bold text-base sm:text-xl tracking-widest uppercase transition-all flex items-center justify-center gap-2 sm:gap-3 shadow-md ${
            photoUrl
              ? 'bg-gradient-to-r from-[#EFD2A6] via-[#F8EAD3] to-[#EFD2A6] text-[#07222B] shadow-[0_8px_24px_rgba(239,210,166,0.3)] active:scale-[0.98]'
              : 'bg-white/10 text-white/30 border border-white/10 cursor-not-allowed'
          }`}
        >
          <span>{t.continueBtn}</span>
        </button>
      </div>
    </div>
  );
};
