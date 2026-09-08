import React, { useState } from 'react';
import { useWebApp } from '../WebAppContext';
import { SavedLookItem } from '../../types';
import { ShareModal } from '../components/ShareModal';
import { InquiryModal } from '../components/InquiryModal';
import { FABRIC_CATALOG } from '../../data/fabrics';
import {
  Heart,
  Share2,
  Download,
  Trash2,
  ArrowRight,
  Sparkles as SparklesStub,
  Check,
  Printer,
  FileText,
} from 'lucide-react';

export const W7Lookbook: React.FC = () => {
  const { savedLooks, removeSavedLook, setCurrentScreen, setTryOnStep } = useWebApp();

  const [activeShareLook, setActiveShareLook] = useState<SavedLookItem | null>(null);
  const [activeInquireLook, setActiveInquireLook] = useState<SavedLookItem | null>(null);
  const [downloadingPdf, setDownloadingPdf] = useState(false);
  const [shareAllOpen, setShareAllOpen] = useState(false);

  const handleDownloadPdf = () => {
    setDownloadingPdf(true);
    setTimeout(() => {
      setDownloadingPdf(false);
      window.print();
    }, 800);
  };

  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-[#07222B] text-white select-none py-8 sm:py-14">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8 space-y-8">
        {/* Lookbook Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 gap-4 font-ui">
          <div>
            <h1 className="font-display text-3xl sm:text-4xl text-white font-normal">
              My Lookbook
            </h1>
            <p className="text-xs sm:text-sm text-white/70 mt-1">
              Your saved virtual AI styling drapes, tailor yardages, and estimates ({savedLooks.length} saved)
            </p>
          </div>

          {savedLooks.length > 0 && (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShareAllOpen(true)}
                className="px-4 py-2.5 rounded-full border border-[#EFD2A6]/40 text-[#EFD2A6] hover:bg-[#EFD2A6] hover:text-[#07222B] text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share All</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadPdf}
                disabled={downloadingPdf}
                className="px-5 py-2.5 rounded-full bg-[#EFD2A6] text-[#07222B] hover:bg-white text-xs font-bold uppercase tracking-wider shadow-md active:scale-95 transition-all flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{downloadingPdf ? 'Generating PDF...' : 'Download PDF'}</span>
              </button>
            </div>
          )}
        </div>

        {/* Saved Looks Grid */}
        {savedLooks.length === 0 ? (
          <div className="p-16 text-center rounded-3xl bg-[#0C2B35] border border-[#EFD2A6]/20 max-w-lg mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#EFD2A6]/10 border border-[#EFD2A6]/30 flex items-center justify-center mx-auto text-[#EFD2A6]">
              <Heart className="w-8 h-8" />
            </div>
            <h3 className="font-display text-2xl text-white font-normal">
              Your lookbook is empty
            </h3>
            <p className="text-sm text-white/70 font-ui">
              Create your first virtual drape and save it here to compare fabrics, share with family, or book with our master tailor.
            </p>
            <button
              type="button"
              onClick={() => {
                setTryOnStep('photo');
                setCurrentScreen('W6');
              }}
              className="px-8 py-3.5 rounded-full bg-[#EFD2A6] text-[#07222B] font-ui font-bold text-xs uppercase tracking-wider shadow-xl hover:bg-white active:scale-95 transition-all"
            >
              TRY A LOOK
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {savedLooks.map((look) => (
              <div
                key={look.id}
                className="group flex flex-col rounded-3xl bg-[#0C2B35] border border-[#EFD2A6]/25 hover:border-[#EFD2A6]/60 overflow-hidden transition-all shadow-xl font-ui"
              >
                {/* Large Dominant Image */}
                <div className="relative aspect-[3/4] overflow-hidden bg-black/40">
                  <img
                    src={look.imageUrl}
                    alt={look.fabricName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07222B]/80 via-transparent to-black/20" />

                  {/* Garment Tag */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#07222B]/85 backdrop-blur-md border border-[#EFD2A6]/40 text-[11px] font-bold text-[#EFD2A6]">
                    {look.garment}
                  </div>

                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => removeSavedLook(look.id)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-[#07222B]/85 hover:bg-rose-900/80 text-white/60 hover:text-white transition-colors"
                    title="Remove from lookbook"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>

                  {/* Price overlay on image bottom */}
                  <div className="absolute bottom-3 inset-x-3 p-3 rounded-2xl bg-[#07222B]/90 backdrop-blur-md border border-white/10 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-white/50 uppercase tracking-wider">Estimated Total</p>
                      <p className="text-sm font-bold text-[#EFD2A6]">₹{look.estimatedCost.toLocaleString()}</p>
                    </div>
                    <span className="text-xs text-white/80 font-mono">{look.metres} mtrs</span>
                  </div>
                </div>

                {/* Card Meta & Action CTAs */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="font-display text-base font-bold text-white group-hover:text-[#EFD2A6] transition-colors truncate">
                      {look.fabricName}
                    </h3>
                    <p className="text-xs text-white/60 mt-0.5">
                      {look.occasion || 'Celebration'} · Saved {look.date}
                    </p>
                  </div>

                  {/* Card Actions: Share & Inquire */}
                  <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => setActiveShareLook(look)}
                      className="py-2.5 px-3 rounded-xl border border-white/20 hover:border-[#EFD2A6] text-white hover:text-[#EFD2A6] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Share</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveInquireLook(look)}
                      className="py-2.5 px-3 rounded-xl bg-[#EFD2A6] hover:bg-white text-[#07222B] text-xs font-bold uppercase tracking-wider shadow-md transition-all text-center"
                    >
                      Inquire
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Share Single Look Modal */}
      {activeShareLook && (
        <ShareModal
          isOpen={true}
          onClose={() => setActiveShareLook(null)}
          title="Share Saved Look"
          lookTitle={`${activeShareLook.fabricName} (${activeShareLook.garment} · ${activeShareLook.metres}m)`}
        />
      )}

      {/* Share All Modal */}
      {shareAllOpen && (
        <ShareModal
          isOpen={true}
          onClose={() => setShareAllOpen(false)}
          title="Share Entire Lookbook Collection"
          lookTitle={`Padavala Lookbook: ${savedLooks.length} Saved Bespoke Drapes`}
        />
      )}

      {/* Inquire Modal */}
      {activeInquireLook && (
        <InquiryModal
          isOpen={true}
          onClose={() => setActiveInquireLook(null)}
          fabric={
            FABRIC_CATALOG.find((f) => f.id === activeInquireLook.fabricId) ||
            FABRIC_CATALOG[0]
          }
          garment={activeInquireLook.garment}
          metres={activeInquireLook.metres}
          totalCost={activeInquireLook.estimatedCost}
        />
      )}
    </div>
  );
};
