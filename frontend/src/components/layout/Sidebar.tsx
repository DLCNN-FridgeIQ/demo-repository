import { Home, Camera, ShoppingCart, BarChart2, Zap, LogOut, User } from 'lucide-react';
import { NavItem } from './NavItem';

interface SidebarProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
  onLogout: () => void;
}

export function Sidebar({ activeTab, onNavigate, onLogout }: SidebarProps) {
  return (
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
        <NavItem icon={<Home size={18} />} label="Dashboard" isActive={activeTab === 'dashboard'} onClick={() => onNavigate('dashboard')} />
        <NavItem icon={<Camera size={18} />} label="Vision Hub" isActive={activeTab === 'vision'} onClick={() => onNavigate('vision')} />
        <NavItem icon={<ShoppingCart size={18} />} label="Smart List" isActive={activeTab === 'list'} onClick={() => onNavigate('list')} />
        <div className="pt-4 pb-2" />
        <NavItem icon={<BarChart2 size={18} />} label="Analytics" isActive={activeTab === 'analytics'} onClick={() => onNavigate('analytics')} />
        <NavItem icon={<User size={18} />} label="Profile" isActive={activeTab === 'profile'} onClick={() => onNavigate('profile')} />
      </nav>

      <div className="p-4 border-t border-slate-100">
        <button
          onClick={onLogout}
          className="flex items-center gap-2 w-full px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut size={18} /> Sign Out
        </button>
      </div>
    </aside>
  );
}
