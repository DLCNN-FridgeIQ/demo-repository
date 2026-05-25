import { Zap, LogOut } from 'lucide-react';

interface MobileHeaderProps {
  onLogout: () => void;
}

export function MobileHeader({ onLogout }: MobileHeaderProps) {
  return (
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
      <button
        onClick={onLogout}
        className="ml-auto text-slate-400 hover:text-red-500 transition-colors p-1"
      >
        <LogOut size={20} />
      </button>
    </header>
  );
}
