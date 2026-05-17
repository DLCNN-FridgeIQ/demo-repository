import { useState } from 'react';
import './App.css';

import { 
  Home, Camera, ShoppingCart, BarChart2, Zap, DollarSign, AlertTriangle, 
  Package, ChevronRight, Upload, CheckCircle2, Box
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// --- MOCK DATA ---
const MOCK_GROCERY_LIST = [
  { id: 1, name: 'Eggs (Free Range 12pk)', category: 'Dairy', coles: 5.50, woolies: 5.40, aldi: 4.99 },
  { id: 2, name: 'Baby Spinach', category: 'Produce', coles: 3.00, woolies: 3.00, aldi: 2.49 },
  { id: 3, name: 'Chicken Breast (1kg)', category: 'Meat', coles: 11.00, woolies: 10.50, aldi: 9.99 },
  { id: 4, name: 'Greek Yoghurt (1kg)', category: 'Dairy', coles: 7.50, woolies: 7.00, aldi: 6.49 },
];

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    // STRICT ROOT CONTAINER: Forces the app to perfectly fit the screen height and width
    <div className="flex h-screen w-full bg-slate-50 font-sans text-slate-900 overflow-hidden">
      
      {/* --- DESKTOP SIDEBAR --- */}
      {/* Hidden on mobile (<768px), visible on desktop (>=768px) */}
      <aside className="hidden md:flex w-64 flex-col bg-white border-r border-slate-200 z-20 h-full flex-shrink-0">
        <div className="p-6 flex items-center gap-2 border-b border-slate-100">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <Zap className="text-white w-5 h-5 fill-current" />
          </div>
          <h1 className="font-extrabold text-xl tracking-tight text-slate-900">
            FridgIQ<span className="text-blue-600">.ai</span>
          </h1>
        </div>
        
        <nav className="flex-1 py-6 px-4 space-y-1.5">
          <NavItem icon={<Home size={18}/>} label="Dashboard" isActive={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <NavItem icon={<Camera size={18}/>} label="Vision Hub" isActive={activeTab === 'vision'} onClick={() => setActiveTab('vision')} />
          <NavItem icon={<ShoppingCart size={18}/>} label="Smart List" isActive={activeTab === 'list'} onClick={() => setActiveTab('list')} />
          <div className="pt-4 pb-2"></div>
          <NavItem icon={<BarChart2 size={18}/>} label="Analytics" isActive={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} />
        </nav>
      </aside>

      {/* --- MAIN CONTENT WRAPPER --- */}
      <div className="flex-1 flex flex-col h-full relative overflow-hidden">
        
        {/* MOBILE HEADER: Visible on mobile, hidden on desktop */}
        <header className="md:hidden flex items-center gap-2 bg-white p-4 border-b border-slate-100 flex-shrink-0 shadow-sm z-10">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <Zap className="text-white w-4 h-4 fill-current" />
          </div>
          <h1 className="font-extrabold text-lg tracking-tight text-slate-900">
            FridgIQ<span className="text-blue-600">.ai</span>
          </h1>
        </header>

        {/* SCROLLABLE VIEW AREA */}
        {/* pb-24 adds space at the bottom on mobile so content isn't hidden under the nav bar */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10 pb-24 md:pb-10">
          {activeTab === 'dashboard' && <DashboardView onNavigate={setActiveTab} />}
          {activeTab === 'vision' && <VisionHubView />}
          {activeTab === 'list' && <ListView />}
          {activeTab === 'analytics' && <AnalyticsView />}
        </main>

        {/* --- MOBILE BOTTOM NAVIGATION --- */}
        {/* Visible on mobile, hidden on desktop. Fixed to the bottom of the wrapper. */}
        <nav className="md:hidden absolute bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around items-center p-2 z-50 pb-safe shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)]">
          <MobileNavItem icon={<Home size={22}/>} label="Home" isActive={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <MobileNavItem icon={<Camera size={22}/>} label="Vision" isActive={activeTab === 'vision'} onClick={() => setActiveTab('vision')} />
          <MobileNavItem icon={<ShoppingCart size={22}/>} label="List" isActive={activeTab === 'list'} onClick={() => setActiveTab('list')} />
          <MobileNavItem icon={<BarChart2 size={22}/>} label="Stats" isActive={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} />
        </nav>
      </div>

    </div>
  );
}

// --- NAVIGATION SUB-COMPONENTS ---

function NavItem({ icon, label, isActive, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm font-semibold ${
        isActive ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

function MobileNavItem({ icon, label, isActive, onClick }: any) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center justify-center w-full py-2 gap-1 transition-colors ${isActive ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}>
      {icon}
      <span className="text-[10px] font-bold">{label}</span>
    </button>
  );
}

// --- DASHBOARD VIEW ---

function DashboardView({ onNavigate }: any) {
  return (
    <div className="space-y-6 md:space-y-8 max-w-5xl mx-auto">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Welcome back, Chef!</h2>
        <p className="text-sm md:text-base text-slate-500 mt-1 md:mt-2">Here is the current status of your inventory.</p>
      </div>

      {/* THE MAGIC WRAPPER:
        grid-cols-1 = Stack one below the other on mobile
        md:grid-cols-3 = Sit side-by-side in 3 columns on desktop (768px and wider)
      */}
      <div className="grid grid-rows-1 md:grid-cols-3 gap-6 w-full">
        
        {/* Card 1: Est. Inventory Value */}
        <Card className="border-slate-100 shadow-sm rounded-2xl md:rounded-3xl w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-500">Est. Inventory Value</CardTitle>
            <div className="bg-emerald-50 p-1.5 rounded-md">
              <DollarSign className="h-5 w-5 text-emerald-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl md:text-3xl font-extrabold text-slate-900">$142.50</div>
            <p className="text-xs font-semibold text-emerald-600 mt-1 md:mt-2">+5.2% this week</p>
          </CardContent>
        </Card>
        
        {/* Card 2: Items Running Low */}
        <Card className="border-amber-100 shadow-sm rounded-2xl md:rounded-3xl bg-white w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-500">Items Running Low</CardTitle>
            <div className="bg-amber-50 p-1.5 rounded-md border border-amber-100">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl md:text-3xl font-extrabold text-amber-900">3 items</div>
            <p className="text-xs font-semibold text-amber-600 mt-1 md:mt-2">Requires attention</p>
          </CardContent>
        </Card>

        {/* Card 3: Projected Budget */}
        <Card className="border-slate-100 shadow-sm rounded-2xl md:rounded-3xl w-full">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-slate-500">Projected Budget</CardTitle>
            <div className="bg-blue-50 p-1.5 rounded-md">
              <ShoppingCart className="h-5 w-5 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl md:text-3xl font-extrabold text-slate-900">$85.00</div>
            <p className="text-xs font-semibold text-emerald-600 mt-1 md:mt-2">Based on usual habits</p>
          </CardContent>
        </Card>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mt-4">
        {/* Quick Actions */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Zap className="text-amber-400 h-5 w-5 fill-current" />
            <h3 className="font-bold text-lg md:text-xl">Quick Actions</h3>
          </div>
          <div className="flex flex-col gap-3">
            <button onClick={() => onNavigate('vision')} className="flex items-center justify-between p-4 bg-white border border-blue-100 rounded-2xl hover:border-blue-300 shadow-sm group transition-all w-full">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-2.5 rounded-xl"><Camera className="h-5 w-5 text-blue-600" /></div>
                <div className="text-left">
                  <div className="font-bold text-slate-900 text-sm md:text-base">Run New Fridge Scan</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">Update inventory via CNN</div>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-blue-500 group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={() => onNavigate('list')} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl hover:border-slate-300 shadow-sm group transition-all w-full">
              <div className="flex items-center gap-4">
                <div className="bg-emerald-100 p-2.5 rounded-xl"><ShoppingCart className="h-5 w-5 text-emerald-600" /></div>
                <div className="text-left">
                  <div className="font-bold text-slate-900 text-sm md:text-base">View Smart Grocery List</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">3 items added automatically</div>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Recent Scans */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Package className="text-slate-400 h-5 w-5" />
            <h3 className="font-bold text-lg md:text-xl">Recent Scans</h3>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
              <div className="flex items-center gap-4">
                <div className="bg-blue-50 p-2.5 rounded-xl border border-blue-100"><Box className="h-5 w-5 text-blue-600" /></div>
                <div>
                  <div className="font-bold text-slate-900 text-sm">Main Fridge Compartment</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">Today, 8:45 AM</div>
                </div>
              </div>
              <div className="recent-scan-badge">
                <span className="badge-count">14</span>
                <span className="badge-text">Items</span>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
              <div className="flex items-center gap-4">
                <div className="bg-emerald-50 p-2.5 rounded-xl border border-emerald-100"><Box className="h-5 w-5 text-emerald-600" /></div>
                <div>
                  <div className="font-bold text-slate-900 text-sm">Produce Drawer</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">Yesterday, 6:30 PM</div>
                </div>
              </div>
              <div className="recent-scan-badge">
                <span className="badge-count">5</span>
                <span className="badge-text">Items</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- VISION HUB VIEW ---

function VisionHubView() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Vision Hub</h2>
        <p className="text-sm md:text-base text-slate-500 mt-1 md:mt-2">Upload an image of your fridge for CNN object detection.</p>
      </div>
      <div className="mt-4 md:mt-8">
        <div className="bg-white rounded-2xl md:rounded-3xl p-4 md:p-8 border border-slate-100 shadow-sm w-full">
          <div className="border-2 border-dashed border-slate-200 bg-slate-50 rounded-xl md:rounded-2xl p-8 md:p-16 flex flex-col items-center justify-center text-center transition-colors hover:bg-slate-100">
            <div className="bg-blue-50 p-4 rounded-full mb-4 md:mb-6">
              <Upload className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2">Drag & Drop Fridge Image</h3>
            <p className="text-slate-500 mb-6 md:mb-8 max-w-sm text-xs md:text-sm">
              or tap here to use your mobile camera to take a photo of the open fridge.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 md:px-8 py-4 md:py-6 rounded-xl w-full md:w-auto shadow-md">
              Select Image
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- LIST VIEW ---

function ListView() {
  const handleDownloadList = () => {
    let fileContent = "# FridgIQ Smart Grocery List\n\n";
    MOCK_GROCERY_LIST.forEach((item) => {
      const minPrice = Math.min(item.coles, item.woolies, item.aldi);
      let store = '';
      if (minPrice === item.coles) store = 'Coles';
      else if (minPrice === item.woolies) store = 'Woolworths';
      else store = 'Aldi';
      fileContent += `- [ ] ${item.name} (${store}: $${minPrice.toFixed(2)})\n`;
    });
    const blob = new Blob([fileContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'smart-grocery-list.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-4 md:space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-4 mb-4 md:mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Smart Grocery List</h2>
          <p className="text-sm md:text-base text-slate-500 mt-1 md:mt-2">Auto-generated based on low/missing stock.</p>
        </div>
        
        <div className="flex bg-slate-100 p-1 rounded-xl border border-slate-200 w-full lg:w-auto">
          <button className="flex-1 lg:flex-none bg-white text-blue-600 font-semibold px-4 md:px-6 py-2.5 rounded-lg shadow-sm text-xs md:text-sm">
            Cheapest<br className="hidden md:block" /> Overall
          </button>
          <button className="flex-1 lg:flex-none text-slate-500 font-medium px-4 md:px-6 py-2.5 rounded-lg text-xs md:text-sm hover:text-slate-700">
            Single Store<br className="hidden md:block" /> (Aldi)
          </button>
        </div>
      </div>

      <Card className="rounded-2xl md:rounded-3xl border-slate-100 shadow-sm overflow-hidden w-full">
        <div className="overflow-x-auto w-full">
          <Table className="min-w-[600px] w-full">
            <TableHeader>
              <TableRow className="border-b border-slate-100 hover:bg-transparent">
                <TableHead className="w-[200px] md:w-[300px] text-xs font-bold text-slate-500 uppercase tracking-wider py-4 md:py-5 pl-4 md:pl-6">Item to Buy</TableHead>
                <TableHead className="text-center text-xs font-bold text-slate-500 uppercase tracking-wider">Coles</TableHead>
                <TableHead className="text-center text-xs font-bold text-slate-500 uppercase tracking-wider">Woolworths</TableHead>
                <TableHead className="text-center text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-50">Aldi</TableHead>
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
                    <TableCell className="text-center text-slate-600 font-medium text-sm md:text-base">
                      {item.coles === minPrice ? <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">${item.coles.toFixed(2)}</Badge> : `$${item.coles.toFixed(2)}`}
                    </TableCell>
                    <TableCell className="text-center text-slate-600 font-medium text-sm md:text-base">
                      {item.woolies === minPrice ? <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">${item.woolies.toFixed(2)}</Badge> : `$${item.woolies.toFixed(2)}`}
                    </TableCell>
                    <TableCell className="text-center bg-slate-50 text-sm md:text-base">
                      {item.aldi === minPrice ? <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">${item.aldi.toFixed(2)}</Badge> : `$${item.aldi.toFixed(2)}`}
                    </TableCell>
                  </TableRow>
                );
              })}
              <TableRow className="hover:bg-transparent">
                <TableCell className="font-bold text-slate-900 text-right pr-4 md:pr-8 py-4 md:py-6 text-sm md:text-base">Total Est. Cart:</TableCell>
                <TableCell className="text-center font-bold text-slate-600 text-sm md:text-base">$27.00</TableCell>
                <TableCell className="text-center font-bold text-slate-600 text-sm md:text-base">$25.90</TableCell>
                <TableCell className="text-center bg-blue-50 font-extrabold text-blue-700 text-base md:text-lg rounded-br-2xl md:rounded-br-3xl">$23.96</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Card>

      <div className="flex justify-end mt-4">
        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-md rounded-xl w-full md:w-auto px-6 py-6" onClick={handleDownloadList}>
          <ShoppingCart className="mr-2 h-5 w-5" /> Export to Notes App
        </Button>
      </div>

      <div className="flex justify-end mt-4">
        <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white font-bold shadow-md rounded-xl w-full md:w-auto px-6 py-6" onClick={handleDownloadList}>
          <ShoppingCart className="mr-2 h-5 w-5" /> Export to WhatsApp
        </Button>
      </div>
    </div>
  );
}

// --- ANALYTICS VIEW ---

function AnalyticsView() {
  const lineChartData = [
    { month: 'Jan', price: 4.80 }, { month: 'Feb', price: 4.90 }, { month: 'Mar', price: 4.90 },
    { month: 'Apr', price: 5.20 }, { month: 'May', price: 5.50 },
  ];

  const barChartData = [
    { week: 'Week 1', spend: 138 }, { week: 'Week 2', spend: 102 },
    { week: 'Week 3', spend: 145 }, { week: 'Week 4', spend: 85 },
  ];

  const CustomTooltip = ({ active, payload, label, isCurrency }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-xl shadow-lg border border-slate-100 z-50">
          <p className="font-semibold text-slate-500 mb-1">{label}</p>
          <p className={`font-bold text-lg ${isCurrency ? 'text-amber-500' : 'text-slate-900'}`}>
            ${isCurrency ? payload[0].value.toFixed(2) : payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-5xl mx-auto space-y-4 md:space-y-6">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Price Trends & Insights</h2>
        <p className="text-sm md:text-base text-slate-500 mt-1 md:mt-2">Track inflation and budget history based on your scans.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-8">
        <Card className="rounded-2xl md:rounded-3xl border-slate-100 shadow-sm p-1 md:p-2 flex flex-col justify-between h-[340px] md:h-[420px] w-full">
          <CardHeader className="pt-4 md:pt-6 px-4 md:px-6 pb-2">
            <CardTitle className="text-lg md:text-xl font-extrabold text-slate-900 tracking-tight">Staple Price Trend: Eggs (12pk)</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-end px-2 md:px-6 pb-4 md:pb-6 w-full">
            <div className="h-40 md:h-56 w-full mb-4 md:mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineChartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 500 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 500 }} tickFormatter={(val) => `$${val.toFixed(2)}`} domain={[4.30, 6.00]} ticks={[4.30, 4.75, 5.20, 5.65, 6.00]}/>
                  <Tooltip content={<CustomTooltip isCurrency />} cursor={{ stroke: '#f1f5f9', strokeWidth: 2 }} />
                  <Line type="monotone" dataKey="price" stroke="#f59e0b" strokeWidth={3} dot={{ r: 4, fill: '#fff', stroke: '#f59e0b', strokeWidth: 2 }} activeDot={{ r: 6, fill: '#f59e0b', stroke: '#fff' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-2 md:gap-3 text-slate-600 text-xs md:text-sm font-medium bg-slate-50 p-3 md:p-4 rounded-xl border border-slate-100 mx-2 md:mx-0">
               <AlertTriangle className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0 text-amber-500" />
               Prices for this staple have risen 14% over 5 months.
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl md:rounded-3xl border-slate-100 shadow-sm p-1 md:p-2 flex flex-col justify-between h-[340px] md:h-[420px] w-full">
          <CardHeader className="pt-4 md:pt-6 px-4 md:px-6 pb-2">
            <CardTitle className="text-lg md:text-xl font-extrabold text-slate-900 tracking-tight">Weekly Grocery Spend</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col justify-end px-2 md:px-6 pb-4 md:pb-6 w-full">
            <div className="h-40 md:h-56 w-full mb-4 md:mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barChartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 500 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 500 }} tickFormatter={(val) => `$${val}`} domain={[0, 160]} ticks={[0, 40, 80, 120, 160]} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
                  <Bar dataKey="spend" radius={[4, 4, 0, 0]} maxBarSize={40}>
                    {barChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.week === 'Week 4' ? '#6ee7b7' : '#7ba9f8'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-2 md:gap-3 text-slate-600 text-xs md:text-sm font-medium bg-emerald-50 p-3 md:p-4 rounded-xl border border-emerald-100 mx-2 md:mx-0">
               <CheckCircle2 className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0 text-emerald-500" />
               You saved $35 this week by optimizing your cart!
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}