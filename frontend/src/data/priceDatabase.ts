/**
 * Ground truth food pricing database for Australian supermarkets.
 * Mirrors backend/app/data/food_database.py — keep both in sync when prices change.
 *
 * IDs are stable and shared with the backend so the frontend can deduplicate
 * items that the model labels differently (e.g. "bean" and "beans" → id 5).
 */

import type { GroceryItem } from '@/types';

export const PRICE_DATABASE: GroceryItem[] = [
  // ── Produce ──────────────────────────────────────────────────────────────
  { id: 1,  name: 'apple (Loose Royal Gala, each)',           category: 'Produce', coles: 1.26,  woolies: 1.26,  aldi: 1.15,  colesRange: '$1.26',  wooliesRange: '$1.26',  aldiRange: '$1.15'  },
  { id: 2,  name: 'asparagus (Fresh bunch)',                   category: 'Produce', coles: 4.70,  woolies: 4.50,  aldi: 3.99,  colesRange: '$4.70',  wooliesRange: '$4.50',  aldiRange: '$3.99'  },
  { id: 3,  name: 'avocado (Hass, each)',                      category: 'Produce', coles: 2.20,  woolies: 2.20,  aldi: 1.50,  colesRange: '$2.20',  wooliesRange: '$2.20',  aldiRange: '$1.50'  },
  { id: 4,  name: 'banana (Cavendish, each)',                  category: 'Produce', coles: 0.85,  woolies: 0.85,  aldi: 0.72,  colesRange: '$0.85',  wooliesRange: '$0.85',  aldiRange: '$0.72'  },
  { id: 5,  name: 'beans (Green Beans, 250g bag)',             category: 'Produce', coles: 2.20,  woolies: 2.10,  aldi: 1.99,  colesRange: '$2.20',  wooliesRange: '$2.10',  aldiRange: '$1.99'  },
  { id: 7,  name: 'bell pepper (Red Capsicum, each)',          category: 'Produce', coles: 1.74,  woolies: 1.70,  aldi: 1.49,  colesRange: '$1.74',  wooliesRange: '$1.70',  aldiRange: '$1.49'  },
  { id: 8,  name: 'blueberries (125g punnet)',                 category: 'Produce', coles: 7.50,  woolies: 7.50,  aldi: 6.99,  colesRange: '$7.50',  wooliesRange: '$7.50',  aldiRange: '$6.99'  },
  { id: 10, name: 'broccoli (Medium head, each)',              category: 'Produce', coles: 1.70,  woolies: 1.65,  aldi: 1.45,  colesRange: '$1.70',  wooliesRange: '$1.65',  aldiRange: '$1.45'  },
  { id: 12, name: 'cabbage (Green Half)',                      category: 'Produce', coles: 2.50,  woolies: 2.50,  aldi: 2.19,  colesRange: '$2.50',  wooliesRange: '$2.50',  aldiRange: '$2.19'  },
  { id: 13, name: 'carrot (Loose, each)',                      category: 'Produce', coles: 0.35,  woolies: 0.35,  aldi: 0.29,  colesRange: '$0.35',  wooliesRange: '$0.35',  aldiRange: '$0.29'  },
  { id: 14, name: 'cauliflower (Whole head)',                  category: 'Produce', coles: 4.50,  woolies: 4.50,  aldi: 3.99,  colesRange: '$4.50',  wooliesRange: '$4.50',  aldiRange: '$3.99'  },
  { id: 18, name: 'corn (Sweet Corn, each)',                   category: 'Produce', coles: 1.50,  woolies: 1.00,  aldi: 0.90,  colesRange: '$1.50',  wooliesRange: '$1.00',  aldiRange: '$0.90'  },
  { id: 19, name: 'cucumber (Continental, each)',              category: 'Produce', coles: 1.80,  woolies: 1.80,  aldi: 1.49,  colesRange: '$1.80',  wooliesRange: '$1.80',  aldiRange: '$1.49'  },
  { id: 20, name: 'dill (Fresh bunch)',                        category: 'Produce', coles: 3.20,  woolies: 3.20,  aldi: 2.69,  colesRange: '$3.20',  wooliesRange: '$3.20',  aldiRange: '$2.69'  },
  { id: 22, name: 'eggplant (each)',                           category: 'Produce', coles: 2.90,  woolies: 2.90,  aldi: 2.49,  colesRange: '$2.90',  wooliesRange: '$2.90',  aldiRange: '$2.49'  },
  { id: 25, name: 'garlic (Loose, approx 60g head)',           category: 'Produce', coles: 2.10,  woolies: 2.10,  aldi: 1.79,  colesRange: '$2.10',  wooliesRange: '$2.10',  aldiRange: '$1.79'  },
  { id: 26, name: 'ginger (Loose, approx 130g piece)',         category: 'Produce', coles: 4.29,  woolies: 4.20,  aldi: 3.50,  colesRange: '$4.29',  wooliesRange: '$4.20',  aldiRange: '$3.50'  },
  { id: 27, name: 'grape (White Seedless, 500g pack)',         category: 'Produce', coles: 4.50,  woolies: 4.50,  aldi: 3.99,  colesRange: '$4.50',  wooliesRange: '$4.50',  aldiRange: '$3.99'  },
  { id: 28, name: 'green bell pepper (Green Capsicum, each)',  category: 'Produce', coles: 1.60,  woolies: 1.60,  aldi: 1.39,  colesRange: '$1.60',  wooliesRange: '$1.60',  aldiRange: '$1.39'  },
  { id: 29, name: 'green chilies (Fresh, per 100g)',           category: 'Produce', coles: 2.50,  woolies: 2.50,  aldi: 2.10,  colesRange: '$2.50',  wooliesRange: '$2.50',  aldiRange: '$2.10'  },
  { id: 32, name: 'kiwi (Green Kiwifruit, each)',              category: 'Produce', coles: 1.00,  woolies: 1.00,  aldi: 0.85,  colesRange: '$1.00',  wooliesRange: '$1.00',  aldiRange: '$0.85'  },
  { id: 33, name: 'leek (each)',                               category: 'Produce', coles: 2.50,  woolies: 2.50,  aldi: 1.99,  colesRange: '$2.50',  wooliesRange: '$2.50',  aldiRange: '$1.99'  },
  { id: 34, name: 'lemon (each)',                              category: 'Produce', coles: 1.50,  woolies: 1.50,  aldi: 1.10,  colesRange: '$1.50',  wooliesRange: '$1.50',  aldiRange: '$1.10'  },
  { id: 35, name: 'lettuce (Iceberg, each)',                   category: 'Produce', coles: 2.90,  woolies: 2.90,  aldi: 2.29,  colesRange: '$2.90',  wooliesRange: '$2.90',  aldiRange: '$2.29'  },
  { id: 36, name: 'lime (each)',                               category: 'Produce', coles: 1.20,  woolies: 1.20,  aldi: 0.95,  colesRange: '$1.20',  wooliesRange: '$1.20',  aldiRange: '$0.95'  },
  { id: 37, name: 'mango (each)',                              category: 'Produce', coles: 3.50,  woolies: 3.50,  aldi: 2.99,  colesRange: '$3.50',  wooliesRange: '$3.50',  aldiRange: '$2.99'  },
  { id: 39, name: 'mushrooms (White Button, 200g punnet)',     category: 'Produce', coles: 3.50,  woolies: 3.50,  aldi: 2.99,  colesRange: '$3.50',  wooliesRange: '$3.50',  aldiRange: '$2.99'  },
  { id: 41, name: 'onion (Brown Loose, each)',                 category: 'Produce', coles: 0.45,  woolies: 0.45,  aldi: 0.38,  colesRange: '$0.45',  wooliesRange: '$0.45',  aldiRange: '$0.38'  },
  { id: 42, name: 'orange (Navel Loose, each)',                category: 'Produce', coles: 0.95,  woolies: 0.95,  aldi: 0.80,  colesRange: '$0.95',  wooliesRange: '$0.95',  aldiRange: '$0.80'  },
  { id: 43, name: 'parsley (Fresh bunch)',                     category: 'Produce', coles: 3.20,  woolies: 3.20,  aldi: 2.69,  colesRange: '$3.20',  wooliesRange: '$3.20',  aldiRange: '$2.69'  },
  { id: 44, name: 'pea (Frozen Green Peas, 1kg)',              category: 'Produce', coles: 3.00,  woolies: 3.00,  aldi: 2.59,  colesRange: '$3.00',  wooliesRange: '$3.00',  aldiRange: '$2.59'  },
  { id: 45, name: 'peach (Loose, each)',                       category: 'Produce', coles: 1.50,  woolies: 1.50,  aldi: 1.20,  colesRange: '$1.50',  wooliesRange: '$1.50',  aldiRange: '$1.20'  },
  { id: 46, name: 'pear (Packham Loose, each)',                category: 'Produce', coles: 1.02,  woolies: 1.02,  aldi: 0.85,  colesRange: '$1.02',  wooliesRange: '$1.02',  aldiRange: '$0.85'  },
  { id: 47, name: 'pineapple (Whole, each)',                   category: 'Produce', coles: 4.50,  woolies: 4.50,  aldi: 3.99,  colesRange: '$4.50',  wooliesRange: '$4.50',  aldiRange: '$3.99'  },
  { id: 48, name: 'potato (Brushed Loose, each)',              category: 'Produce', coles: 0.75,  woolies: 0.75,  aldi: 0.60,  colesRange: '$0.75',  wooliesRange: '$0.75',  aldiRange: '$0.60'  },
  { id: 49, name: 'radish (Fresh bunch)',                      category: 'Produce', coles: 2.50,  woolies: 2.50,  aldi: 1.99,  colesRange: '$2.50',  wooliesRange: '$2.50',  aldiRange: '$1.99'  },
  { id: 50, name: 'red bell pepper (Red Capsicum, each)',      category: 'Produce', coles: 1.74,  woolies: 1.70,  aldi: 1.49,  colesRange: '$1.74',  wooliesRange: '$1.70',  aldiRange: '$1.49'  },
  { id: 52, name: 'spinach (Baby Spinach, 280g bag)',          category: 'Produce', coles: 4.50,  woolies: 4.50,  aldi: 3.79,  colesRange: '$4.50',  wooliesRange: '$4.50',  aldiRange: '$3.79'  },
  { id: 53, name: 'strawberry (250g punnet)',                  category: 'Produce', coles: 3.50,  woolies: 3.50,  aldi: 2.99,  colesRange: '$3.50',  wooliesRange: '$3.50',  aldiRange: '$2.99'  },
  { id: 54, name: 'sweet potato (Gold Loose, approx 500g)',   category: 'Produce', coles: 2.55,  woolies: 2.50,  aldi: 2.10,  colesRange: '$2.55',  wooliesRange: '$2.50',  aldiRange: '$2.10'  },
  { id: 55, name: 'tomato (Roma Loose, each)',                 category: 'Produce', coles: 0.90,  woolies: 0.90,  aldi: 0.75,  colesRange: '$0.90',  wooliesRange: '$0.90',  aldiRange: '$0.75'  },
  { id: 56, name: 'watermelon (Seedless Quarter)',             category: 'Produce', coles: 1.90,  woolies: 1.90,  aldi: 1.50,  colesRange: '$1.90',  wooliesRange: '$1.90',  aldiRange: '$1.50'  },
  { id: 57, name: 'yellow bell pepper (Yellow Capsicum, each)',category: 'Produce', coles: 1.85,  woolies: 1.80,  aldi: 1.59,  colesRange: '$1.85',  wooliesRange: '$1.80',  aldiRange: '$1.59'  },
  { id: 59, name: 'zucchini (Green Loose, each)',              category: 'Produce', coles: 1.38,  woolies: 1.35,  aldi: 1.10,  colesRange: '$1.38',  wooliesRange: '$1.35',  aldiRange: '$1.10'  },
  // ── Dairy ────────────────────────────────────────────────────────────────
  { id: 11, name: 'butter (Salted Block, 250g)',               category: 'Dairy',   coles: 4.20,  woolies: 4.20,  aldi: 3.89,  colesRange: '$4.20',  wooliesRange: '$4.20',  aldiRange: '$3.89'  },
  { id: 15, name: 'cheese (Cheddar Block, 500g)',              category: 'Dairy',   coles: 7.50,  woolies: 7.50,  aldi: 6.49,  colesRange: '$7.50',  wooliesRange: '$7.50',  aldiRange: '$6.49'  },
  { id: 21, name: 'egg (Free Range Large, 12-pack)',           category: 'Dairy',   coles: 5.50,  woolies: 5.50,  aldi: 4.99,  colesRange: '$5.50',  wooliesRange: '$5.50',  aldiRange: '$4.99'  },
  { id: 38, name: 'milk (Full Cream, 2L)',                     category: 'Dairy',   coles: 3.10,  woolies: 3.10,  aldi: 2.99,  colesRange: '$3.10',  wooliesRange: '$3.10',  aldiRange: '$2.99'  },
  { id: 58, name: 'yogurt (Greek Style Plain, 1kg)',           category: 'Dairy',   coles: 5.50,  woolies: 5.50,  aldi: 4.69,  colesRange: '$5.50',  wooliesRange: '$5.50',  aldiRange: '$4.69'  },
  // ── Meat & Seafood ───────────────────────────────────────────────────────
  { id: 6,  name: 'beef (Regular Mince, 500g)',                category: 'Meat',    coles: 7.00,  woolies: 7.00,  aldi: 6.49,  colesRange: '$7.00',  wooliesRange: '$7.00',  aldiRange: '$6.49'  },
  { id: 16, name: 'chicken (RSPCA Breast Fillet, 1kg)',        category: 'Meat',    coles: 13.50, woolies: 13.50, aldi: 11.99, colesRange: '$13.50', wooliesRange: '$13.50', aldiRange: '$11.99' },
  { id: 23, name: 'fish (Frozen Basa Fillets, 1kg)',           category: 'Meat',    coles: 10.00, woolies: 10.00, aldi: 8.99,  colesRange: '$10.00', wooliesRange: '$10.00', aldiRange: '$8.99'  },
  { id: 30, name: 'ham (Sliced Deli Leg Ham, 200g)',           category: 'Meat',    coles: 4.00,  woolies: 4.00,  aldi: 3.29,  colesRange: '$4.00',  wooliesRange: '$4.00',  aldiRange: '$3.29'  },
  { id: 51, name: 'sausage (Thin Beef, 500g pack)',            category: 'Meat',    coles: 5.50,  woolies: 5.50,  aldi: 4.49,  colesRange: '$5.50',  wooliesRange: '$5.50',  aldiRange: '$4.49'  },
  // ── Bakery & Pantry ──────────────────────────────────────────────────────
  { id: 9,  name: 'bread (White Soft Toast, 700g)',            category: 'Bakery',  coles: 2.40,  woolies: 2.40,  aldi: 2.19,  colesRange: '$2.40',  wooliesRange: '$2.40',  aldiRange: '$2.19'  },
  { id: 24, name: 'flour (Plain White, 1kg)',                  category: 'Bakery',  coles: 1.50,  woolies: 1.50,  aldi: 1.25,  colesRange: '$1.50',  wooliesRange: '$1.50',  aldiRange: '$1.25'  },
  { id: 31, name: 'jam (Strawberry, 500g)',                    category: 'Bakery',  coles: 2.80,  woolies: 2.80,  aldi: 2.19,  colesRange: '$2.80',  wooliesRange: '$2.80',  aldiRange: '$2.19'  },
  // ── Other ────────────────────────────────────────────────────────────────
  { id: 17, name: 'chocolate (Dairy Milk Block, 180g)',        category: 'Other',   coles: 6.00,  woolies: 6.00,  aldi: 4.99,  colesRange: '$6.00',  wooliesRange: '$6.00',  aldiRange: '$4.99'  },
  { id: 40, name: 'olives (Pitted Green Jar, 300g)',           category: 'Other',   coles: 3.00,  woolies: 3.00,  aldi: 2.29,  colesRange: '$3.00',  wooliesRange: '$3.00',  aldiRange: '$2.29'  },
];

