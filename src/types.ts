export type KioskScreen =
  | 'K1'
  | 'K2'
  | 'K3'
  | 'K4'
  | 'K5'
  | 'K6'
  | 'K6a'
  | 'K7'
  | 'K8'
  | 'K9'
  | 'K10';

export type WebAppScreen =
  | 'W1' // Homepage / Landing
  | 'W2' // Sign Up
  | 'W3' // Login
  | 'W4' // Profile / Dashboard
  | 'W5' // Catalog Browse
  | 'W6' // Try-On Flow
  | 'W7'; // Lookbook

export type TryOnStep =
  | 'photo'    // W6a
  | 'details'  // W6b
  | 'style'    // W6c
  | 'fabric'   // W6d
  | 'result';  // W6e

export type AppExperienceMode = 'web' | 'kiosk';

export interface UserProfile {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  avatarUrl?: string;
  heightFeet: number;
  heightInches: number;
  size: ClothingSize;
  bodyType: BodyType;
  gender: Gender;
  inquiriesCount: number;
}

export interface SavedLookItem {
  id: string;
  fabricId: string;
  fabricName: string;
  garment: GarmentStyle;
  imageUrl: string;
  metres: number;
  estimatedCost: number;
  date: string;
  occasion?: string;
}

export type KioskMode =
  | 'try_on'
  | 'recreate'
  | 'design'
  | 'upload_cloth';

export type Language = 'en' | 'hi' | 'te';

export type BodyType = 'slim' | 'regular' | 'plus';
export type Gender = 'women' | 'men';
export type ClothingSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | '2XL' | '3XL';

export type Occasion = 'Wedding' | 'Festival' | 'Office' | 'Party' | 'Casual';
export type StylePreference = 'Classic' | 'Bold' | 'Elegant' | 'Playful' | 'Royal';
export type GarmentStyle = 'Saree' | 'Lehenga' | 'Salwar' | 'Kurti' | 'Sherwani' | 'Kurta' | 'Anarkali' | 'Casual';

export interface Fabric {
  id: string;
  name: string;
  category: string;
  rating: number;
  pricePerMetre: number;
  inStock: boolean;
  type: string;
  weight: 'Light' | 'Medium' | 'Heavy';
  occasion: string;
  colors: string;
  description: string;
  imageUrl: string;
  patternDetailUrl: string;
  tryOnPreviewUrl: string;
  defaultGarment: GarmentStyle;
  availableStyles: GarmentStyle[];
}

export interface CustomerSession {
  language: Language;
  mode: KioskMode;
  photoUrl: string | null;
  photoSource: 'camera' | 'upload' | 'sample' | null;
  consentSavePhoto: boolean;
  heightFeet: number;
  heightInches: number;
  heightCm: number;
  heightUnit: 'ft' | 'cm';
  bodyType: BodyType;
  size: ClothingSize;
  gender: Gender;
  occasions: Occasion[];
  stylePreference: StylePreference;
  supportingCloth: boolean;
  lookDescription: string;
  selectedFabric: Fabric | null;
  selectedGarment: GarmentStyle;
  calculatedMetres: number;
  calculatedTotalCost: number;
  // Lead info
  customerName: string;
  customerPhone: string;
  preferredVisitTime: 'Today' | 'Tomorrow' | 'Later';
  specialRequests: string;
  inquirySubmitted: boolean;
  sessionId: string;
}
