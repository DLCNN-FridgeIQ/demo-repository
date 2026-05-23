import { useState } from 'react';
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

type UnauthView = 'landing' | 'login' | 'signup';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [unauthView, setUnauthView] = useState<UnauthView>('landing');
  const { isAuthenticated, login, register, logout } = useAuth();

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
          {activeTab === 'vision'    && <VisionHubPage />}
          {activeTab === 'list'      && <ListPage />}
          {activeTab === 'analytics' && <AnalyticsPage />}
          {activeTab === 'profile'   && <ProfilePage onLogout={logout} />}
        </main>

        <MobileNav activeTab={activeTab} onNavigate={setActiveTab} />
      </div>
    </div>
  );
}