// Maps every YOLO label the model may produce → stable item id
const LABEL_TO_ID: Record<string, number> = {
  apple: 1, asparagus: 2, avocado: 3, banana: 4,
  bean: 5, beans: 5,
  'bell pepper': 7, blueberries: 8, broccoli: 10, cabbage: 12,
  carrot: 13, cauliflower: 14, cheese: 15,
  chicken: 16, 'chicken breast': 16,
  chocolate: 17, corn: 18, cucumber: 19, dill: 20, egg: 21,
  eggplant: 22, fish: 23, flour: 24, garlic: 25, ginger: 26,
  grape: 27, 'green bell pepper': 28, 'green chilies': 29,
  ham: 30, jam: 31, kiwi: 32, leek: 33, lemon: 34, lettuce: 35,
  lime: 36, mango: 37, milk: 38, mushrooms: 39, olives: 40,
  onion: 41, orange: 42, parsley: 43, pea: 44, peach: 45,
  pear: 46, pineapple: 47, potato: 48, radish: 49,
  'red bell pepper': 50, sausage: 51, spinach: 52, strawberry: 53,
  'sweet potato': 54, tomato: 55, watermelon: 56,
  'yellow bell pepper': 57, yogurt: 58, zucchini: 59,
  beef: 6, butter: 11,
};

