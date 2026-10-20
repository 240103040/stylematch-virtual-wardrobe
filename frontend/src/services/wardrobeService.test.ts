import { describe, expect, it } from 'vitest';
import { mockWardrobeService } from './wardrobeService';

describe('mockWardrobeService', () => {
  it('returns initial clothing items', async () => {
    const items = await mockWardrobeService.listClothing();
    expect(items.length).toBeGreaterThan(0);
  });
  it('generates outfit combinations when a top, bottom, and shoes exist', async () => {
    const recs = await mockWardrobeService.generate('casual');
    expect(recs.length).toBeGreaterThan(0);
    expect(recs[0].clothing_item_ids).toHaveLength(3);
  });
});
