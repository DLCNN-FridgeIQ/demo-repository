import { useState } from 'react';
import { ShoppingCart, Save, CheckCircle2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { MOCK_GROCERY_LIST } from '@/data/mockData';
import { profileService } from '@/services/profileService';

type StoreFilter = 'all' | 'coles' | 'woolies' | 'aldi';

export function ListPage() {
  const [selectedStore, setSelectedStore] = useState<StoreFilter>('all');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved]   = useState(false);

  const totalColes = MOCK_GROCERY_LIST.reduce((sum, item) => sum + item.coles, 0);
  const totalWoolies = MOCK_GROCERY_LIST.reduce((sum, item) => sum + item.woolies, 0);
  const totalAldi = MOCK_GROCERY_LIST.reduce((sum, item) => sum + item.aldi, 0);

  const buildListText = (format: 'markdown' | 'whatsapp'): { content: string; total: number } => {
    let content = '';
    let total = 0;
    const storeName = selectedStore === 'coles' ? 'Coles' : selectedStore === 'woolies' ? 'Woolworths' : 'Aldi';
    const isMd = format === 'markdown';
    const bold = (s: string) => isMd ? `**${s}**` : `*${s}*`;
    const checkbox = isMd ? '- [ ]' : '☐';

    if (selectedStore === 'all') {
      content = `${bold('FridgIQ Smart Grocery List - Cheapest Overall')}\n\n`;
      MOCK_GROCERY_LIST.forEach((item) => {
        const minPrice = Math.min(item.coles, item.woolies, item.aldi);
        const store = minPrice === item.coles ? 'Coles' : minPrice === item.woolies ? 'Woolworths' : 'Aldi';
        content += `${checkbox} ${item.name} (${store}: $${minPrice.toFixed(2)})\n`;
        total += minPrice;
      });
      content += `\n${bold(`Total Est. Cheapest Cart: $${total.toFixed(2)}`)}`;
    } else {
      content = `${bold(`FridgIQ Smart Grocery List - ${storeName} Only`)}\n\n`;
      MOCK_GROCERY_LIST.forEach((item) => {
        const price = selectedStore === 'coles' ? item.coles : selectedStore === 'woolies' ? item.woolies : item.aldi;
        content += `${checkbox} ${item.name} (${storeName}: $${price.toFixed(2)})\n`;
        total += price;
      });
      content += `\n${bold(`Total Est. ${storeName} Cart: $${total.toFixed(2)}`)}`;
    }

    return { content, total };
  };

  const handleDownloadList = () => {
    const { content } = buildListText('markdown');
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `smart-grocery-list-${selectedStore}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExportWhatsApp = () => {
    const { content } = buildListText('whatsapp');
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(content)}`, '_blank');
  };

  const handleSaveToProfile = async () => {
    setSaving(true);
    setSaved(false);
    try {
      const cheapestTotals = {
        Coles: totalColes,
        Woolworths: totalWoolies,
        Aldi: totalAldi,
      };
      const cheapestStore = Object.entries(cheapestTotals).sort((a, b) => a[1] - b[1])[0][0];
      const title = `Grocery List — ${new Date().toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })}`;
      await profileService.createGroceryList({
        title,
        items: MOCK_GROCERY_LIST as unknown[],
        estimated_total_cost: Math.min(totalColes, totalWoolies, totalAldi),
        cheapest_store: cheapestStore,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch { /* ignore */ } finally {
      setSaving(false);
    }
  };

  return (
    <div className={`mx-auto space-y-4 md:space-y-6 transition-all duration-500 ease-in-out ${selectedStore === 'all' ? 'max-w-5xl' : 'max-w-3xl'}`}>
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-4 mb-4 md:mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Smart Grocery List</h2>
          <p className="text-sm md:text-base text-slate-500 mt-1 md:mt-2">Auto-generated based on low/missing stock.</p>
        </div>

        <div className="relative w-full lg:w-64">
          <select
            value={selectedStore}
            onChange={(e) => setSelectedStore(e.target.value as StoreFilter)}
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer pr-10"
          >
            <option value="all">Cheapest Overall (Comparison)</option>
            <option value="coles">Coles Only</option>
            <option value="woolies">Woolworths Only</option>
            <option value="aldi">Aldi Only</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>

      <Card className="rounded-2xl md:rounded-3xl border-slate-100 shadow-sm overflow-hidden w-full transition-all duration-300">
        <div className="overflow-x-auto w-full">
          <Table className={`${selectedStore === 'all' ? 'min-w-[600px]' : 'min-w-[320px]'} w-full`}>
            <TableHeader>
              <TableRow className="border-b border-slate-100 hover:bg-transparent">
                <TableHead className="w-[200px] md:w-[300px] text-xs font-bold text-slate-500 uppercase tracking-wider py-4 md:py-5 pl-4 md:pl-6">Item to Buy</TableHead>
                {(selectedStore === 'all' || selectedStore === 'coles') && (
                  <TableHead className={`text-center text-xs font-bold uppercase tracking-wider py-4 md:py-5 ${selectedStore === 'coles' ? 'bg-red-50 text-red-700 font-extrabold border-x border-red-100/50' : 'text-slate-500'}`}>Coles</TableHead>
                )}
                {(selectedStore === 'all' || selectedStore === 'woolies') && (
                  <TableHead className={`text-center text-xs font-bold uppercase tracking-wider py-4 md:py-5 ${selectedStore === 'woolies' ? 'bg-emerald-50 text-emerald-700 font-extrabold border-x border-emerald-100/50' : 'text-slate-500'}`}>Woolworths</TableHead>
                )}
                {(selectedStore === 'all' || selectedStore === 'aldi') && (
                  <TableHead className={`text-center text-xs font-bold uppercase tracking-wider py-4 md:py-5 ${selectedStore === 'aldi' ? 'bg-blue-50 text-blue-700 font-extrabold border-x border-blue-100/50' : 'bg-slate-50 text-slate-500'}`}>Aldi</TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_GROCERY_LIST.map((item) => {
                const minPrice = Math.min(item.coles, item.woolies, item.aldi);
                return (
                  <TableRow key={item.id} className="border-b border-slate-50 hover:bg-transparent">
                    <TableCell className="font-bold text-slate-900 py-4 md:py-5 pl-4 md:pl-6 text-sm md:text-base">
                      {item.name}
                      <div className="text-[10px] md:text-xs text-slate-400 font-medium mt-1">{item.category}</div>
                    </TableCell>
                    {(selectedStore === 'all' || selectedStore === 'coles') && (
                      <TableCell className={`text-center text-slate-600 font-medium text-sm md:text-base py-4 md:py-5 ${selectedStore === 'coles' ? 'bg-red-50/30 border-x border-red-50/50' : ''}`}>
                        {selectedStore === 'coles' || (selectedStore === 'all' && item.coles === minPrice) ? (
                          <Badge variant="secondary" className="bg-red-100 text-red-800 border-red-200 font-semibold">${item.coles.toFixed(2)}</Badge>
                        ) : `$${item.coles.toFixed(2)}`}
                      </TableCell>
                    )}
                    {(selectedStore === 'all' || selectedStore === 'woolies') && (
                      <TableCell className={`text-center text-slate-600 font-medium text-sm md:text-base py-4 md:py-5 ${selectedStore === 'woolies' ? 'bg-emerald-50/30 border-x border-emerald-50/50' : ''}`}>
                        {selectedStore === 'woolies' || (selectedStore === 'all' && item.woolies === minPrice) ? (
                          <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 border-emerald-200 font-semibold">${item.woolies.toFixed(2)}</Badge>
                        ) : `$${item.woolies.toFixed(2)}`}
                      </TableCell>
                    )}
                    {(selectedStore === 'all' || selectedStore === 'aldi') && (
                      <TableCell className={`text-center text-sm md:text-base py-4 md:py-5 ${selectedStore === 'aldi' ? 'bg-blue-50/30 border-x border-blue-50/50 text-slate-600 font-medium' : 'bg-slate-50/50'}`}>
                        {selectedStore === 'aldi' || (selectedStore === 'all' && item.aldi === minPrice) ? (
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200 font-semibold">${item.aldi.toFixed(2)}</Badge>
                        ) : `$${item.aldi.toFixed(2)}`}
                      </TableCell>
                    )}
                  </TableRow>
                );
              })}
              <TableRow className="hover:bg-transparent">
                <TableCell className="font-bold text-slate-900 text-right pr-4 md:pr-8 py-4 md:py-6 text-sm md:text-base border-t border-slate-100">Total Est. Cart:</TableCell>
                {(selectedStore === 'all' || selectedStore === 'coles') && (
                  <TableCell className={`text-center font-extrabold text-base md:text-lg border-t border-slate-100 py-4 md:py-6 ${selectedStore === 'coles' ? 'text-red-700 bg-red-100/50 border-x border-red-100' : 'text-slate-600'}`}>
                    ${totalColes.toFixed(2)}
                  </TableCell>
                )}
                {(selectedStore === 'all' || selectedStore === 'woolies') && (
                  <TableCell className={`text-center font-extrabold text-base md:text-lg border-t border-slate-100 py-4 md:py-6 ${selectedStore === 'woolies' ? 'text-emerald-700 bg-emerald-100/50 border-x border-emerald-100' : 'text-slate-600'}`}>
                    ${totalWoolies.toFixed(2)}
                  </TableCell>
                )}
                {(selectedStore === 'all' || selectedStore === 'aldi') && (
                  <TableCell className={`text-center font-extrabold text-base md:text-lg border-t border-slate-100 py-4 md:py-6 ${selectedStore === 'aldi' ? 'text-blue-700 bg-blue-100/50 border-x border-blue-100' : selectedStore === 'all' ? 'text-blue-700 bg-blue-50 border-l border-blue-100' : 'text-slate-600'}`}>
                    ${totalAldi.toFixed(2)}
                  </TableCell>
                )}
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Card>

      <div className="flex flex-col sm:flex-row justify-end gap-4 mt-6">
        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md rounded-xl w-full sm:w-auto px-6 py-6" onClick={handleDownloadList}>
          <ShoppingCart className="mr-2 h-5 w-5" /> Export to Notes App
        </Button>
        <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md rounded-xl w-full sm:w-auto px-6 py-6" onClick={handleExportWhatsApp}>
          <ShoppingCart className="mr-2 h-5 w-5" /> Export to WhatsApp
        </Button>
        <Button
          size="lg"
          disabled={saving || saved}
          className="bg-slate-900 hover:bg-slate-800 text-white font-bold shadow-md rounded-xl w-full sm:w-auto px-6 py-6 disabled:opacity-70"
          onClick={handleSaveToProfile}
        >
          {saved
            ? <><CheckCircle2 className="mr-2 h-5 w-5 text-emerald-400" /> Saved!</>
            : <><Save className="mr-2 h-5 w-5" /> Save to Profile</>
          }
        </Button>
      </div>
    </div>
  );
}