const _byId = new Map(PRICE_DATABASE.map((item) => [item.id, item]));

/** Look up a GroceryItem by YOLO detection label (case-insensitive). */
export function lookupByLabel(label: string): GroceryItem | null {
  const normalized = label.toLowerCase().trim();
  const exactId = LABEL_TO_ID[normalized];
  if (exactId != null) return _byId.get(exactId) ?? null;
  for (const [key, id] of Object.entries(LABEL_TO_ID)) {
    if (key.includes(normalized) || normalized.includes(key)) {
      return _byId.get(id) ?? null;
    }
  }
  return null;
}

/** Build a GroceryItem from backend PriceInfo (returned by /detect). */
export function priceInfoToGroceryItem(priceInfo: {
  id: number | null;
  name: string;
  category: string;
  coles: number | null;
  woolworths: number | null;
  aldi: number | null;
}): GroceryItem | null {
  if (!priceInfo.id || priceInfo.coles == null) return null;
  return {
    id: priceInfo.id,
    name: priceInfo.name,
    category: priceInfo.category,
    coles: priceInfo.coles,
    woolies: priceInfo.woolworths ?? 0,
    aldi: priceInfo.aldi ?? 0,
    colesRange: `$${priceInfo.coles.toFixed(2)}`,
    wooliesRange: priceInfo.woolworths != null ? `$${priceInfo.woolworths.toFixed(2)}` : 'N/A',
    aldiRange: priceInfo.aldi != null ? `$${priceInfo.aldi.toFixed(2)}` : 'N/A',
  };
}
