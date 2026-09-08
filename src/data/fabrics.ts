import { Fabric, GarmentStyle } from '../types';

export const FABRIC_CATALOG: Fabric[] = [
  {
    id: 'kanjivaram-silk',
    name: 'Kanjivaram Silk',
    category: 'Saree',
    rating: 4.8,
    pricePerMetre: 850,
    inStock: true,
    type: 'Pure Mulberry Silk',
    weight: 'Heavy',
    occasion: 'Wedding & Grand Gala',
    colors: 'Crimson Red · Antique Gold Zari border',
    description: 'Woven in the temple town of Kanchipuram with pure mulberry silk threads and twisted gold zari. Celebrated for its opulent pallu and majestic fall.',
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop',
    patternDetailUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1200&auto=format&fit=crop',
    tryOnPreviewUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000&auto=format&fit=crop',
    defaultGarment: 'Saree',
    availableStyles: ['Saree', 'Lehenga', 'Anarkali'],
  },
  {
    id: 'banarasi-brocade',
    name: 'Banarasi Brocade',
    category: 'Lehenga',
    rating: 4.9,
    pricePerMetre: 1200,
    inStock: true,
    type: 'Katan Silk Brocade',
    weight: 'Heavy',
    occasion: 'Wedding & Sangeet',
    colors: 'Royal Emerald Green · Intricate Silver Zari',
    description: 'A masterpiece from Varanasi featuring kadwa weave with floral meenakari motifs and rich handloom craftsmanship designed for royal wedding ceremonies.',
    imageUrl: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1000&auto=format&fit=crop',
    patternDetailUrl: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1200&auto=format&fit=crop',
    tryOnPreviewUrl: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1000&auto=format&fit=crop',
    defaultGarment: 'Lehenga',
    availableStyles: ['Lehenga', 'Saree', 'Sherwani'],
  },
  {
    id: 'pure-georgette',
    name: 'Pure Georgette',
    category: 'Salwar',
    rating: 4.5,
    pricePerMetre: 420,
    inStock: true,
    type: 'Crepe Silk Georgette',
    weight: 'Light',
    occasion: 'Party & Festive Evening',
    colors: 'Dusty Rose · Subtle Gota Foil',
    description: 'Airy, floaty fabric with distinctive grainy texture and fluid movement. Ideal for dramatic flares, cascading anarkalis, and breezy festive drapes.',
    imageUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1000&auto=format&fit=crop',
    patternDetailUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1200&auto=format&fit=crop',
    tryOnPreviewUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1000&auto=format&fit=crop',
    defaultGarment: 'Salwar',
    availableStyles: ['Salwar', 'Anarkali', 'Kurti'],
  },
  {
    id: 'chanderi-tissue',
    name: 'Chanderi Tissue',
    category: 'Kurti',
    rating: 4.7,
    pricePerMetre: 680,
    inStock: true,
    type: 'Silk Cotton Tissue Blend',
    weight: 'Medium',
    occasion: 'Festival & Reception',
    colors: 'Champagne Gold · Ivory Highlights',
    description: 'Centuries-old Madhya Pradesh weave shimmering with metallic gossamer threads. Light as a feather yet structured enough for elegant regal tunics.',
    imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1000&auto=format&fit=crop',
    patternDetailUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop',
    tryOnPreviewUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=1000&auto=format&fit=crop',
    defaultGarment: 'Kurti',
    availableStyles: ['Kurti', 'Saree', 'Lehenga'],
  },
  {
    id: 'raw-mulberry-silk',
    name: 'Raw Mulberry Silk',
    category: 'Sherwani',
    rating: 4.6,
    pricePerMetre: 950,
    inStock: true,
    type: 'Raw Dupioni Silk',
    weight: 'Heavy',
    occasion: 'Royal Wedding & Reception',
    colors: 'Ivory Cream · Golden Slub Texture',
    description: 'Crisp hand-spun silk with natural slubs and rich organic luster. Highly favored for structured bespoke achkans, royal sherwanis, and bundis.',
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1000&auto=format&fit=crop',
    patternDetailUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1200&auto=format&fit=crop',
    tryOnPreviewUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop',
    defaultGarment: 'Sherwani',
    availableStyles: ['Sherwani', 'Kurta'],
  },
  {
    id: 'fine-linen-cotton',
    name: 'Organic Khadi Linen',
    category: 'Kurta',
    rating: 4.4,
    pricePerMetre: 380,
    inStock: true,
    type: 'Handloom Cotton Linen',
    weight: 'Medium',
    occasion: 'Office & Casual Festive',
    colors: 'Natural Indigo · Fine Herringbone',
    description: 'Breathable artisanal weave made from natural fibers. Softens with every wear, providing supreme comfort in tropical climates with understated elegance.',
    imageUrl: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1000&auto=format&fit=crop',
    patternDetailUrl: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1200&auto=format&fit=crop',
    tryOnPreviewUrl: 'https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?q=80&w=1000&auto=format&fit=crop',
    defaultGarment: 'Kurta',
    availableStyles: ['Kurta', 'Casual'],
  },
  {
    id: 'micro-velvet-embroidered',
    name: 'Royal Micro Velvet',
    category: 'Lehenga',
    rating: 4.9,
    pricePerMetre: 1450,
    inStock: true,
    type: 'Plush Micro Velvet 9000',
    weight: 'Heavy',
    occasion: 'Winter Wedding & Sangeet',
    colors: 'Deep Wine Burgundy · Marodi Work',
    description: 'Ultra-soft deep pile velvet engineered for rich fall and dramatic spotlight shimmer. Embellished with subtle antique marodi and zardozi threadwork.',
    imageUrl: 'https://images.unsplash.com/photo-1528458909336-e7a0adfed0a5?q=80&w=1000&auto=format&fit=crop',
    patternDetailUrl: 'https://images.unsplash.com/photo-1528458909336-e7a0adfed0a5?q=80&w=1200&auto=format&fit=crop',
    tryOnPreviewUrl: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=1000&auto=format&fit=crop',
    defaultGarment: 'Lehenga',
    availableStyles: ['Lehenga', 'Sherwani'],
  },
  {
    id: 'jamdani-muslin',
    name: 'Dhakai Jamdani',
    category: 'Saree',
    rating: 4.8,
    pricePerMetre: 920,
    inStock: false,
    type: 'Featherweight Muslin Cotton',
    weight: 'Light',
    occasion: 'Heritage & Morning Rituals',
    colors: 'Pristine White · Gold Panna Motifs',
    description: 'UNESCO intangible cultural heritage handloom, woven thread by thread with discontinuous weft technique for floating ornamental patterns on sheer muslin.',
    imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1000&auto=format&fit=crop',
    patternDetailUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1200&auto=format&fit=crop',
    tryOnPreviewUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1000&auto=format&fit=crop',
    defaultGarment: 'Saree',
    availableStyles: ['Saree', 'Kurti'],
  }
];

