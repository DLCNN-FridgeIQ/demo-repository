import { apiClient } from './api';
import type { UserProfile, ProfileSummary, ScanRecord, GroceryListRecord, GroceryListStatus } from '@/types';

export const profileService = {
  getProfile: () =>
    apiClient.get<UserProfile>('/api/profile'),

  updateProfile: (data: { name?: string; email?: string; avatar_url?: string }) =>
    apiClient.put<UserProfile>('/api/profile', data),

  getSummary: () =>
    apiClient.get<ProfileSummary>('/api/profile/summary'),

  // Grocery lists
  getGroceryLists: () =>
    apiClient.get<GroceryListRecord[]>('/api/profile/grocery-lists'),

  getGroceryListById: (id: number) =>
    apiClient.get<GroceryListRecord>(`/api/profile/grocery-lists/${id}`),

  createGroceryList: (data: {
    title: string;
    items: unknown[];
    estimated_total_cost: number;
    cheapest_store?: string;
  }) => apiClient.post<GroceryListRecord>('/api/profile/grocery-lists', data),

  updateGroceryListStatus: (id: number, status: GroceryListStatus) =>
    apiClient.put<GroceryListRecord>(`/api/profile/grocery-lists/${id}`, { status }),

  deleteGroceryList: (id: number) =>
    apiClient.delete(`/api/profile/grocery-lists/${id}`),

  // Scan history
  getScanHistory: () =>
    apiClient.get<ScanRecord[]>('/api/profile/scans'),

  getScanById: (id: number) =>
    apiClient.get<ScanRecord>(`/api/profile/scans/${id}`),

  deleteScan: (id: number) =>
    apiClient.delete(`/api/profile/scans/${id}`),
};
