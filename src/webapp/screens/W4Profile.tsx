import React, { useState } from 'react';
import { useWebApp } from '../WebAppContext';
import {
  User,
  Ruler,
  Heart,
  Calendar,
  LogOut,
  Edit2,
  Check,
  ArrowRight,
  Phone,
  Mail,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { ClothingSize, BodyType } from '../../types';

export const W4Profile: React.FC = () => {
  const { user, updateProfile, savedLooks, setCurrentScreen, logout } = useWebApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'measurements' | 'looks' | 'inquiries'>('overview');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingMeasurements, setIsEditingMeasurements] = useState(false);

  // Form states
  const [name, setName] = useState(user?.fullName || 'Ananya Sharma');
  const [phone, setPhone] = useState(user?.phone || '+91 98450 12345');
  const [email, setEmail] = useState(user?.email || 'ananya.sharma@example.com');
  const [heightFt, setHeightFt] = useState(user?.heightFeet || 5);
  const [heightIn, setHeightIn] = useState(user?.heightInches || 4);
  const [size, setSize] = useState<ClothingSize>(user?.size || 'M');
  const [bodyType, setBodyType] = useState<BodyType>(user?.bodyType || 'regular');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      fullName: name,
      phone,
      email,
    });
    setIsEditingProfile(false);
  };

  const handleSaveMeasurements = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      heightFeet: heightFt,
      heightInches: heightIn,
      size,
      bodyType,
    });
    setIsEditingMeasurements(false);
  };

  // Sample inquiries
  const inquiries = [
    {
      id: 'INQ-9021',
      fabric: 'Kanjivaram Temple Silk',
      style: 'Saree with heavy zari pallu',
      status: 'Ready for Fitting',
      date: '10 Sep 2026',
      showroom: 'Hyderabad Jubilee Hills Flagship',
    },
    {
      id: 'INQ-8840',
      fabric: 'Banarasi Brocade',
      style: 'Bridal Lehenga Choli',
      status: 'Master Tailor Assigned',
      date: '05 Sep 2026',
      showroom: 'Vijayawada MG Road Center',
    },
  ];

  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-[#07222B] text-white select-none py-8 sm:py-12">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-8">
        {/* Desktop Sidebar + Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sidebar (240px equivalent) */}
          <div className="lg:col-span-3 bg-[#0C2B35] rounded-3xl border border-[#EFD2A6]/25 p-5 sm:p-6 space-y-6 shadow-xl">
            {/* Patron Summary */}
            <div className="flex items-center gap-3.5 pb-5 border-b border-white/10">
              <img
                src={user?.avatarUrl || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop'}
                alt={user?.fullName}
                className="w-12 h-12 rounded-full object-cover border-2 border-[#EFD2A6]"
              />
              <div className="min-w-0">
                <h3 className="font-display text-base font-bold text-white truncate">
                  {user?.fullName || 'Patron'}
                </h3>
                <span className="text-[11px] text-[#EFD2A6] font-ui flex items-center gap-1 font-semibold">
                  <ShieldCheck className="w-3 h-3 text-[#EFD2A6]" />
                  <span>Padavala Club Elite</span>
                </span>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="space-y-1.5 font-ui text-xs sm:text-sm font-semibold">
              <button
                type="button"
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors ${
                  activeTab === 'overview'
                    ? 'bg-[#EFD2A6] text-[#07222B]'
                    : 'text-white/80 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <User className="w-4 h-4" />
                  <span>My Profile</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('measurements')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors ${
                  activeTab === 'measurements'
                    ? 'bg-[#EFD2A6] text-[#07222B]'
                    : 'text-white/80 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Ruler className="w-4 h-4" />
                  <span>My Measurements</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('looks')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors ${
                  activeTab === 'looks'
                    ? 'bg-[#EFD2A6] text-[#07222B]'
                    : 'text-white/80 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Heart className="w-4 h-4" />
                  <span>My Lookbook</span>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#07222B] text-[#EFD2A6]">
                  {savedLooks.length}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('inquiries')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-colors ${
                  activeTab === 'inquiries'
                    ? 'bg-[#EFD2A6] text-[#07222B]'
                    : 'text-white/80 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4" />
                  <span>Showroom Inquiries</span>
                </div>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#07222B] text-[#EFD2A6]">
                  {inquiries.length}
                </span>
              </button>
            </nav>

            <div className="pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={logout}
                className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-rose-300 hover:bg-rose-950/40 text-xs sm:text-sm font-semibold transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Right Main Content Area */}
          <div className="lg:col-span-9 space-y-8">
            {/* 1. MY PROFILE CARD */}
            <div className="bg-[#0C2B35] rounded-3xl border border-[#EFD2A6]/25 p-6 sm:p-8 shadow-xl">
              <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                <div>
                  <h3 className="font-display text-2xl text-white font-normal">
                    Personal Profile
                  </h3>
                  <p className="text-xs sm:text-sm text-white/60 font-ui mt-0.5">
                    Your contact information and showroom preferences
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsEditingProfile(!isEditingProfile)}
                  className="px-4 py-2 rounded-full border border-[#EFD2A6]/40 text-[#EFD2A6] hover:bg-[#EFD2A6] hover:text-[#07222B] text-xs font-bold font-ui uppercase tracking-wider transition-all flex items-center gap-1.5"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>{isEditingProfile ? 'Cancel' : 'Edit Profile'}</span>
                </button>
              </div>

              {isEditingProfile ? (
                <form onSubmit={handleSaveProfile} className="space-y-4 font-ui">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#EFD2A6] font-semibold mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full h-11 px-3.5 rounded-xl bg-[#07222B] border border-[#EFD2A6]/30 text-white text-sm focus:border-[#EFD2A6] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#EFD2A6] font-semibold mb-1">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full h-11 px-3.5 rounded-xl bg-[#07222B] border border-[#EFD2A6]/30 text-white text-sm focus:border-[#EFD2A6] focus:outline-none"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs uppercase tracking-wider text-[#EFD2A6] font-semibold mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-11 px-3.5 rounded-xl bg-[#07222B] border border-[#EFD2A6]/30 text-white text-sm focus:border-[#EFD2A6] focus:outline-none"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-[#EFD2A6] text-[#07222B] font-bold text-xs uppercase tracking-wider"
                  >
                    Save Changes
                  </button>
                </form>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-ui">
                  <div>
                    <span className="text-xs text-white/50 uppercase tracking-wider font-semibold">Full Name</span>
                    <p className="text-base font-bold text-white mt-1">{user?.fullName}</p>
                  </div>
                  <div>
                    <span className="text-xs text-white/50 uppercase tracking-wider font-semibold">Phone Number</span>
                    <p className="text-base font-bold text-white mt-1">{user?.phone}</p>
                  </div>
                  <div>
                    <span className="text-xs text-white/50 uppercase tracking-wider font-semibold">Email</span>
                    <p className="text-base font-bold text-white mt-1 truncate">{user?.email || 'Not provided'}</p>
                  </div>
                </div>
              )}
            </div>

            {/* 2. MY MEASUREMENTS CARD */}
            <div className="bg-[#0C2B35] rounded-3xl border border-[#EFD2A6]/25 p-6 sm:p-8 shadow-xl">
              <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                <div>
                  <h3 className="font-display text-2xl text-white font-normal">
                    My Measurements
                  </h3>
                  <p className="text-xs sm:text-sm text-white/60 font-ui mt-0.5">
                    Used to calculate exact fabric meterage and tailor fall
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsEditingMeasurements(!isEditingMeasurements)}
                  className="px-4 py-2 rounded-full border border-[#EFD2A6]/40 text-[#EFD2A6] hover:bg-[#EFD2A6] hover:text-[#07222B] text-xs font-bold font-ui uppercase tracking-wider transition-all flex items-center gap-1.5"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  <span>{isEditingMeasurements ? 'Cancel' : 'Edit'}</span>
                </button>
              </div>

              {isEditingMeasurements ? (
                <form onSubmit={handleSaveMeasurements} className="space-y-4 font-ui">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#EFD2A6] font-semibold mb-1">
                        Height (Feet & Inches)
                      </label>
                      <div className="flex gap-2">
                        <select
                          value={heightFt}
                          onChange={(e) => setHeightFt(Number(e.target.value))}
                          className="h-11 px-3 rounded-xl bg-[#07222B] border border-[#EFD2A6]/30 text-white text-sm"
                        >
                          {[4, 5, 6].map((f) => (
                            <option key={f} value={f}>{f} ft</option>
                          ))}
                        </select>
                        <select
                          value={heightIn}
                          onChange={(e) => setHeightIn(Number(e.target.value))}
                          className="h-11 px-3 rounded-xl bg-[#07222B] border border-[#EFD2A6]/30 text-white text-sm"
                        >
                          {Array.from({ length: 12 }, (_, i) => i).map((i) => (
                            <option key={i} value={i}>{i} in</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#EFD2A6] font-semibold mb-1">
                        Size
                      </label>
                      <select
                        value={size}
                        onChange={(e) => setSize(e.target.value as ClothingSize)}
                        className="w-full h-11 px-3 rounded-xl bg-[#07222B] border border-[#EFD2A6]/30 text-white text-sm"
                      >
                        {['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'].map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-[#EFD2A6] font-semibold mb-1">
                        Body Type
                      </label>
                      <select
                        value={bodyType}
                        onChange={(e) => setBodyType(e.target.value as BodyType)}
                        className="w-full h-11 px-3 rounded-xl bg-[#07222B] border border-[#EFD2A6]/30 text-white text-sm"
                      >
                        <option value="slim">Slim</option>
                        <option value="regular">Regular</option>
                        <option value="plus">Plus</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-[#EFD2A6] text-[#07222B] font-bold text-xs uppercase tracking-wider"
                  >
                    Save Measurements
                  </button>
                </form>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-2xl bg-[#07222B] border border-[#EFD2A6]/20">
                    <span className="text-xs text-white/50 uppercase tracking-wider font-semibold font-ui">Height</span>
                    <p className="text-xl sm:text-2xl font-display font-bold text-[#EFD2A6] mt-1">
                      {user?.heightFeet}'{user?.heightInches}"
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#07222B] border border-[#EFD2A6]/20">
                    <span className="text-xs text-white/50 uppercase tracking-wider font-semibold font-ui">Clothing Size</span>
                    <p className="text-xl sm:text-2xl font-display font-bold text-[#EFD2A6] mt-1">
                      {user?.size}
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#07222B] border border-[#EFD2A6]/20">
                    <span className="text-xs text-white/50 uppercase tracking-wider font-semibold font-ui">Body Type</span>
                    <p className="text-xl sm:text-2xl font-display font-bold text-[#EFD2A6] mt-1 capitalize">
                      {user?.bodyType}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* 3. MY SAVED LOOKS (3) */}
            <div className="bg-[#0C2B35] rounded-3xl border border-[#EFD2A6]/25 p-6 sm:p-8 shadow-xl">
              <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                <div>
                  <h3 className="font-display text-2xl text-white font-normal">
                    My Saved Looks ({savedLooks.length})
                  </h3>
                  <p className="text-xs sm:text-sm text-white/60 font-ui mt-0.5">
                    Your personal AI virtual styling renders
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentScreen('W7')}
                  className="text-xs font-bold font-ui text-[#EFD2A6] hover:text-white uppercase tracking-wider flex items-center gap-1"
                >
                  <span>View All In Lookbook</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {savedLooks.slice(0, 3).map((look) => (
                  <div
                    key={look.id}
                    onClick={() => setCurrentScreen('W7')}
                    className="group rounded-2xl bg-[#07222B] border border-[#EFD2A6]/20 overflow-hidden cursor-pointer hover:border-[#EFD2A6]/60 transition-all shadow-md"
                  >
                    <div className="aspect-[3/4] overflow-hidden">
                      <img
                        src={look.imageUrl}
                        alt={look.fabricName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="p-3.5 font-ui">
                      <h4 className="font-display text-sm font-bold text-white truncate">{look.fabricName}</h4>
                      <p className="text-xs text-white/60">{look.garment} · {look.metres}m</p>
                      <p className="text-xs font-bold text-[#EFD2A6] mt-1">₹{look.estimatedCost.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. MY INQUIRIES (2) */}
            <div className="bg-[#0C2B35] rounded-3xl border border-[#EFD2A6]/25 p-6 sm:p-8 shadow-xl">
              <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                <div>
                  <h3 className="font-display text-2xl text-white font-normal">
                    Showroom Inquiries ({inquiries.length})
                  </h3>
                  <p className="text-xs sm:text-sm text-white/60 font-ui mt-0.5">
                    Appointments and master tailor consultations
                  </p>
                </div>
              </div>

              <div className="space-y-4 font-ui">
                {inquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className="p-4 rounded-2xl bg-[#07222B] border border-[#EFD2A6]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-[#EFD2A6]">{inq.id}</span>
                        <span className="text-xs text-white/40">·</span>
                        <span className="text-xs text-white/60">{inq.date}</span>
                      </div>
                      <h4 className="font-display text-base font-bold text-white">{inq.fabric}</h4>
                      <p className="text-xs text-white/70">{inq.style} · {inq.showroom}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold">
                        {inq.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
