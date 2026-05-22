import { 
  Zap, DollarSign, AlertTriangle, ShoppingCart, Camera, ChevronRight, Package, Box 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardViewProps {
  onNavigate: (tab: string) => void;
}

export function DashboardView({ onNavigate }: DashboardViewProps) {
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
