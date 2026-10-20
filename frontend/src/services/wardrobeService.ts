import type { ClothingItem, Outfit, Category, Season, Occasion } from '../types';
export type ClothingInput = Omit<ClothingItem, 'id'>;
export interface WardrobeService {
  listClothing(): Promise<ClothingItem[]>;
  addClothing(item: ClothingInput): Promise<ClothingItem>;
  deleteClothing(id: number): Promise<void>;
  listOutfits(): Promise<Outfit[]>;
  addOutfit(input: Omit<Outfit, 'id'>): Promise<Outfit>;
  generate(occasion?: Occasion, season?: Season): Promise<{ clothing_item_ids: number[]; explanation: string }[]>;
}
const API = import.meta.env.VITE_API_URL || 'http://localhost:8000';
async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API}${path}`, { ...init, headers: { 'Content-Type': 'application/json', ...(init?.headers || {}) } });
  if (!response.ok) { const body = await response.json().catch(() => ({})); throw new Error(body.detail || `Request failed (${response.status})`); }
  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}
export const httpWardrobeService: WardrobeService = {
  listClothing: () => request('/api/clothing'),
  addClothing: (item) => request('/api/clothing', { method: 'POST', body: JSON.stringify(item) }),
  deleteClothing: (id) => request(`/api/clothing/${id}`, { method: 'DELETE' }),
  listOutfits: () => request('/api/outfits'),
  addOutfit: (input) => request('/api/outfits', { method: 'POST', body: JSON.stringify(input) }),
  generate: (occasion, season) => request('/api/outfits/generate', { method: 'POST', body: JSON.stringify({ occasion, season, limit: 5 }) }),
};
const initial: ClothingItem[] = [
  { id: 1, name: 'Classic White Shirt', category: 'top', color: 'white', season: 'all-season', occasions: ['university', 'casual'], image_url: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600' },
  { id: 2, name: 'Straight Blue Jeans', category: 'bottom', color: 'blue', season: 'all-season', occasions: ['university', 'casual'], image_url: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600' },
  { id: 3, name: 'Everyday Sneakers', category: 'shoes', color: 'white', season: 'spring', occasions: ['casual', 'university'], image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600' },
  { id: 4, name: 'Soft Beige Knit', category: 'top', color: 'beige', season: 'autumn', occasions: ['casual', 'university'], image_url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600' },
];
let mockClothing = [...initial]; let mockOutfits: Outfit[] = []; let nextId = 5; let nextOutfitId = 1;
export const mockWardrobeService: WardrobeService = {
  async listClothing() { return [...mockClothing]; },
  async addClothing(item) { const created = { ...item, id: nextId++ }; mockClothing = [created, ...mockClothing]; return created; },
  async deleteClothing(id) { mockClothing = mockClothing.filter(item => item.id !== id); },
  async listOutfits() { return [...mockOutfits]; },
  async addOutfit(input) { const created = { ...input, id: nextOutfitId++ }; mockOutfits = [created, ...mockOutfits]; return created; },
  async generate(occasion, season) {
    const items = mockClothing.filter(i => (!occasion || i.occasions.includes(occasion)) && (!season || i.season === season || i.season === 'all-season'));
    const tops = items.filter(i => i.category === 'top'), bottoms = items.filter(i => i.category === 'bottom'), shoes = items.filter(i => i.category === 'shoes');
    return tops.flatMap(t => bottoms.flatMap(b => shoes.map(s => ({ clothing_item_ids: [t.id, b.id, s.id], explanation: `A ${t.color}, ${b.color}, and ${s.color} combination for ${occasion || 'everyday'} wear.` })))).slice(0, 5);
  }
};
