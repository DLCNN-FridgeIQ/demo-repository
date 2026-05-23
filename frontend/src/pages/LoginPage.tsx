import { useState } from 'react';
import { Zap, Loader2, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LoginPageProps {
  onLogin: (username: string, password: string) => Promise<void>;
  onGoToSignUp: () => void;
}

export function LoginPage({ onLogin, onGoToSignUp }: LoginPageProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: { preventDefault(): void }) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await onLogin(username, password);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="bg-blue-600 p-2 rounded-xl">
            <Zap className="text-white w-6 h-6 fill-current" />
          </div>
          <h1 className="font-extrabold text-2xl tracking-tight text-slate-900">
            FridgIQ<span className="text-blue-600">.ai</span>
          </h1>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-1">Welcome back</h2>
          <p className="text-sm text-slate-500 mb-6">Sign in to your account to continue.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full px-4 py-3 pr-12 rounded-xl border border-slate-200 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-100 text-red-700 text-sm font-semibold px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 rounded-xl shadow-md"
            >
              {loading ? (
                <><Loader2 className="animate-spin mr-2 h-4 w-4" />Signing in...</>
              ) : (
                'Log In'
              )}
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-slate-500 mt-6">
          Don't have an account?{' '}
          <button
            onClick={onGoToSignUp}
            className="font-bold text-blue-600 hover:underline"
          >
            Create one
          </button>
        </p>

        <p className="text-center text-xs text-slate-400 mt-3">
          Demo credentials: <span className="font-semibold">admin / admin123</span>
        </p>
      </div>
    </div>
  );
}
