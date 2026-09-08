import React, { useState } from 'react';
import { X, CheckCircle2, Phone, Calendar, MapPin, Scissors } from 'lucide-react';
import { Fabric, GarmentStyle } from '../../types';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  fabric: Fabric | null;
  garment: GarmentStyle;
  metres: number;
  totalCost: number;
  customerName?: string;
  customerPhone?: string;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  fabric,
  garment,
  metres,
  totalCost,
  customerName = 'Ananya Sharma',
  customerPhone = '+91 98450 12345',
}) => {
  const [name, setName] = useState(customerName);
  const [phone, setPhone] = useState(customerPhone);
  const [showroom, setShowroom] = useState('Hyderabad Jubilee Hills Flagship');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn select-none font-ui">
      <div className="w-full max-w-lg bg-[#0C2B35] rounded-3xl border border-[#EFD2A6]/40 shadow-2xl p-6 sm:p-8 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full text-white/60 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#EFD2A6]/20 border border-[#EFD2A6] flex items-center justify-center mx-auto text-[#EFD2A6]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-display text-2xl text-white font-normal">
              Inquiry Reserved!
            </h3>
            <p className="text-sm text-white/80 max-w-sm mx-auto">
              Our Master Tailor at <span className="text-[#EFD2A6] font-semibold">{showroom}</span> has received your virtual try-on drape and measurements. We will connect via WhatsApp within 2 hours.
            </p>
            <div className="p-4 rounded-2xl bg-[#07222B] border border-[#EFD2A6]/20 text-xs text-left space-y-1">
              <p><span className="text-white/50">Reference ID:</span> <span className="text-[#EFD2A6] font-bold">PDV-{Math.floor(100000 + Math.random() * 900000)}</span></p>
              <p><span className="text-white/50">Fabric:</span> <span className="text-white">{fabric?.name} ({metres}m)</span></p>
              <p><span className="text-white/50">Estimated:</span> <span className="text-white">₹{totalCost.toLocaleString()}</span></p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 rounded-full bg-[#EFD2A6] text-[#07222B] font-bold text-xs uppercase tracking-wider"
            >
              Done
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFD2A6]/10 text-[#EFD2A6] text-xs font-semibold mb-2">
                <Scissors className="w-3.5 h-3.5" />
                <span>Master Tailor Direct Consultation</span>
              </div>
              <h3 className="font-display text-2xl text-white font-normal">
                Reserve This Look
              </h3>
              <p className="text-xs text-white/60 mt-0.5">
                Lock in this fabric cut and book a bespoke fitting session at Padavala.
              </p>
            </div>

            {/* Look Summary */}
            <div className="p-3.5 rounded-2xl bg-[#07222B] border border-[#EFD2A6]/20 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-white">{fabric?.name}</p>
                <p className="text-white/60">{garment} · {metres} metres</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-white/50">Est. Total</p>
                <p className="font-bold text-[#EFD2A6] text-sm">₹{totalCost.toLocaleString()}</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-white/70 uppercase tracking-wider font-semibold mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl bg-[#07222B] border border-[#EFD2A6]/30 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-white/70 uppercase tracking-wider font-semibold mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl bg-[#07222B] border border-[#EFD2A6]/30 text-white text-sm"
                />
              </div>

              <div>
                <label className="block text-white/70 uppercase tracking-wider font-semibold mb-1">
                  Preferred Showroom Location
                </label>
                <select
                  value={showroom}
                  onChange={(e) => setShowroom(e.target.value)}
                  className="w-full h-11 px-3.5 rounded-xl bg-[#07222B] border border-[#EFD2A6]/30 text-white text-sm"
                >
                  <option value="Hyderabad Jubilee Hills Flagship">Hyderabad — Jubilee Hills Flagship</option>
                  <option value="Vijayawada MG Road Center">Vijayawada — MG Road Experience Center</option>
                  <option value="Bangalore Indiranagar Lounge">Bangalore — Indiranagar Couture Lounge</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full h-12 rounded-full bg-gradient-to-r from-[#EFD2A6] via-[#F8EAD3] to-[#EFD2A6] text-[#07222B] font-bold text-xs uppercase tracking-wider shadow-lg hover:bg-white active:scale-95 transition-all mt-2"
              >
                CONFIRM SHOWROOM RESERVATION
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
