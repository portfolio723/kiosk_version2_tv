import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  WebAppScreen,
  TryOnStep,
  UserProfile,
  SavedLookItem,
  Fabric,
  GarmentStyle,
  BodyType,
  ClothingSize,
  Gender,
  Occasion,
  StylePreference,
} from '../types';
import { FABRIC_CATALOG } from '../data/fabrics';

export interface WebAppContextType {
  currentScreen: WebAppScreen;
  setCurrentScreen: (screen: WebAppScreen) => void;
  user: UserProfile | null;
  isAuthenticated: boolean;
  savedLooks: SavedLookItem[];
  // Try-on state
  tryOnStep: TryOnStep;
  setTryOnStep: (step: TryOnStep) => void;
  photoUrl: string | null;
  setPhotoUrl: (url: string | null) => void;
  heightFeet: number;
  heightInches: number;
  setHeight: (feet: number, inches: number) => void;
  bodyType: BodyType;
  setBodyType: (b: BodyType) => void;
  size: ClothingSize;
  setSize: (s: ClothingSize) => void;
  gender: Gender;
  setGender: (g: Gender) => void;
  occasions: Occasion[];
  toggleOccasion: (occ: Occasion) => void;
  stylePreference: StylePreference;
  setStylePreference: (s: StylePreference) => void;
  supportingCloth: boolean;
  setSupportingCloth: (val: boolean) => void;
  lookDescription: string;
  setLookDescription: (desc: string) => void;
  selectedFabric: Fabric | null;
  setSelectedFabric: (f: Fabric | null) => void;
  selectedGarment: GarmentStyle;
  setSelectedGarment: (g: GarmentStyle) => void;
  // Actions
  login: (userData: Partial<UserProfile>) => void;
  signUp: (userData: Partial<UserProfile>) => void;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;
  saveLook: (look: Omit<SavedLookItem, 'id' | 'date'>) => void;
  removeSavedLook: (id: string) => void;
  startTryOnWithFabric: (fabric: Fabric) => void;
  resetTryOn: () => void;
}

const INITIAL_USER: UserProfile = {
  id: 'usr-padavala-01',
  fullName: 'Ananya Sharma',
  phone: '+91 98450 12345',
  email: 'ananya.sharma@example.com',
  avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop',
  heightFeet: 5,
  heightInches: 4,
  size: 'M',
  bodyType: 'regular',
  gender: 'women',
  inquiriesCount: 2,
};

const INITIAL_LOOKS: SavedLookItem[] = [
  {
    id: 'look-1',
    fabricId: 'kanjivaram-silk',
    fabricName: 'Kanjivaram Silk',
    garment: 'Saree',
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop',
    metres: 7.5,
    estimatedCost: 6375,
    date: '12 Sep 2026',
    occasion: 'Wedding Gala',
  },
  {
    id: 'look-2',
    fabricId: 'banarasi-brocade',
    fabricName: 'Banarasi Brocade',
    garment: 'Lehenga',
    imageUrl: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1000&auto=format&fit=crop',
    metres: 5.0,
    estimatedCost: 4200,
    date: '08 Sep 2026',
    occasion: 'Diwali Sangeet',
  },
  {
    id: 'look-3',
    fabricId: 'pure-georgette',
    fabricName: 'Pure Georgette',
    garment: 'Salwar',
    imageUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1000&auto=format&fit=crop',
    metres: 6.0,
    estimatedCost: 2800,
    date: '01 Sep 2026',
    occasion: 'Festive Reception',
  },
];

const WebAppContext = createContext<WebAppContextType | null>(null);

export const WebAppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<WebAppScreen>('W1');
  const [user, setUser] = useState<UserProfile | null>(INITIAL_USER);
  const [savedLooks, setSavedLooks] = useState<SavedLookItem[]>(INITIAL_LOOKS);

  // Try-on state
  const [tryOnStep, setTryOnStep] = useState<TryOnStep>('photo');
  const [photoUrl, setPhotoUrl] = useState<string | null>(
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop'
  );
  const [heightFeet, setHeightFeet] = useState<number>(5);
  const [heightInches, setHeightInches] = useState<number>(4);
  const [bodyType, setBodyType] = useState<BodyType>('regular');
  const [size, setSize] = useState<ClothingSize>('M');
  const [gender, setGender] = useState<Gender>('women');
  const [occasions, setOccasions] = useState<Occasion[]>(['Wedding']);
  const [stylePreference, setStylePreference] = useState<StylePreference>('Royal');
  const [supportingCloth, setSupportingCloth] = useState<boolean>(true);
  const [lookDescription, setLookDescription] = useState<string>('Regal festive ensemble with subtle antique embroidery');
  const [selectedFabric, setSelectedFabric] = useState<Fabric | null>(FABRIC_CATALOG[0]);
  const [selectedGarment, setSelectedGarment] = useState<GarmentStyle>('Saree');

  // Scroll to top on screen change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentScreen, tryOnStep]);

  const setHeight = (feet: number, inches: number) => {
    setHeightFeet(feet);
    setHeightInches(inches);
  };

  const toggleOccasion = (occ: Occasion) => {
    setOccasions((prev) =>
      prev.includes(occ) ? (prev.length > 1 ? prev.filter((o) => o !== occ) : prev) : [...prev, occ]
    );
  };

  const login = (userData: Partial<UserProfile>) => {
    setUser({
      ...INITIAL_USER,
      ...userData,
    });
    setCurrentScreen('W4');
  };

  const signUp = (userData: Partial<UserProfile>) => {
    setUser({
      ...INITIAL_USER,
      ...userData,
    });
    setCurrentScreen('W4');
  };

  const logout = () => {
    setUser(null);
    setCurrentScreen('W1');
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    setUser((prev) => (prev ? { ...prev, ...data } : null));
  };

  const saveLook = (look: Omit<SavedLookItem, 'id' | 'date'>) => {
    const newLook: SavedLookItem = {
      ...look,
      id: 'look-' + Date.now(),
      date: 'Today',
    };
    setSavedLooks((prev) => [newLook, ...prev]);
  };

  const removeSavedLook = (id: string) => {
    setSavedLooks((prev) => prev.filter((l) => l.id !== id));
  };

  const startTryOnWithFabric = (fabric: Fabric) => {
    setSelectedFabric(fabric);
    setSelectedGarment(fabric.defaultGarment);
    setTryOnStep('photo');
    setCurrentScreen('W6');
  };

  const resetTryOn = () => {
    setTryOnStep('photo');
  };

  return (
    <WebAppContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        user,
        isAuthenticated: !!user,
        savedLooks,
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
        login,
        signUp,
        logout,
        updateProfile,
        saveLook,
        removeSavedLook,
        startTryOnWithFabric,
        resetTryOn,
      }}
    >
      {children}
    </WebAppContext.Provider>
  );
};

export const useWebApp = () => {
  const context = useContext(WebAppContext);
  if (!context) {
    throw new Error('useWebApp must be used within a WebAppProvider');
  }
  return context;
};
