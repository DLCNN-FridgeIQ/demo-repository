export interface GroceryItem {
  id: number;
  name: string;
  category: string;
  coles: number;
  woolies: number;
  aldi: number;
}

export const MOCK_GROCERY_LIST: GroceryItem[] = [
  { id: 1, name: 'Eggs (Free Range 12pk)', category: 'Dairy', coles: 5.50, woolies: 5.40, aldi: 4.99 },
  { id: 2, name: 'Baby Spinach', category: 'Produce', coles: 3.00, woolies: 3.00, aldi: 2.49 },
  { id: 3, name: 'Chicken Breast (1kg)', category: 'Meat', coles: 11.00, woolies: 10.50, aldi: 9.99 },
  { id: 4, name: 'Greek Yoghurt (1kg)', category: 'Dairy', coles: 7.50, woolies: 7.00, aldi: 6.49 },
];