export interface FabricMeterageBreakdown {
  components: { name: string; metres: number }[];
  totalMetres: number;
  totalCost: number;
}

export function calculateFabricRequirement(
  fabric: Fabric,
  garment: GarmentStyle,
  heightFeet: number = 5.4,
  bodyType: string = 'regular'
): FabricMeterageBreakdown {
  const heightMultiplier = heightFeet > 5.8 ? 1.1 : heightFeet < 5.1 ? 0.95 : 1.0;
  const sizeMultiplier = bodyType === 'plus' ? 1.15 : bodyType === 'slim' ? 0.95 : 1.0;

  let components: { name: string; metres: number }[] = [];

  switch (garment) {
    case 'Saree':
      components = [
        { name: 'Saree body & pallu', metres: Number((6.0 * heightMultiplier).toFixed(1)) },
        { name: 'Blouse fabric', metres: Number((1.0 * sizeMultiplier).toFixed(1)) },
      ];
      break;
    case 'Lehenga':
      components = [
        { name: 'Lehenga Ghagra flare', metres: Number((5.0 * heightMultiplier).toFixed(1)) },
        { name: 'Choli / Blouse', metres: Number((1.2 * sizeMultiplier).toFixed(1)) },
        { name: 'Dupatta fabric', metres: 2.5 },
      ];
      break;
    case 'Sherwani':
      components = [
        { name: 'Royal Achkan Coat', metres: Number((3.5 * heightMultiplier).toFixed(1)) },
        { name: 'Churidar / Trouser', metres: Number((2.5 * heightMultiplier).toFixed(1)) },
      ];
      break;
    case 'Salwar':
      components = [
        { name: 'Kameez Top', metres: Number((2.5 * heightMultiplier).toFixed(1)) },
        { name: 'Salwar Bottom', metres: Number((2.5 * heightMultiplier).toFixed(1)) },
        { name: 'Dupatta', metres: 2.2 },
      ];
      break;
    case 'Kurti':
      components = [
        { name: 'Kurti Tunics', metres: Number((2.8 * heightMultiplier).toFixed(1)) },
        { name: 'Pant / Plazo lining', metres: Number((2.2 * sizeMultiplier).toFixed(1)) },
      ];
      break;
    case 'Kurta':
      components = [
        { name: 'Kurta', metres: Number((3.0 * heightMultiplier).toFixed(1)) },
        { name: 'Pyjama / Dhoti', metres: Number((2.2 * heightMultiplier).toFixed(1)) },
      ];
      break;
    case 'Anarkali':
    default:
      components = [
        { name: 'Flared Kalis (Gown)', metres: Number((5.5 * heightMultiplier).toFixed(1)) },
        { name: 'Bodice & Sleeves', metres: Number((1.2 * sizeMultiplier).toFixed(1)) },
        { name: 'Dupatta', metres: 2.5 },
      ];
      break;
  }

  const totalMetres = Number(components.reduce((acc, c) => acc + c.metres, 0).toFixed(1));
  const totalCost = Math.round(totalMetres * fabric.pricePerMetre);

  return {
    components,
    totalMetres,
    totalCost,
  };
}
