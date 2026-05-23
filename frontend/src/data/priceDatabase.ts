export interface GroceryItem {
  id: number;
  name: string;
  category: string;
  coles: number;
  woolies: number;
  aldi: number;
  colesRange: string;
  wooliesRange: string;
  aldiRange: string;
}

export const SUPERMARKET_PRICES: GroceryItem[] = [
  {
    id: 1,
    name: "apple (Loose Royal Gala, each)",
    category: "Produce",
    coles: 1.26,
    woolies: 1.26,
    aldi: 1.15,
    colesRange: "$1.26",
    wooliesRange: "$1.26",
    aldiRange: "$1.15"
  },
  {
    id: 2,
    name: "asparagus (Fresh bunch)",
    category: "Produce",
    coles: 4.70,
    woolies: 4.50,
    aldi: 3.99,
    colesRange: "$4.70",
    wooliesRange: "$4.50",
    aldiRange: "$3.99"
  },
  {
    id: 3,
    name: "avocado (Hass, each)",
    category: "Produce",
    coles: 2.20,
    woolies: 2.20,
    aldi: 1.50,
    colesRange: "$2.20",
    wooliesRange: "$2.20",
    aldiRange: "$1.50"
  },
  {
    id: 4,
    name: "banana (Cavendish, each)",
    category: "Produce",
    coles: 0.85,
    woolies: 0.85,
    aldi: 0.72,
    colesRange: "$0.85",
    wooliesRange: "$0.85",
    aldiRange: "$0.72"
  },
  {
    id: 5,
    name: "bean (Green Beans, 250g bag)",
    category: "Produce",
    coles: 2.20,
    woolies: 2.10,
    aldi: 1.99,
    colesRange: "$2.20",
    wooliesRange: "$2.10",
    aldiRange: "$1.99"
  },
  {
    id: 6,
    name: "beans (Green Beans, 250g bag)",
    category: "Produce",
    coles: 2.20,
    woolies: 2.10,
    aldi: 1.99,
    colesRange: "$2.20",
    wooliesRange: "$2.10",
    aldiRange: "$1.99"
  },
  {
    id: 7,
    name: "beef (Regular Mince, 500g)",
    category: "Meat",
    coles: 7.00,
    woolies: 7.00,
    aldi: 6.49,
    colesRange: "$7.00",
    wooliesRange: "$7.00",
    aldiRange: "$6.49"
  },
  {
    id: 8,
    name: "bell pepper (Red Capsicum, each)",
    category: "Produce",
    coles: 1.74,
    woolies: 1.70,
    aldi: 1.49,
    colesRange: "$1.74",
    wooliesRange: "$1.70",
    aldiRange: "$1.49"
  },
  {
    id: 9,
    name: "blueberries (125g punnet)",
    category: "Produce",
    coles: 7.50,
    woolies: 7.50,
    aldi: 6.99,
    colesRange: "$7.50",
    wooliesRange: "$7.50",
    aldiRange: "$6.99"
  },
  {
    id: 10,
    name: "bread (White Soft Toast, 700g)",
    category: "Pantry",
    coles: 2.40,
    woolies: 2.40,
    aldi: 2.19,
    colesRange: "$2.40",
    wooliesRange: "$2.40",
    aldiRange: "$2.19"
  },
  {
    id: 11,
    name: "broccoli (Medium head, each)",
    category: "Produce",
    coles: 1.70,
    woolies: 1.65,
    aldi: 1.45,
    colesRange: "$1.70",
    wooliesRange: "$1.65",
    aldiRange: "$1.45"
  },
  {
    id: 12,
    name: "butter (Salted Block, 250g)",
    category: "Dairy",
    coles: 4.20,
    woolies: 4.20,
    aldi: 3.89,
    colesRange: "$4.20",
    wooliesRange: "$4.20",
    aldiRange: "$3.89"
  },
  {
    id: 13,
    name: "cabbage (Green Half)",
    category: "Produce",
    coles: 2.50,
    woolies: 2.50,
    aldi: 2.19,
    colesRange: "$2.50",
    wooliesRange: "$2.50",
    aldiRange: "$2.19"
  },
  {
    id: 14,
    name: "carrot (Loose, each)",
    category: "Produce",
    coles: 0.35,
    woolies: 0.35,
    aldi: 0.29,
    colesRange: "$0.35",
    wooliesRange: "$0.35",
    aldiRange: "$0.29"
  },
  {
    id: 15,
    name: "cauliflower (Whole head)",
    category: "Produce",
    coles: 4.50,
    woolies: 4.50,
    aldi: 3.99,
    colesRange: "$4.50",
    wooliesRange: "$4.50",
    aldiRange: "$3.99"
  },
  {
    id: 16,
    name: "cheese (Cheddar Block, 500g)",
    category: "Dairy",
    coles: 7.50,
    woolies: 7.50,
    aldi: 6.49,
    colesRange: "$7.50",
    wooliesRange: "$7.50",
    aldiRange: "$6.49"
  },
  {
    id: 17,
    name: "chicken (RSPCA Breast Fillet, 1kg)",
    category: "Meat",
    coles: 13.50,
    woolies: 13.50,
    aldi: 11.99,
    colesRange: "$13.50",
    wooliesRange: "$13.50",
    aldiRange: "$11.99"
  },
  {
    id: 18,
    name: "chicken breast (RSPCA Breast Fillet, 1kg)",
    category: "Meat",
    coles: 13.50,
    woolies: 13.50,
    aldi: 11.99,
    colesRange: "$13.50",
    wooliesRange: "$13.50",
    aldiRange: "$11.99"
  },
  {
    id: 19,
    name: "chocolate (Dairy Milk Block, 180g)",
    category: "Pantry",
    coles: 6.00,
    woolies: 6.00,
    aldi: 4.99,
    colesRange: "$6.00",
    wooliesRange: "$6.00",
    aldiRange: "$4.99"
  },
  {
    id: 20,
    name: "corn (Sweet Corn, each)",
    category: "Produce",
    coles: 1.50,
    woolies: 1.00,
    aldi: 0.90,
    colesRange: "$1.50",
    wooliesRange: "$1.00",
    aldiRange: "$0.90"
  },
  {
    id: 21,
    name: "cucumber (Continental, each)",
    category: "Produce",
    coles: 1.80,
    woolies: 1.80,
    aldi: 1.49,
    colesRange: "$1.80",
    wooliesRange: "$1.80",
    aldiRange: "$1.49"
  },
  {
    id: 22,
    name: "dill (Fresh bunch)",
    category: "Produce",
    coles: 3.20,
    woolies: 3.20,
    aldi: 2.69,
    colesRange: "$3.20",
    wooliesRange: "$3.20",
    aldiRange: "$2.69"
  },
  {
    id: 23,
    name: "egg (Free Range Large, 12-pack)",
    category: "Dairy",
    coles: 5.50,
    woolies: 5.50,
    aldi: 4.99,
    colesRange: "$5.50",
    wooliesRange: "$5.50",
    aldiRange: "$4.99"
  },
  {
    id: 24,
    name: "eggplant (Each)",
    category: "Produce",
    coles: 2.90,
    woolies: 2.90,
    aldi: 2.49,
    colesRange: "$2.90",
    wooliesRange: "$2.90",
    aldiRange: "$2.49"
  },
  {
    id: 25,
    name: "fish (Frozen Basa Fillets, 1kg)",
    category: "Seafood",
    coles: 10.00,
    woolies: 10.00,
    aldi: 8.99,
    colesRange: "$10.00",
    wooliesRange: "$10.00",
    aldiRange: "$8.99"
  },
  {
    id: 26,
    name: "flour (Plain White, 1kg)",
    category: "Pantry",
    coles: 1.50,
    woolies: 1.50,
    aldi: 1.25,
    colesRange: "$1.50",
    wooliesRange: "$1.50",
    aldiRange: "$1.25"
  },
  {
    id: 27,
    name: "garlic (Loose, approx 60g head)",
    category: "Produce",
    coles: 2.10,
    woolies: 2.10,
    aldi: 1.79,
    colesRange: "$2.10",
    wooliesRange: "$2.10",
    aldiRange: "$1.79"
  },
  {
    id: 28,
    name: "ginger (Loose, approx 130g piece)",
    category: "Produce",
    coles: 4.29,
    woolies: 4.20,
    aldi: 3.50,
    colesRange: "$4.29",
    wooliesRange: "$4.20",
    aldiRange: "$3.50"
  },
  {
    id: 29,
    name: "grape (White Seedless, 500g pack)",
    category: "Produce",
    coles: 4.50,
    woolies: 4.50,
    aldi: 3.99,
    colesRange: "$4.50",
    wooliesRange: "$4.50",
    aldiRange: "$3.99"
  },
  {
    id: 30,
    name: "green bell pepper (Green Capsicum, each)",
    category: "Produce",
    coles: 1.60,
    woolies: 1.60,
    aldi: 1.39,
    colesRange: "$1.60",
    wooliesRange: "$1.60",
    aldiRange: "$1.39"
  },
  {
    id: 31,
    name: "green chilies (Fresh, per 100g)",
    category: "Produce",
    coles: 2.50,
    woolies: 2.50,
    aldi: 2.10,
    colesRange: "$2.50",
    wooliesRange: "$2.50",
    aldiRange: "$2.10"
  },
  {
    id: 32,
    name: "ham (Sliced Deli Leg Ham, 200g)",
    category: "Meat",
    coles: 4.00,
    woolies: 4.00,
    aldi: 3.29,
    colesRange: "$4.00",
    wooliesRange: "$4.00",
    aldiRange: "$3.29"
  },
  {
    id: 33,
    name: "jam (Strawberry, 500g)",
    category: "Pantry",
    coles: 2.80,
    woolies: 2.80,
    aldi: 2.19,
    colesRange: "$2.80",
    wooliesRange: "$2.80",
    aldiRange: "$2.19"
  },
  {
    id: 34,
    name: "kiwi (Green Kiwifruit, each)",
    category: "Produce",
    coles: 1.00,
    woolies: 1.00,
    aldi: 0.85,
    colesRange: "$1.00",
    wooliesRange: "$1.00",
    aldiRange: "$0.85"
  },
  {
    id: 35,
    name: "leek (Each)",
    category: "Produce",
    coles: 2.50,
    woolies: 2.50,
    aldi: 1.99,
    colesRange: "$2.50",
    wooliesRange: "$2.50",
    aldiRange: "$1.99"
  },
  {
    id: 36,
    name: "lemon (Each)",
    category: "Produce",
    coles: 1.50,
    woolies: 1.50,
    aldi: 1.10,
    colesRange: "$1.50",
    wooliesRange: "$1.50",
    aldiRange: "$1.10"
  },
  {
    id: 37,
    name: "lettuce (Iceberg, each)",
    category: "Produce",
    coles: 2.90,
    woolies: 2.90,
    aldi: 2.29,
    colesRange: "$2.90",
    wooliesRange: "$2.90",
    aldiRange: "$2.29"
  },
  {
    id: 38,
    name: "lime (Each)",
    category: "Produce",
    coles: 1.20,
    woolies: 1.20,
    aldi: 0.95,
    colesRange: "$1.20",
    wooliesRange: "$1.20",
    aldiRange: "$0.95"
  },
  {
    id: 39,
    name: "mango (Each)",
    category: "Produce",
    coles: 3.50,
    woolies: 3.50,
    aldi: 2.99,
    colesRange: "$3.50",
    wooliesRange: "$3.50",
    aldiRange: "$2.99"
  },
  {
    id: 40,
    name: "milk (Full Cream, 2L)",
    category: "Dairy",
    coles: 3.10,
    woolies: 3.10,
    aldi: 2.99,
    colesRange: "$3.10",
    wooliesRange: "$3.10",
    aldiRange: "$2.99"
  },
  {
    id: 41,
    name: "mushrooms (White Button, 200g punnet)",
    category: "Produce",
    coles: 3.50,
    woolies: 3.50,
    aldi: 2.99,
    colesRange: "$3.50",
    wooliesRange: "$3.50",
    aldiRange: "$2.99"
  },
  {
    id: 42,
    name: "olives (Pitted Green Jar, 300g)",
    category: "Pantry",
    coles: 3.00,
    woolies: 3.00,
    aldi: 2.29,
    colesRange: "$3.00",
    wooliesRange: "$3.00",
    aldiRange: "$2.29"
  },
  {
    id: 43,
    name: "onion (Brown Loose, each)",
    category: "Produce",
    coles: 0.45,
    woolies: 0.45,
    aldi: 0.38,
    colesRange: "$0.45",
    wooliesRange: "$0.45",
    aldiRange: "$0.38"
  },
  {
    id: 44,
    name: "orange (Navel Loose, each)",
    category: "Produce",
    coles: 0.95,
    woolies: 0.95,
    aldi: 0.80,
    colesRange: "$0.95",
    wooliesRange: "$0.95",
    aldiRange: "$0.80"
  },
  {
    id: 45,
    name: "parsley (Fresh bunch)",
    category: "Produce",
    coles: 3.20,
    woolies: 3.20,
    aldi: 2.69,
    colesRange: "$3.20",
    wooliesRange: "$3.20",
    aldiRange: "$2.69"
  },
  {
    id: 46,
    name: "pea (Frozen Green Peas, 1kg)",
    category: "Pantry",
    coles: 3.00,
    woolies: 3.00,
    aldi: 2.59,
    colesRange: "$3.00",
    wooliesRange: "$3.00",
    aldiRange: "$2.59"
  },
  {
    id: 47,
    name: "peach (Loose, each)",
    category: "Produce",
    coles: 1.50,
    woolies: 1.50,
    aldi: 1.20,
    colesRange: "$1.50",
    wooliesRange: "$1.50",
    aldiRange: "$1.20"
  },
  {
    id: 48,
    name: "pear (Packham Loose, each)",
    category: "Produce",
    coles: 1.02,
    woolies: 1.02,
    aldi: 0.85,
    colesRange: "$1.02",
    wooliesRange: "$1.02",
    aldiRange: "$0.85"
  },
  {
    id: 49,
    name: "pineapple (Whole, each)",
    category: "Produce",
    coles: 4.50,
    woolies: 4.50,
    aldi: 3.99,
    colesRange: "$4.50",
    wooliesRange: "$4.50",
    aldiRange: "$3.99"
  },
  {
    id: 50,
    name: "potato (Brushed Loose, each)",
    category: "Produce",
    coles: 0.75,
    woolies: 0.75,
    aldi: 0.60,
    colesRange: "$0.75",
    wooliesRange: "$0.75",
    aldiRange: "$0.60"
  },
  {
    id: 51,
    name: "radish (Fresh bunch)",
    category: "Produce",
    coles: 2.50,
    woolies: 2.50,
    aldi: 1.99,
    colesRange: "$2.50",
    wooliesRange: "$2.50",
    aldiRange: "$1.99"
  },
  {
    id: 52,
    name: "red bell pepper (Red Capsicum, each)",
    category: "Produce",
    coles: 1.74,
    woolies: 1.70,
    aldi: 1.49,
    colesRange: "$1.74",
    wooliesRange: "$1.70",
    aldiRange: "$1.49"
  },
  {
    id: 53,
    name: "sausage (Thin Beef, 500g pack)",
    category: "Meat",
    coles: 5.50,
    woolies: 5.50,
    aldi: 4.49,
    colesRange: "$5.50",
    wooliesRange: "$5.50",
    aldiRange: "$4.49"
  },
  {
    id: 54,
    name: "spinach (Baby Spinach, 280g bag)",
    category: "Produce",
    coles: 4.50,
    woolies: 4.50,
    aldi: 3.79,
    colesRange: "$4.50",
    wooliesRange: "$4.50",
    aldiRange: "$3.79"
  },
  {
    id: 55,
    name: "strawberry (250g punnet)",
    category: "Produce",
    coles: 3.50,
    woolies: 3.50,
    aldi: 2.99,
    colesRange: "$3.50",
    wooliesRange: "$3.50",
    aldiRange: "$2.99"
  },
  {
    id: 56,
    name: "sweet potato (Gold Loose, approx 500g)",
    category: "Produce",
    coles: 2.55,
    woolies: 2.50,
    aldi: 2.10,
    colesRange: "$2.55",
    wooliesRange: "$2.50",
    aldiRange: "$2.10"
  },
  {
    id: 57,
    name: "tomato (Roma Loose, each)",
    category: "Produce",
    coles: 0.90,
    woolies: 0.90,
    aldi: 0.75,
    colesRange: "$0.90",
    wooliesRange: "$0.90",
    aldiRange: "$0.75"
  },
  {
    id: 58,
    name: "watermelon (Seedless Quarter, per kg price)",
    category: "Produce",
    coles: 1.90,
    woolies: 1.90,
    aldi: 1.50,
    colesRange: "$1.90",
    wooliesRange: "$1.90",
    aldiRange: "$1.50"
  },
  {
    id: 59,
    name: "yellow bell pepper (Yellow Capsicum, each)",
    category: "Produce",
    coles: 1.85,
    woolies: 1.80,
    aldi: 1.59,
    colesRange: "$1.85",
    wooliesRange: "$1.80",
    aldiRange: "$1.59"
  },
  {
    id: 60,
    name: "yogurt (Greek Style Plain, 1kg)",
    category: "Dairy",
    coles: 5.50,
    woolies: 5.50,
    aldi: 4.69,
    colesRange: "$5.50",
    wooliesRange: "$5.50",
    aldiRange: "$4.69"
  },
  {
    id: 61,
    name: "zucchini (Green Loose, each)",
    category: "Produce",
    coles: 1.38,
    woolies: 1.35,
    aldi: 1.10,
    colesRange: "$1.38",
    wooliesRange: "$1.35",
    aldiRange: "$1.10"
  }
];
