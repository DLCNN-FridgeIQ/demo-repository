export interface Detection {
  xmin: number;
  ymin: number;
  xmax: number;
  ymax: number;
  confidence: number;
  class: number;
  name: string;
}

export interface PriceInfo {
  id: number | null;
  name: string;
  category: string;
  coles: number | null;
  woolworths: number | null;
  aldi: number | null;
}

export interface DetectionResult {
  predictions: Detection[];
  counts: Record<string, number>;
  image: string;
  prices?: Record<string, PriceInfo>;
}

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

// ── Profile ──────────────────────────────────────────────────────────────────

export interface UserProfile {
  id: number;
  username: string;
  name: string;
  email: string;
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface ProfileSummary {
  total_scans: number;
  total_grocery_lists: number;
  total_detected_items: number;
  estimated_total_spend: number;
  most_common_items: Array<{ name: string; count: number }>;
  cheapest_store_count: Record<string, number>;
  recent_activity: Array<{ type: string; date: string; description: string }>;
  member_since: string | null;
}

export interface ScanRecord {
  id: number;
  detected_items: Detection[];
  total_items_detected: number;
  average_confidence: number;
  thumbnail: string | null;
  created_at: string;
}

export type GroceryListStatus = 'Generated' | 'Purchased' | 'Archived';

export interface GroceryListRecord {
  id: number;
  title: string;
  items: GroceryItem[];
  estimated_total_cost: number;
  cheapest_store: string | null;
  status: GroceryListStatus;
  created_at: string;
  updated_at: string;
}
