import { ArrowLeft, ShoppingCart, CheckCircle2, Archive } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { GroceryListRecord, GroceryListStatus } from '@/types';

interface GroceryListDetailProps {
  list: GroceryListRecord;
  onBack: () => void;
  onStatusChange: (status: GroceryListStatus) => Promise<void>;
}

const STATUS_STYLES: Record<GroceryListStatus, string> = {
  Generated: 'bg-blue-50 text-blue-700 border-blue-100',
  Purchased: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  Archived:  'bg-slate-100 text-slate-500 border-slate-200',
};

function cheapestStore(item: { coles: number; woolies: number; aldi: number }) {
  const min = Math.min(item.coles, item.woolies, item.aldi);
  if (min === item.aldi)   return 'Aldi';
  if (min === item.woolies) return 'Woolworths';
  return 'Coles';
}

export function GroceryListDetail({ list, onBack, onStatusChange }: GroceryListDetailProps) {
  const items = list.items ?? [];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 font-semibold transition-colors">
          <ArrowLeft size={16} /> Back to Profile
        </button>
        <Badge className={`text-xs font-bold px-3 py-1 rounded-full border ${STATUS_STYLES[list.status]}`}>
          {list.status}
        </Badge>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-slate-900">{list.title}</h2>
        <p className="text-sm text-slate-500 mt-1">
          {new Date(list.created_at).toLocaleDateString('en-AU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          {list.cheapest_store && <span className="ml-2">· Best value at <strong>{list.cheapest_store}</strong></span>}
        </p>
      </div>

      {/* Items Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table className="min-w-[560px] w-full">
            <TableHeader>
              <TableRow className="border-b border-slate-100 hover:bg-transparent">
                <TableHead className="pl-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Item</TableHead>
                <TableHead className="text-center py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Coles</TableHead>
                <TableHead className="text-center py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Woolworths</TableHead>
                <TableHead className="text-center py-4 text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-50">Aldi</TableHead>
                <TableHead className="text-center py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Best</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item, i) => {
                const best = cheapestStore(item);
                const bestPrice = Math.min(item.coles, item.woolies, item.aldi);
                return (
                  <TableRow key={i} className="border-b border-slate-50 hover:bg-transparent">
                    <TableCell className="pl-6 py-4 font-bold text-slate-900 text-sm">
                      {item.name}
                      <div className="text-xs text-slate-400 font-normal mt-0.5">{item.category}</div>
                    </TableCell>
                    <TableCell className="text-center text-sm text-slate-600 py-4">${item.coles.toFixed(2)}</TableCell>
                    <TableCell className="text-center text-sm text-slate-600 py-4">${item.woolies.toFixed(2)}</TableCell>
                    <TableCell className="text-center text-sm text-slate-600 py-4 bg-slate-50/50">${item.aldi.toFixed(2)}</TableCell>
                    <TableCell className="text-center py-4">
                      <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 border-emerald-200 font-semibold text-xs">
                        {best} · ${bestPrice.toFixed(2)}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={4} className="pl-6 py-5 font-bold text-slate-900 text-right pr-8 border-t border-slate-100">
                  Estimated Total
                </TableCell>
                <TableCell className="text-center py-5 border-t border-slate-100">
                  <span className="font-extrabold text-lg text-slate-900">${list.estimated_total_cost.toFixed(2)}</span>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Status Actions */}
      {list.status !== 'Archived' && (
        <div className="flex flex-wrap gap-3 justify-end">
          {list.status === 'Generated' && (
            <Button onClick={() => onStatusChange('Purchased')} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl px-6 py-5 flex items-center gap-2">
              <CheckCircle2 size={16} /> Mark as Purchased
            </Button>
          )}
          <Button onClick={() => onStatusChange('Archived')} variant="outline" className="border-slate-200 text-slate-600 font-bold rounded-xl px-6 py-5 flex items-center gap-2 hover:text-slate-900">
            <Archive size={16} /> Archive
          </Button>
        </div>
      )}
    </div>
  );
}
