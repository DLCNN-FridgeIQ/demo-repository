import { Home, Camera, ShoppingCart, BarChart2, User } from 'lucide-react';
import { MobileNavItem } from './NavItem';

interface MobileNavProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
}

export function MobileNav({ activeTab, onNavigate }: MobileNavProps) {
  return (
    <nav
      className="md:hidden flex-shrink-0 bg-white border-t border-slate-200 flex justify-around items-center p-2 z-50 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)]"
      style={{ paddingBottom: 'calc(env(safe-area-inset-bottom) + 1.25rem)' }}
    >
      <MobileNavItem icon={<Home size={22} />} label="Home" isActive={activeTab === 'dashboard'} onClick={() => onNavigate('dashboard')} />
      <MobileNavItem icon={<Camera size={22} />} label="Vision" isActive={activeTab === 'vision'} onClick={() => onNavigate('vision')} />
      <MobileNavItem icon={<ShoppingCart size={22} />} label="List" isActive={activeTab === 'list'} onClick={() => onNavigate('list')} />
      <MobileNavItem icon={<BarChart2 size={22} />} label="Stats" isActive={activeTab === 'analytics'} onClick={() => onNavigate('analytics')} />
      <MobileNavItem icon={<User size={22} />} label="Profile" isActive={activeTab === 'profile'} onClick={() => onNavigate('profile')} />
    </nav>
  );
}
