import { useState } from 'react';
import { ShoppingCart, Trash2, ArrowRight } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { GroceryItem } from "@/data/priceDatabase";

interface ListViewProps {
  groceryList: GroceryItem[];
  onRemoveFromList: (id: number) => void;
  onNavigate: (tab: string) => void;
}

export function ListView({ groceryList, onRemoveFromList, onNavigate }: ListViewProps) {
  const [selectedStore, setSelectedStore] = useState<string>('all'); // 'all', 'coles', 'woolies', 'aldi'

  const totalColes = groceryList.reduce((sum, item) => sum + item.coles, 0);
  const totalWoolies = groceryList.reduce((sum, item) => sum + item.woolies, 0);
  const totalAldi = groceryList.reduce((sum, item) => sum + item.aldi, 0);

  const handleDownloadList = () => {
    let fileContent = "";
    let total = 0;

    if (selectedStore === 'all') {
      fileContent = "# FridgIQ Smart Grocery List - Cheapest Overall\n\n";
      groceryList.forEach((item) => {
        const minPrice = Math.min(item.coles, item.woolies, item.aldi);
        let store = '';
        let range = '';
        if (minPrice === item.coles) {
          store = 'Coles';
          range = item.colesRange;
        } else if (minPrice === item.woolies) {
          store = 'Woolworths';
          range = item.wooliesRange;
        } else {
          store = 'Aldi';
          range = item.aldiRange;
        }

        fileContent += `- [ ] ${item.name} (${store}: ${range})\n`;
        total += minPrice;
      });
      fileContent += `\n**Total Est. Cheapest Cart (Min):** $${total.toFixed(2)}\n`;
    } else {
      const storeName = selectedStore === 'coles' ? 'Coles' : selectedStore === 'woolies' ? 'Woolworths' : 'Aldi';
      fileContent = `# FridgIQ Smart Grocery List - ${storeName} Only\n\n`;
      groceryList.forEach((item) => {
        const price = selectedStore === 'coles' ? item.coles : selectedStore === 'woolies' ? item.woolies : item.aldi;
        const range = selectedStore === 'coles' ? item.colesRange : selectedStore === 'woolies' ? item.wooliesRange : item.aldiRange;
        fileContent += `- [ ] ${item.name} (${storeName}: ${range})\n`;
        total += price;
      });
      fileContent += `\n**Total Est. ${storeName} Cart (Min):** $${total.toFixed(2)}\n`;
    }

    const blob = new Blob([fileContent], { type: 'text/markdown;charset=utf-8' });
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
    let whatsappText = "";
    let total = 0;

    if (selectedStore === 'all') {
      whatsappText = "*FridgIQ Smart Grocery List - Cheapest Overall*\n\n";
      groceryList.forEach((item) => {
        const minPrice = Math.min(item.coles, item.woolies, item.aldi);
        let store = '';
        let range = '';
        if (minPrice === item.coles) {
          store = 'Coles';
          range = item.colesRange;
        } else if (minPrice === item.woolies) {
          store = 'Woolworths';
          range = item.wooliesRange;
        } else {
          store = 'Aldi';
          range = item.aldiRange;
        }

        whatsappText += `☐ ${item.name} (${store}: ${range})\n`;
        total += minPrice;
      });
      whatsappText += `\n*Total Est. Cheapest Cart (Min):* $${total.toFixed(2)}`;
    } else {
      const storeName = selectedStore === 'coles' ? 'Coles' : selectedStore === 'woolies' ? 'Woolworths' : 'Aldi';
      whatsappText = `*FridgIQ Smart Grocery List - ${storeName} Only*\n\n`;
      groceryList.forEach((item) => {
        const price = selectedStore === 'coles' ? item.coles : selectedStore === 'woolies' ? item.woolies : item.aldi;
        const range = selectedStore === 'coles' ? item.colesRange : selectedStore === 'woolies' ? item.wooliesRange : item.aldiRange;
        whatsappText += `☐ ${item.name} (${storeName}: ${range})\n`;
        total += price;
      });
      whatsappText += `\n*Total Est. ${storeName} Cart (Min):* $${total.toFixed(2)}`;
    }

    const encodedText = encodeURIComponent(whatsappText);
    const url = `https://api.whatsapp.com/send?text=${encodedText}`;
    window.open(url, '_blank');
  };

  if (groceryList.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12 md:py-16 space-y-6">
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col items-center justify-center space-y-5">
          <div className="bg-blue-50 p-5 rounded-full text-blue-600">
            <ShoppingCart size={40} className="stroke-[1.5]" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Your Smart Grocery List is Empty</h3>
          <p className="text-slate-500 max-w-sm text-sm">
            Scan your fridge ingredients using the Vision Hub, see what items are missing, and add them directly to your shopping list!
          </p>
          <Button 
            onClick={() => onNavigate('vision')} 
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition-all mt-2 flex items-center gap-1.5"
          >
            Go to Vision Hub <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`mx-auto space-y-4 md:space-y-6 transition-all duration-500 ease-in-out ${selectedStore === 'all' ? 'max-w-5xl' : 'max-w-3xl'}`}>
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-4 mb-4 md:mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Smart Grocery List</h2>
          <p className="text-sm md:text-base text-slate-500 mt-1 md:mt-2">Selected missing items from your fridge scan.</p>
        </div>

        {/* Modern Custom Dropdown */}
        <div className="relative w-full lg:w-64">
          <select
            value={selectedStore}
            onChange={(e) => setSelectedStore(e.target.value)}
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
          <Table className={`${selectedStore === 'all' ? 'min-w-[700px]' : 'w-full'} w-full border-collapse`}>
            <TableHeader>
              <TableRow className="border-b border-slate-100 hover:bg-transparent">
                <TableHead className={`text-xs font-bold text-slate-500 uppercase tracking-wider py-3 md:py-5 pl-3 md:pl-6 ${selectedStore === 'all' ? 'w-[180px] md:w-[260px]' : 'w-auto'}`}>Item to Buy</TableHead>
                {(selectedStore === 'all' || selectedStore === 'coles') && (
                  <TableHead className={`text-center text-xs font-bold uppercase tracking-wider py-3 md:py-5 px-2 md:px-4 ${selectedStore === 'coles' ? 'bg-red-50 text-red-700 font-extrabold border-x border-red-100/50' : 'text-slate-500'}`}>Coles</TableHead>
                )}
                {(selectedStore === 'all' || selectedStore === 'woolies') && (
                  <TableHead className={`text-center text-xs font-bold uppercase tracking-wider py-3 md:py-5 px-2 md:px-4 ${selectedStore === 'woolies' ? 'bg-emerald-50 text-emerald-700 font-extrabold border-x border-emerald-100/50' : 'text-slate-500'}`}>
                    <span className="hidden sm:inline">Woolworths</span>
                    <span className="sm:hidden">Woolies</span>
                  </TableHead>
                )}
                {(selectedStore === 'all' || selectedStore === 'aldi') && (
                  <TableHead className={`text-center text-xs font-bold uppercase tracking-wider py-3 md:py-5 px-2 md:px-4 ${selectedStore === 'aldi' ? 'bg-blue-50 text-blue-700 font-extrabold border-x border-blue-100/50' : 'bg-slate-50 text-slate-500'}`}>Aldi</TableHead>
                )}
                <TableHead className="w-[50px] md:w-[60px] text-center text-xs font-bold text-slate-500 uppercase tracking-wider py-3 md:py-5 pr-3 md:pr-6">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {groceryList.map((item) => {
                const minPrice = Math.min(item.coles, item.woolies, item.aldi);
                return (
                  <TableRow key={item.id} className="border-b border-slate-50 hover:bg-transparent">
                    <TableCell className="font-bold text-slate-900 py-3 md:py-5 pl-3 md:pl-6 text-xs md:text-base leading-tight">
                      {item.name}
                      <div className="text-[9px] md:text-xs text-slate-400 font-medium mt-1">{item.category}</div>
                    </TableCell>
                    {(selectedStore === 'all' || selectedStore === 'coles') && (
                      <TableCell className={`text-center text-slate-600 font-medium text-xs md:text-base py-3 md:py-5 px-2 ${selectedStore === 'coles' ? 'bg-red-50/30 border-x border-red-50/50' : ''}`}>
                        {selectedStore === 'coles' || (selectedStore === 'all' && item.coles === minPrice) ? (
                          <Badge variant="secondary" className="bg-red-100 text-red-800 border-red-200 font-semibold px-2 py-0.5 text-[10px] md:text-sm">{item.colesRange}</Badge>
                        ) : (
                          item.colesRange
                        )}
                      </TableCell>
                    )}
                    {(selectedStore === 'all' || selectedStore === 'woolies') && (
                      <TableCell className={`text-center text-slate-600 font-medium text-xs md:text-base py-3 md:py-5 px-2 ${selectedStore === 'woolies' ? 'bg-emerald-50/30 border-x border-emerald-50/50' : ''}`}>
                        {selectedStore === 'woolies' || (selectedStore === 'all' && item.woolies === minPrice) ? (
                          <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 border-emerald-200 font-semibold px-2 py-0.5 text-[10px] md:text-sm">{item.wooliesRange}</Badge>
                        ) : (
                          item.wooliesRange
                        )}
                      </TableCell>
                    )}
                    {(selectedStore === 'all' || selectedStore === 'aldi') && (
                      <TableCell className={`text-center text-xs md:text-base py-3 md:py-5 px-2 ${selectedStore === 'aldi' ? 'bg-blue-50/30 border-x border-blue-50/50 text-slate-600 font-medium' : 'bg-slate-50/50'}`}>
                        {selectedStore === 'aldi' || (selectedStore === 'all' && item.aldi === minPrice) ? (
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200 font-semibold px-2 py-0.5 text-[10px] md:text-sm">{item.aldiRange}</Badge>
                        ) : (
                          item.aldiRange
                        )}
                      </TableCell>
                    )}
                    <TableCell className="text-center py-3 md:py-5 pr-3 md:pr-6">
                      <button 
                        onClick={() => onRemoveFromList(item.id)} 
                        className="text-slate-400 hover:text-red-600 transition-colors p-1.5 hover:bg-red-50 rounded-lg"
                        title="Remove item"
                      >
                        <Trash2 size={15} className="md:w-4 md:h-4" />
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })}
              <TableRow className="hover:bg-transparent bg-slate-50/20">
                <TableCell className="font-bold text-slate-900 text-right pr-3 py-3 md:py-6 text-xs md:text-base border-t border-slate-100">Total Est. Cart (Min):</TableCell>

                {(selectedStore === 'all' || selectedStore === 'coles') && (
                  <TableCell className={`text-center font-extrabold text-xs md:text-lg border-t border-slate-100 py-3 md:py-6 px-2 ${selectedStore === 'coles' ? 'text-red-700 bg-red-100/50 border-x border-red-100' : 'text-slate-600'}`}>
                    ${totalColes.toFixed(2)}
                  </TableCell>
                )}

                {(selectedStore === 'all' || selectedStore === 'woolies') && (
                  <TableCell className={`text-center font-extrabold text-xs md:text-lg border-t border-slate-100 py-3 md:py-6 px-2 ${selectedStore === 'woolies' ? 'text-emerald-700 bg-emerald-100/50 border-x border-emerald-100' : 'text-slate-600'}`}>
                    ${totalWoolies.toFixed(2)}
                  </TableCell>
                )}

                {(selectedStore === 'all' || selectedStore === 'aldi') && (
                  <TableCell className={`text-center font-extrabold text-xs md:text-lg border-t border-slate-100 py-3 md:py-6 px-2 ${selectedStore === 'aldi' ? 'text-blue-700 bg-blue-100/50 border-x border-blue-100' : selectedStore === 'all' ? 'text-blue-700 bg-blue-50 border-l border-blue-100' : 'text-slate-600'}`}>
                    ${totalAldi.toFixed(2)}
                  </TableCell>
                )}
                <TableCell className="border-t border-slate-100 pr-3" />
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Aligned Side-by-Side Flex Layout */}
      <div className="flex flex-col sm:flex-row justify-end gap-4 mt-6">
        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md rounded-xl w-full sm:w-auto px-6 py-6" onClick={handleDownloadList}>
          <ShoppingCart className="mr-2 h-5 w-5" /> Export to Notes App
        </Button>
        <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md rounded-xl w-full sm:w-auto px-6 py-6" onClick={handleExportWhatsApp}>
          <ShoppingCart className="mr-2 h-5 w-5" /> Export to WhatsApp
        </Button>
      </div>
    </div>
  );
}
