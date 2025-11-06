import { useState } from 'react';
import { Lock, Mail } from 'lucide-react';

// This is a UX-only mock that demonstrates the desired flow visually.
// Integrate with Firebase Admin collection via your backend or client SDK as needed.
export default function LoginForm({ onSuccess }) {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!userId || !password) {
      setError('Please enter user id and password');
      return;
    }

    setLoading(true);
    try {
      // Placeholder for real auth. In a real app, verify against Firestore 'admin' collection.
      // For now, accept any non-empty credentials and pretend success.
      await new Promise((res) => setTimeout(res, 600));
      onSuccess(userId);
    } catch (err) {
      setError('Sign in failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-semibold">Sign in</h2>
        <p className="text-slate-500">Admins only. Use your credentials to continue.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-sm border">
        {error && (
          <div className="text-sm text-rose-700 bg-rose-50 border border-rose-200 px-3 py-2 rounded">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm mb-1">User ID</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              className="w-full rounded-md border pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="john.doe"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm mb-1">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="password"
              className="w-full rounded-md border pl-9 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 rounded-md bg-indigo-600 text-white py-2.5 font-medium hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}
