import React, { useState } from 'react';
import { X, Check, Copy, MessageCircle, Send } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  shareUrl?: string;
  lookTitle?: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  title,
  shareUrl = window.location.href,
  lookTitle,
}) => {
  const [copied, setCopied] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('+91 98450 12345');
  const [sentSms, setSentSms] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard?.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendToPhone = (e: React.FormEvent) => {
    e.preventDefault();
    setSentSms(true);
    setTimeout(() => {
      setSentSms(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn select-none font-ui">
      <div className="w-full max-w-md bg-[#0C2B35] rounded-3xl border border-[#EFD2A6]/40 shadow-2xl p-6 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full text-white/60 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="font-display text-xl text-white font-normal mb-1">
          {title}
        </h3>
        {lookTitle && (
          <p className="text-xs text-[#EFD2A6] font-semibold mb-4">
            {lookTitle}
          </p>
        )}

        <div className="space-y-4 pt-2">
          {/* Send via SMS / WhatsApp directly */}
          <form onSubmit={handleSendToPhone} className="space-y-2">
            <label className="block text-xs uppercase tracking-wider text-white/70 font-semibold">
              Send Drape & Breakdown to Mobile
            </label>
            <div className="flex gap-2">
              <input
                type="tel"
                required
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="+91 98450 12345"
                className="flex-1 h-11 px-3.5 rounded-xl bg-[#07222B] border border-[#EFD2A6]/30 text-white text-xs"
              />
              <button
                type="submit"
                className="px-4 h-11 rounded-xl bg-[#EFD2A6] text-[#07222B] text-xs font-bold uppercase tracking-wider hover:bg-white active:scale-95 transition-all shrink-0 flex items-center gap-1.5"
              >
                {sentSms ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>SENT!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>SEND</span>
                  </>
                )}
              </button>
            </div>
            {sentSms && (
              <p className="text-[11px] text-emerald-300">
                High-resolution lookbook link dispatched to {phoneNumber}!
              </p>
            )}
          </form>

          {/* Direct Link Copy */}
          <div className="pt-3 border-t border-white/10 space-y-2">
            <label className="block text-xs uppercase tracking-wider text-white/70 font-semibold">
              Share Direct Link
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="flex-1 h-10 px-3 rounded-xl bg-[#07222B] border border-white/20 text-white/70 text-xs font-mono truncate"
              />
              <button
                type="button"
                onClick={handleCopy}
                className="px-3.5 h-10 rounded-xl border border-[#EFD2A6]/40 text-[#EFD2A6] hover:bg-[#EFD2A6] hover:text-[#07222B] text-xs font-bold flex items-center gap-1 transition-all shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
