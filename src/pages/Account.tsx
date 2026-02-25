import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { toast } from 'sonner';

type Tab = 'login' | 'register';

export default function Account() {
  const [tab, setTab] = useState<Tab>('login');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.info('Authentication will be available when backend is connected.');
      setLoading(false);
    }, 1000);
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto px-4 sm:px-6 py-16 lg:py-24">
        {/* Tabs */}
        <div className="flex border-b border-border mb-8">
          <button
            onClick={() => setTab('login')}
            className={`flex-1 py-3 text-xs tracking-widest uppercase transition-colors ${
              tab === 'login' ? 'border-b-2 border-foreground text-foreground' : 'text-muted-foreground'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setTab('register')}
            className={`flex-1 py-3 text-xs tracking-widest uppercase transition-colors ${
              tab === 'register' ? 'border-b-2 border-foreground text-foreground' : 'text-muted-foreground'
            }`}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {tab === 'register' && (
            <div className="grid grid-cols-2 gap-4">
              <input required placeholder="First name" className="w-full border border-border px-4 py-3 text-sm bg-transparent focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground" />
              <input required placeholder="Last name" className="w-full border border-border px-4 py-3 text-sm bg-transparent focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground" />
            </div>
          )}
          <input required type="email" placeholder="Email address" className="w-full border border-border px-4 py-3 text-sm bg-transparent focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground" />
          <input required type="password" placeholder="Password" minLength={6} className="w-full border border-border px-4 py-3 text-sm bg-transparent focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground" />
          {tab === 'register' && (
            <input required type="password" placeholder="Confirm password" minLength={6} className="w-full border border-border px-4 py-3 text-sm bg-transparent focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground" />
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-foreground text-background py-3.5 text-xs tracking-widest uppercase hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {loading ? 'Please wait...' : tab === 'login' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        {tab === 'login' && (
          <p className="text-center mt-6 text-xs text-muted-foreground">
            Don't have an account?{' '}
            <button onClick={() => setTab('register')} className="underline hover:text-foreground transition-colors">
              Create one
            </button>
          </p>
        )}
      </div>
    </Layout>
  );
}
