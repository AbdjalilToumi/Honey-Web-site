'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase/client';
import { useRouter, usePathname } from 'next/navigation';
import Loading from '@/components/Loading';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session && pathname !== '/admin/login') {
        router.push('/admin/login');
      } else {
        setAuthenticated(true);
      }
      setLoading(false);
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session && pathname !== '/admin/login') {
        setAuthenticated(false);
        router.push('/admin/login');
      } else {
        setAuthenticated(true);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, pathname]);

  if (loading) {
    return <Loading />;
  }

  // If we are on the login page, just show it
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // If not authenticated and not on login page, don't show anything (redirecting)
  if (!authenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <header className="bg-white border-b border-stone-200 px-6 py-4 flex justify-between items-center sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🍯</span>
          <h1 className="text-xl font-bold font-heading text-stone-800">Ifrane Miel Admin</h1>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={async () => {
              await supabase.auth.signOut();
              router.push('/admin/login');
            }}
            className="btn btn-ghost btn-sm text-stone-500 hover:text-red-600 font-body"
          >
            Déconnexion
          </button>
        </div>
      </header>
      <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
        {children}
      </main>
    </div>
  );
}
