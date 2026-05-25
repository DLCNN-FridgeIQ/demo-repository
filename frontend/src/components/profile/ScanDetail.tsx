import { ArrowLeft, Box } from 'lucide-react';
import type { ScanRecord } from '@/types';

interface ScanDetailProps {
  scan: ScanRecord;
  onBack: () => void;
}

export function ScanDetail({ scan, onBack }: ScanDetailProps) {
  // Aggregate detections: count occurrences per label
  const itemMap: Record<string, { count: number; avgConf: number; totalConf: number }> = {};
  for (const d of scan.detected_items ?? []) {
    if (!itemMap[d.name]) itemMap[d.name] = { count: 0, avgConf: 0, totalConf: 0 };
    itemMap[d.name].count++;
    itemMap[d.name].totalConf += d.confidence;
  }
  const items = Object.entries(itemMap).map(([name, v]) => ({
    name,
    count: v.count,
    avgConf: v.totalConf / v.count,
  })).sort((a, b) => b.avgConf - a.avgConf);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 font-semibold transition-colors">
          <ArrowLeft size={16} /> Back to Profile
        </button>
        <span className="text-xs text-slate-400 font-medium">
          {new Date(scan.created_at).toLocaleString('en-AU')}
        </span>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-slate-900">Fridge Scan Result</h2>
        <p className="text-sm text-slate-500 mt-1">
          {scan.total_items_detected} items detected · Avg confidence {(scan.average_confidence * 100).toFixed(1)}%
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Thumbnail */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 flex flex-col items-center justify-center min-h-[240px]">
          {scan.thumbnail ? (
            <img src={scan.thumbnail} alt="Fridge scan thumbnail" className="rounded-2xl object-contain max-h-[220px]" />
          ) : (
            <div className="flex flex-col items-center text-slate-300">
              <Box size={48} />
              <p className="text-sm mt-2 font-medium">No thumbnail</p>
            </div>
          )}
        </div>

        {/* Detection table */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-12 text-center">
              <p className="text-sm text-amber-600 font-bold mb-1">No items detected</p>
              <p className="text-xs text-slate-400">YOLOv5 couldn't identify any items in this scan.</p>
            </div>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="pl-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Item</th>
                  <th className="text-center py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Qty</th>
                  <th className="text-center py-4 text-xs font-bold text-slate-500 uppercase tracking-wider pr-6">Confidence</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => (
                  <tr key={i} className="border-b border-slate-50">
                    <td className="pl-6 py-3.5 font-bold text-slate-800 text-sm capitalize">{item.name}</td>
                    <td className="text-center py-3.5">
                      <span className="bg-blue-50 text-blue-700 text-xs font-extrabold px-2.5 py-1 rounded-lg border border-blue-100">
                        ×{item.count}
                      </span>
                    </td>
                    <td className="text-center py-3.5 pr-6">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-20 bg-slate-100 rounded-full h-1.5">
                          <div
                            className="bg-emerald-500 h-1.5 rounded-full"
                            style={{ width: `${(item.avgConf * 100).toFixed(0)}%` }}
                          />
                        </div>
                        <span className="text-xs font-semibold text-slate-600 w-10 text-right">
                          {(item.avgConf * 100).toFixed(1)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
