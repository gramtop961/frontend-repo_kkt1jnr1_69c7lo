import { LogOut, Shield } from 'lucide-react';

export default function Header({ isAuthed, onLogout, onNavigate }) {
  return (
    <header className="border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/50">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-indigo-600 text-white grid place-items-center">
            <Shield className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-xl font-semibold">Admin Portal</h1>
            <p className="text-sm text-slate-500">Manage device registrations</p>
          </div>
        </div>

        <nav className="flex items-center gap-2">
          {isAuthed && (
            <>
              <button
                onClick={() => onNavigate('home')}
                className="px-3 py-2 text-sm rounded-md hover:bg-slate-100"
              >
                Home
              </button>
              <button
                onClick={onLogout}
                className="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-md text-rose-700 hover:bg-rose-50"
              >
                <LogOut className="h-4 w-4" /> Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
