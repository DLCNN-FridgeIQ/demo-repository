"""Ground truth food pricing database for Australian supermarkets.

Prices reflect standard shelf prices at Coles, Woolworths, and Aldi.
Each key is a normalised label the YOLOv5 model may produce.
Duplicate keys (e.g. 'bean'/'beans', 'chicken'/'chicken breast') map to
the same item id so the frontend can deduplicate when building a grocery list.
"""

from __future__ import annotations

from typing import TypedDict


class FoodItem(TypedDict):
    id: int
    name: str
    category: str
    coles: float
    woolworths: float
    aldi: float


FOOD_DATABASE: dict[str, FoodItem] = {
    # ── Produce ──────────────────────────────────────────────────────────────
    "apple":              {"id": 1,  "name": "apple (Loose Royal Gala, each)",           "category": "Produce", "coles": 1.26,  "woolworths": 1.26,  "aldi": 1.15},
    "asparagus":          {"id": 2,  "name": "asparagus (Fresh bunch)",                   "category": "Produce", "coles": 4.70,  "woolworths": 4.50,  "aldi": 3.99},
    "avocado":            {"id": 3,  "name": "avocado (Hass, each)",                      "category": "Produce", "coles": 2.20,  "woolworths": 2.20,  "aldi": 1.50},
    "banana":             {"id": 4,  "name": "banana (Cavendish, each)",                  "category": "Produce", "coles": 0.85,  "woolworths": 0.85,  "aldi": 0.72},
    "bean":               {"id": 5,  "name": "beans (Green Beans, 250g bag)",             "category": "Produce", "coles": 2.20,  "woolworths": 2.10,  "aldi": 1.99},
    "beans":              {"id": 5,  "name": "beans (Green Beans, 250g bag)",             "category": "Produce", "coles": 2.20,  "woolworths": 2.10,  "aldi": 1.99},
    "bell pepper":        {"id": 7,  "name": "bell pepper (Red Capsicum, each)",          "category": "Produce", "coles": 1.74,  "woolworths": 1.70,  "aldi": 1.49},
    "blueberries":        {"id": 8,  "name": "blueberries (125g punnet)",                 "category": "Produce", "coles": 7.50,  "woolworths": 7.50,  "aldi": 6.99},
    "broccoli":           {"id": 10, "name": "broccoli (Medium head, each)",              "category": "Produce", "coles": 1.70,  "woolworths": 1.65,  "aldi": 1.45},
    "cabbage":            {"id": 12, "name": "cabbage (Green Half)",                      "category": "Produce", "coles": 2.50,  "woolworths": 2.50,  "aldi": 2.19},
    "carrot":             {"id": 13, "name": "carrot (Loose, each)",                      "category": "Produce", "coles": 0.35,  "woolworths": 0.35,  "aldi": 0.29},
    "cauliflower":        {"id": 14, "name": "cauliflower (Whole head)",                  "category": "Produce", "coles": 4.50,  "woolworths": 4.50,  "aldi": 3.99},
    "corn":               {"id": 18, "name": "corn (Sweet Corn, each)",                   "category": "Produce", "coles": 1.50,  "woolworths": 1.00,  "aldi": 0.90},
    "cucumber":           {"id": 19, "name": "cucumber (Continental, each)",              "category": "Produce", "coles": 1.80,  "woolworths": 1.80,  "aldi": 1.49},
    "dill":               {"id": 20, "name": "dill (Fresh bunch)",                        "category": "Produce", "coles": 3.20,  "woolworths": 3.20,  "aldi": 2.69},
    "eggplant":           {"id": 22, "name": "eggplant (each)",                           "category": "Produce", "coles": 2.90,  "woolworths": 2.90,  "aldi": 2.49},
    "garlic":             {"id": 25, "name": "garlic (Loose, approx 60g head)",           "category": "Produce", "coles": 2.10,  "woolworths": 2.10,  "aldi": 1.79},
    "ginger":             {"id": 26, "name": "ginger (Loose, approx 130g piece)",         "category": "Produce", "coles": 4.29,  "woolworths": 4.20,  "aldi": 3.50},
    "grape":              {"id": 27, "name": "grape (White Seedless, 500g pack)",         "category": "Produce", "coles": 4.50,  "woolworths": 4.50,  "aldi": 3.99},
    "green bell pepper":  {"id": 28, "name": "green bell pepper (Green Capsicum, each)",  "category": "Produce", "coles": 1.60,  "woolworths": 1.60,  "aldi": 1.39},
    "green chilies":      {"id": 29, "name": "green chilies (Fresh, per 100g)",           "category": "Produce", "coles": 2.50,  "woolworths": 2.50,  "aldi": 2.10},
    "kiwi":               {"id": 32, "name": "kiwi (Green Kiwifruit, each)",              "category": "Produce", "coles": 1.00,  "woolworths": 1.00,  "aldi": 0.85},
    "leek":               {"id": 33, "name": "leek (each)",                               "category": "Produce", "coles": 2.50,  "woolworths": 2.50,  "aldi": 1.99},
    "lemon":              {"id": 34, "name": "lemon (each)",                              "category": "Produce", "coles": 1.50,  "woolworths": 1.50,  "aldi": 1.10},
    "lettuce":            {"id": 35, "name": "lettuce (Iceberg, each)",                   "category": "Produce", "coles": 2.90,  "woolworths": 2.90,  "aldi": 2.29},
    "lime":               {"id": 36, "name": "lime (each)",                               "category": "Produce", "coles": 1.20,  "woolworths": 1.20,  "aldi": 0.95},
    "mango":              {"id": 37, "name": "mango (each)",                              "category": "Produce", "coles": 3.50,  "woolworths": 3.50,  "aldi": 2.99},
    "mushrooms":          {"id": 39, "name": "mushrooms (White Button, 200g punnet)",     "category": "Produce", "coles": 3.50,  "woolworths": 3.50,  "aldi": 2.99},
    "onion":              {"id": 41, "name": "onion (Brown Loose, each)",                 "category": "Produce", "coles": 0.45,  "woolworths": 0.45,  "aldi": 0.38},
    "orange":             {"id": 42, "name": "orange (Navel Loose, each)",                "category": "Produce", "coles": 0.95,  "woolworths": 0.95,  "aldi": 0.80},
    "parsley":            {"id": 43, "name": "parsley (Fresh bunch)",                     "category": "Produce", "coles": 3.20,  "woolworths": 3.20,  "aldi": 2.69},
    "pea":                {"id": 44, "name": "pea (Frozen Green Peas, 1kg)",              "category": "Produce", "coles": 3.00,  "woolworths": 3.00,  "aldi": 2.59},
    "peach":              {"id": 45, "name": "peach (Loose, each)",                       "category": "Produce", "coles": 1.50,  "woolworths": 1.50,  "aldi": 1.20},
    "pear":               {"id": 46, "name": "pear (Packham Loose, each)",                "category": "Produce", "coles": 1.02,  "woolworths": 1.02,  "aldi": 0.85},
    "pineapple":          {"id": 47, "name": "pineapple (Whole, each)",                   "category": "Produce", "coles": 4.50,  "woolworths": 4.50,  "aldi": 3.99},
    "potato":             {"id": 48, "name": "potato (Brushed Loose, each)",              "category": "Produce", "coles": 0.75,  "woolworths": 0.75,  "aldi": 0.60},
    "radish":             {"id": 49, "name": "radish (Fresh bunch)",                      "category": "Produce", "coles": 2.50,  "woolworths": 2.50,  "aldi": 1.99},
    "red bell pepper":    {"id": 50, "name": "red bell pepper (Red Capsicum, each)",      "category": "Produce", "coles": 1.74,  "woolworths": 1.70,  "aldi": 1.49},
    "spinach":            {"id": 52, "name": "spinach (Baby Spinach, 280g bag)",          "category": "Produce", "coles": 4.50,  "woolworths": 4.50,  "aldi": 3.79},
    "strawberry":         {"id": 53, "name": "strawberry (250g punnet)",                  "category": "Produce", "coles": 3.50,  "woolworths": 3.50,  "aldi": 2.99},
    "sweet potato":       {"id": 54, "name": "sweet potato (Gold Loose, approx 500g)",   "category": "Produce", "coles": 2.55,  "woolworths": 2.50,  "aldi": 2.10},
    "tomato":             {"id": 55, "name": "tomato (Roma Loose, each)",                 "category": "Produce", "coles": 0.90,  "woolworths": 0.90,  "aldi": 0.75},
    "watermelon":         {"id": 56, "name": "watermelon (Seedless Quarter)",             "category": "Produce", "coles": 1.90,  "woolworths": 1.90,  "aldi": 1.50},
    "yellow bell pepper": {"id": 57, "name": "yellow bell pepper (Yellow Capsicum, each)","category": "Produce", "coles": 1.85,  "woolworths": 1.80,  "aldi": 1.59},
    "zucchini":           {"id": 59, "name": "zucchini (Green Loose, each)",              "category": "Produce", "coles": 1.38,  "woolworths": 1.35,  "aldi": 1.10},
    # ── Dairy ────────────────────────────────────────────────────────────────
    "butter":             {"id": 11, "name": "butter (Salted Block, 250g)",               "category": "Dairy",   "coles": 4.20,  "woolworths": 4.20,  "aldi": 3.89},
    "cheese":             {"id": 15, "name": "cheese (Cheddar Block, 500g)",              "category": "Dairy",   "coles": 7.50,  "woolworths": 7.50,  "aldi": 6.49},
    "egg":                {"id": 21, "name": "egg (Free Range Large, 12-pack)",           "category": "Dairy",   "coles": 5.50,  "woolworths": 5.50,  "aldi": 4.99},
    "milk":               {"id": 38, "name": "milk (Full Cream, 2L)",                     "category": "Dairy",   "coles": 3.10,  "woolworths": 3.10,  "aldi": 2.99},
    "yogurt":             {"id": 58, "name": "yogurt (Greek Style Plain, 1kg)",           "category": "Dairy",   "coles": 5.50,  "woolworths": 5.50,  "aldi": 4.69},
    # ── Meat & Seafood ───────────────────────────────────────────────────────
    "beef":               {"id": 6,  "name": "beef (Regular Mince, 500g)",                "category": "Meat",    "coles": 7.00,  "woolworths": 7.00,  "aldi": 6.49},
    "chicken":            {"id": 16, "name": "chicken (RSPCA Breast Fillet, 1kg)",        "category": "Meat",    "coles": 13.50, "woolworths": 13.50, "aldi": 11.99},
    "chicken breast":     {"id": 16, "name": "chicken (RSPCA Breast Fillet, 1kg)",        "category": "Meat",    "coles": 13.50, "woolworths": 13.50, "aldi": 11.99},
    "fish":               {"id": 23, "name": "fish (Frozen Basa Fillets, 1kg)",           "category": "Meat",    "coles": 10.00, "woolworths": 10.00, "aldi": 8.99},
    "ham":                {"id": 30, "name": "ham (Sliced Deli Leg Ham, 200g)",           "category": "Meat",    "coles": 4.00,  "woolworths": 4.00,  "aldi": 3.29},
    "sausage":            {"id": 51, "name": "sausage (Thin Beef, 500g pack)",            "category": "Meat",    "coles": 5.50,  "woolworths": 5.50,  "aldi": 4.49},
    # ── Bakery & Pantry ──────────────────────────────────────────────────────
    "bread":              {"id": 9,  "name": "bread (White Soft Toast, 700g)",            "category": "Bakery",  "coles": 2.40,  "woolworths": 2.40,  "aldi": 2.19},
    "flour":              {"id": 24, "name": "flour (Plain White, 1kg)",                  "category": "Bakery",  "coles": 1.50,  "woolworths": 1.50,  "aldi": 1.25},
    "jam":                {"id": 31, "name": "jam (Strawberry, 500g)",                    "category": "Bakery",  "coles": 2.80,  "woolworths": 2.80,  "aldi": 2.19},
    # ── Other ────────────────────────────────────────────────────────────────
    "chocolate":          {"id": 17, "name": "chocolate (Dairy Milk Block, 180g)",        "category": "Other",   "coles": 6.00,  "woolworths": 6.00,  "aldi": 4.99},
    "olives":             {"id": 40, "name": "olives (Pitted Green Jar, 300g)",           "category": "Other",   "coles": 3.00,  "woolworths": 3.00,  "aldi": 2.29},
}


def lookup_item(label: str) -> FoodItem | None:
    """Return the best-matching FoodItem for a YOLO detection label, or None."""
    normalized = label.lower().strip()
    if normalized in FOOD_DATABASE:
        return FOOD_DATABASE[normalized]
    for key, item in FOOD_DATABASE.items():
        if key in normalized or normalized in key:
            return item
    return None
