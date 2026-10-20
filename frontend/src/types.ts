export type Category = 'top' | 'bottom' | 'shoes' | 'accessory' | 'outerwear';
export type Season = 'spring' | 'summer' | 'autumn' | 'winter' | 'all-season';
export type Occasion = 'casual' | 'university' | 'work' | 'formal' | 'party';
export interface ClothingItem { id: number; name: string; category: Category; color: string; season: Season; occasions: Occasion[]; image_url?: string | null; }
export interface Outfit { id: number; name: string; occasion: Occasion; season: Season; clothing_item_ids: number[]; }
