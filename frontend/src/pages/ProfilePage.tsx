import { useState, useEffect, useCallback } from 'react';
import {
  User, Camera, ShoppingCart, BarChart2, LogOut, Edit2, Trash2,
  Download, Loader2, AlertCircle, RefreshCw, CheckCircle2, Box,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { profileService } from '@/services/profileService';
import { GroceryListDetail } from '@/components/profile/GroceryListDetail';
import { ScanDetail } from '@/components/profile/ScanDetail';
import type {
  UserProfile, ProfileSummary, GroceryListRecord,
  ScanRecord, GroceryListStatus,
} from '@/types';

type ActiveView = 'main' | 'grocery-detail' | 'scan-detail';
type ActiveTab  = 'lists' | 'scans';

interface ProfilePageProps {
  onLogout: () => void;
}

const STATUS_STYLES: Record<GroceryListStatus, string> = {
  Generated: 'bg-blue-50 text-blue-700 border-blue-100',
  Purchased:  'bg-emerald-50 text-emerald-700 border-emerald-100',
  Archived:   'bg-slate-100 text-slate-500 border-slate-200',
};

function Initials({ name }: { name: string }) {
  const parts = name.trim().split(' ');
  const initials = parts.length >= 2 ? parts[0][0] + parts[1][0] : parts[0].slice(0, 2);
  return (
    <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center flex-shrink-0">
      <span className="text-white text-xl font-extrabold uppercase">{initials}</span>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
  return (
    <div className="flex flex-col items-center justify-center bg-slate-50 rounded-2xl p-4 border border-slate-100 min-w-[90px]">
      <div className="text-blue-600 mb-1">{icon}</div>
      <div className="text-xl font-extrabold text-slate-900">{value}</div>
      <div className="text-xs text-slate-400 font-semibold mt-0.5 text-center">{label}</div>
    </div>
  );
}

function EmptyState({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="text-slate-200 mb-4">{icon}</div>
      <p className="font-bold text-slate-500">{title}</p>
      <p className="text-sm text-slate-400 mt-1 max-w-xs">{body}</p>
    </div>
  );
}

function ErrorBanner({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="flex items-center gap-3 bg-red-50 border border-red-100 text-red-700 text-sm font-semibold px-5 py-4 rounded-2xl">
      <AlertCircle size={18} className="flex-shrink-0" />
      <span className="flex-1">{message}</span>
      <button onClick={onRetry} className="flex items-center gap-1 text-red-600 hover:text-red-800 font-bold transition-colors">
        <RefreshCw size={14} /> Retry
      </button>
    </div>
  );
}

export function ProfilePage({ onLogout }: ProfilePageProps) {
  const [view, setView] = useState<ActiveView>('main');
  const [activeTab, setActiveTab] = useState<ActiveTab>('lists');

  const [profile, setProfile]         = useState<UserProfile | null>(null);
  const [summary, setSummary]         = useState<ProfileSummary | null>(null);
  const [groceryLists, setGroceryLists] = useState<GroceryListRecord[]>([]);
  const [scans, setScans]             = useState<ScanRecord[]>([]);

  const [selectedList, setSelectedList] = useState<GroceryListRecord | null>(null);
  const [selectedScan, setSelectedScan] = useState<ScanRecord | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState<string | null>(null);

  const [editMode, setEditMode]   = useState(false);
  const [editName, setEditName]   = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [saving, setSaving]       = useState(false);

  const loadAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [p, s, gl, sc] = await Promise.all([
        profileService.getProfile(),
        profileService.getSummary(),
        profileService.getGroceryLists(),
        profileService.getScanHistory(),
      ]);
      setProfile(p);
      setSummary(s);
      setGroceryLists(gl);
      setScans(sc);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to load profile data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadAll(); }, [loadAll]);

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      const updated = await profileService.updateProfile({ name: editName, email: editEmail });
      setProfile(updated);
      setEditMode(false);
    } catch { /* ignore */ } finally { setSaving(false); }
  };

  const handleDeleteList = async (id: number) => {
    if (!confirm('Delete this grocery list?')) return;
    await profileService.deleteGroceryList(id);
    setGroceryLists(prev => prev.filter(l => l.id !== id));
  };

  const handleDeleteScan = async (id: number) => {
    if (!confirm('Delete this scan record?')) return;
    await profileService.deleteScan(id);
    setScans(prev => prev.filter(s => s.id !== id));
  };

  const handleStatusChange = async (status: GroceryListStatus) => {
    if (!selectedList) return;
    const updated = await profileService.updateGroceryListStatus(selectedList.id, status);
    setSelectedList(updated);
    setGroceryLists(prev => prev.map(l => l.id === updated.id ? updated : l));
  };

  const handleExportAll = () => {
    if (!groceryLists.length) return;
    let content = '# FridgIQ — All Grocery Lists\n\n';
    for (const gl of groceryLists) {
      content += `## ${gl.title} (${new Date(gl.created_at).toLocaleDateString('en-AU')})\n`;
      content += `Status: ${gl.status} | Total: $${gl.estimated_total_cost.toFixed(2)}\n\n`;
      for (const item of gl.items) {
        content += `- [ ] ${item.name} ($${Math.min(item.coles, item.woolies, item.aldi).toFixed(2)})\n`;
      }
      content += '\n';
    }
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href = url; a.download = 'fridgiq-all-lists.md';
    document.body.appendChild(a); a.click();
    document.body.removeChild(a); URL.revokeObjectURL(url);
  };

  // ── Detail views ─────────────────────────────────────────────────────────
  if (view === 'grocery-detail' && selectedList) {
    return (
      <GroceryListDetail
        list={selectedList}
        onBack={() => { setView('main'); setSelectedList(null); }}
        onStatusChange={handleStatusChange}
      />
    );
  }
  if (view === 'scan-detail' && selectedScan) {
    return (
      <ScanDetail
        scan={selectedScan}
        onBack={() => { setView('main'); setSelectedScan(null); }}
      />
    );
  }

  // ── Main view ─────────────────────────────────────────────────────────────
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Profile</h2>
        <p className="text-sm md:text-base text-slate-500 mt-1">Your account and activity history.</p>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-blue-500 h-8 w-8" />
        </div>
      )}

      {!loading && error && <ErrorBanner message={error} onRetry={loadAll} />}

      {!loading && !error && profile && (
        <>
          {/* ── Profile Header Card ───────────────────────────────────────── */}
          <Card className="rounded-3xl border-slate-100 shadow-sm">
            <CardContent className="p-6 md:p-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <Initials name={profile.name} />

                <div className="flex-1">
                  {editMode ? (
                    <div className="space-y-2 max-w-sm">
                      <input
                        value={editName}
                        onChange={e => setEditName(e.target.value)}
                        placeholder="Name"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        value={editEmail}
                        onChange={e => setEditEmail(e.target.value)}
                        placeholder="Email"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <div className="flex gap-2 pt-1">
                        <Button onClick={handleSaveProfile} disabled={saving} size="sm" className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl">
                          {saving ? <Loader2 size={14} className="animate-spin mr-1" /> : <CheckCircle2 size={14} className="mr-1" />}
                          Save
                        </Button>
                        <Button onClick={() => setEditMode(false)} size="sm" variant="outline" className="rounded-xl">Cancel</Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-3">
                        <h3 className="text-xl font-extrabold text-slate-900">{profile.name}</h3>
                        <button
                          onClick={() => { setEditName(profile.name); setEditEmail(profile.email); setEditMode(true); }}
                          className="text-slate-400 hover:text-blue-600 transition-colors"
                        >
                          <Edit2 size={15} />
                        </button>
                      </div>
                      <p className="text-sm text-slate-500 mt-0.5">{profile.email}</p>
                      {summary?.member_since && (
                        <p className="text-xs text-slate-400 mt-1">
                          Member since {new Date(summary.member_since).toLocaleDateString('en-AU', { month: 'long', year: 'numeric' })}
                        </p>
                      )}
                    </>
                  )}
                </div>
              </div>

              {summary && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
                  <StatCard icon={<Camera size={18} />} label="Scans"       value={summary.total_scans} />
                  <StatCard icon={<ShoppingCart size={18} />} label="Lists"  value={summary.total_grocery_lists} />
                  <StatCard icon={<Box size={18} />} label="Items Found"     value={summary.total_detected_items} />
                  <StatCard icon={<BarChart2 size={18} />} label="Est. Spend" value={`$${summary.estimated_total_spend.toFixed(0)}`} />
                </div>
              )}
            </CardContent>
          </Card>

          {/* ── Tabs ─────────────────────────────────────────────────────── */}
          <div className="flex bg-slate-100 rounded-2xl p-1 w-full sm:w-auto sm:inline-flex">
            {(['lists', 'scans'] as ActiveTab[]).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  activeTab === tab
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {tab === 'lists' ? (
                  <><ShoppingCart size={14} className="inline mr-1.5" />Grocery Lists ({groceryLists.length})</>
                ) : (
                  <><Camera size={14} className="inline mr-1.5" />Scan History ({scans.length})</>
                )}
              </button>
            ))}
          </div>

          {/* ── Grocery Lists Tab ─────────────────────────────────────────── */}
          {activeTab === 'lists' && (
            <div className="space-y-3">
              {groceryLists.length === 0 ? (
                <Card className="rounded-3xl border-slate-100 shadow-sm">
                  <CardContent className="p-0">
                    <EmptyState
                      icon={<ShoppingCart size={48} />}
                      title="No grocery lists yet"
                      body="Save a grocery list from the Smart List tab and it will appear here."
                    />
                  </CardContent>
                </Card>
              ) : groceryLists.map(gl => (
                <Card key={gl.id} className="rounded-2xl border-slate-100 shadow-sm hover:border-slate-200 transition-colors">
                  <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-bold text-slate-900 text-sm truncate">{gl.title}</span>
                        <Badge className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${STATUS_STYLES[gl.status]}`}>
                          {gl.status}
                        </Badge>
                      </div>
                      <div className="text-xs text-slate-400 mt-1 flex flex-wrap gap-x-3">
                        <span>{new Date(gl.created_at).toLocaleDateString('en-AU')}</span>
                        <span>{gl.items?.length ?? 0} items</span>
                        <span className="font-semibold text-slate-600">${gl.estimated_total_cost.toFixed(2)}</span>
                        {gl.cheapest_store && <span>Best: {gl.cheapest_store}</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl px-4"
                        onClick={() => { setSelectedList(gl); setView('grocery-detail'); }}
                      >
                        View
                      </Button>
                      <button
                        onClick={() => handleDeleteList(gl.id)}
                        className="text-slate-300 hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* ── Scan History Tab ─────────────────────────────────────────── */}
          {activeTab === 'scans' && (
            <div className="space-y-3">
              {scans.length === 0 ? (
                <Card className="rounded-3xl border-slate-100 shadow-sm">
                  <CardContent className="p-0">
                    <EmptyState
                      icon={<Camera size={48} />}
                      title="No fridge scans yet"
                      body="Run a scan in Vision Hub and the results will appear here automatically."
                    />
                  </CardContent>
                </Card>
              ) : scans.map(scan => (
                <Card key={scan.id} className="rounded-2xl border-slate-100 shadow-sm hover:border-slate-200 transition-colors">
                  <CardContent className="p-5 flex items-center gap-4">
                    {/* Thumbnail */}
                    <div className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 flex items-center justify-center border border-slate-100">
                      {scan.thumbnail
                        ? <img src={scan.thumbnail} alt="scan" className="w-full h-full object-cover" />
                        : <Box size={22} className="text-slate-300" />
                      }
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-slate-900 text-sm">Fridge Scan</div>
                      <div className="text-xs text-slate-400 mt-1 flex flex-wrap gap-x-3">
                        <span>{new Date(scan.created_at).toLocaleString('en-AU', { dateStyle: 'medium', timeStyle: 'short' })}</span>
                        <span>{scan.total_items_detected} items</span>
                        <span>Avg {(scan.average_confidence * 100).toFixed(1)}% confidence</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl px-4"
                        onClick={() => { setSelectedScan(scan); setView('scan-detail'); }}
                      >
                        View
                      </Button>
                      <button
                        onClick={() => handleDeleteScan(scan.id)}
                        className="text-slate-300 hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* ── Profile Actions ───────────────────────────────────────────── */}
          <Card className="rounded-3xl border-slate-100 shadow-sm">
            <CardContent className="p-6">
              <h3 className="font-bold text-slate-900 mb-4">Account Actions</h3>
              <div className="flex flex-wrap gap-3">
                <Button
                  onClick={handleExportAll}
                  disabled={groceryLists.length === 0}
                  variant="outline"
                  className="border-slate-200 text-slate-700 font-semibold rounded-xl flex items-center gap-2 hover:text-slate-900"
                >
                  <Download size={15} /> Export All Lists
                </Button>
                <Button
                  onClick={onLogout}
                  variant="outline"
                  className="border-red-100 text-red-600 font-semibold rounded-xl flex items-center gap-2 hover:bg-red-50 hover:text-red-700"
                >
                  <LogOut size={15} /> Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
