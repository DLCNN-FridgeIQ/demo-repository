import { useState, useCallback } from 'react';
import './App.css';

import { Sidebar } from '@/components/layout/Sidebar';
import { MobileHeader } from '@/components/layout/MobileHeader';
import { MobileNav } from '@/components/layout/MobileNav';
import { LandingPage } from '@/pages/LandingPage';
import { LoginPage } from '@/pages/LoginPage';
import { SignUpPage } from '@/pages/SignUpPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { VisionHubPage } from '@/pages/VisionHubPage';
import { ListPage } from '@/pages/ListPage';
import { AnalyticsPage } from '@/pages/AnalyticsPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { useAuth } from '@/hooks/useAuth';
import type { GroceryItem } from '@/types';

type UnauthView = 'landing' | 'login' | 'signup';

export default function App() {
  const [activeTab, setActiveTab]     = useState('dashboard');
  const [unauthView, setUnauthView]   = useState<UnauthView>('landing');
  const [groceryList, setGroceryList] = useState<GroceryItem[]>([]);
  const { isAuthenticated, login, register, logout } = useAuth();

  const addToList = useCallback((item: GroceryItem) => {
    setGroceryList((prev) =>
      prev.find((i) => i.id === item.id) ? prev : [...prev, item]
    );
  }, []);

  const removeFromList = useCallback((id: number) => {
    setGroceryList((prev) => prev.filter((i) => i.id !== id));
  }, []);

  if (!isAuthenticated) {
    if (unauthView === 'landing') {
      return <LandingPage onTryNow={() => setUnauthView('login')} />;
    }
    if (unauthView === 'signup') {
      return (
        <SignUpPage
          onRegister={register}
          onGoToLogin={() => setUnauthView('login')}
        />
      );
    }
    return (
      <LoginPage
        onLogin={login}
        onGoToSignUp={() => setUnauthView('signup')}
      />
    );
  }

  return (
    <div className="flex h-screen h-[100dvh] w-full bg-slate-50 font-sans text-slate-900 overflow-hidden">
      <Sidebar activeTab={activeTab} onNavigate={setActiveTab} onLogout={logout} />

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <MobileHeader onLogout={logout} />

        <main className="flex-1 overflow-y-auto p-4 md:p-8 lg:p-10 pb-6 md:pb-10">
          {activeTab === 'dashboard' && <DashboardPage onNavigate={setActiveTab} />}
          {activeTab === 'vision'    && <VisionHubPage groceryList={groceryList} onAddToList={addToList} onNavigate={setActiveTab} />}
          {activeTab === 'list'      && (
            <ListPage
              groceryList={groceryList}
              onRemoveFromList={removeFromList}
              onNavigate={setActiveTab}
            />
          )}
          {activeTab === 'analytics' && <AnalyticsPage />}
          {activeTab === 'profile'   && <ProfilePage onLogout={logout} />}
        </main>

        <MobileNav activeTab={activeTab} onNavigate={setActiveTab} />
      </div>
    </div>
  );
}
