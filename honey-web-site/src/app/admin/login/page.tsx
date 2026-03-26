'use client';
import { useState } from 'react';
import { supabase } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      router.push('/admin/dashboard');
    } catch (err: any) {
      setError(err.message || 'Une erreur est survenue lors de la connexion.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-amber-50 flex items-center justify-center px-4'>
      <div className='max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border border-amber-100'>
        <div className='text-center mb-8'>
          <span className='text-4xl mb-4 block'>🍯</span>
          <h1 className='text-3xl font-bold text-stone-800 font-heading'>Administration</h1>
          <p className='text-stone-500 font-body mt-2'>Connectez-vous pour gérer vos produits</p>
        </div>

        <form onSubmit={handleLogin} className='space-y-6'>
          {error && (
            <div className='alert alert-error text-sm py-3 rounded-xl'>
              <span>{error}</span>
            </div>
          )}

          <div className='form-control'>
            <label className='label'>
              <span className='label-text font-semibold text-stone-700'>E-mail</span>
            </label>
            <input
              type='email'
              placeholder='admin@example.com'
              className='input input-bordered w-full bg-stone-50 focus:border-amber-400'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className='form-control'>
            <label className='label'>
              <span className='label-text font-semibold text-stone-700'>Mot de passe</span>
            </label>
            <input
              type='password'
              placeholder='••••••••'
              className='input input-bordered w-full bg-stone-50 focus:border-amber-400'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type='submit'
            className={`btn btn-warning w-full font-bold text-amber-900 mt-4 ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <div className='mt-8 text-center'>
          <Link href='/' className='text-stone-400 hover:text-amber-600 transition-colors text-sm font-body'>
            ← Retour au site
          </Link>
        </div>
      </div>
    </div>
  );
}
