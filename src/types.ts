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
