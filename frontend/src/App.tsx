import { useState } from 'react';
import './App.css';

import { Home, Camera, ShoppingCart, BarChart2, Zap } from 'lucide-react';
import { NavItem, MobileNavItem } from '@/components/layout/NavItem';
import { DashboardView } from '@/components/views/DashboardView';
import { VisionHubView } from '@/components/views/VisionHubView';
import { ListView } from '@/components/views/ListView';
import { AnalyticsView } from '@/components/views/AnalyticsView';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    // STRICT ROOT CONTAINER: Forces the app to perfectly fit the dynamic screen height and width
    <div className="flex h-screen h-[100dvh] w-full bg-slate-50 font-sans text-slate-900 overflow-hidden">
      
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
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* MOBILE HEADER: Visible on mobile, hidden on desktop */}
        {/* Incorporates iOS status bar safe area to prevent overlapping carrier/clock */}
        <header 
          className="md:hidden flex items-center gap-2 bg-white px-4 pb-4 border-b border-slate-100 flex-shrink-0 shadow-sm z-10"
          style={{ paddingTop: 'calc(env(safe-area-inset-top) + 1rem)' }}
        >
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <Zap className="text-white w-4 h-4 fill-current" />
          </div>
          <h1 className="font-extrabold text-lg tracking-tight text-slate-900">
            FridgIQ<span className="text-blue-600">.ai</span>
          </h1>
        </header>

        {/* SCROLLABLE VIEW AREA */}
        {/* No longer needs massive pb-24 because the nav is static inside the flexbox column */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10 pb-6 md:pb-10">
          {activeTab === 'dashboard' && <DashboardView onNavigate={setActiveTab} />}
          {activeTab === 'vision' && <VisionHubView />}
          {activeTab === 'list' && <ListView />}
          {activeTab === 'analytics' && <AnalyticsView />}
        </main>

        {/* --- MOBILE BOTTOM NAVIGATION --- */}
        {/* Statically positioned at the bottom of the flex column to prevent overlays. */}
        {/* Uses calc(env(safe-area-inset-bottom) + 1.25rem) to float cleanly and give spacious padding below tab icons. */}
        <nav 
          className="md:hidden flex-shrink-0 bg-white border-t border-slate-200 flex justify-around items-center p-2 z-50 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)]"
          style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 1.25rem)' }}
        >
          <MobileNavItem icon={<Home size={22}/>} label="Home" isActive={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} />
          <MobileNavItem icon={<Camera size={22}/>} label="Vision" isActive={activeTab === 'vision'} onClick={() => setActiveTab('vision')} />
          <MobileNavItem icon={<ShoppingCart size={22}/>} label="List" isActive={activeTab === 'list'} onClick={() => setActiveTab('list')} />
          <MobileNavItem icon={<BarChart2 size={22}/>} label="Stats" isActive={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} />
        </nav>
      </div>

    </div>
  );
}