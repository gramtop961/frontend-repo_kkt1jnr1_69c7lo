import { useState } from 'react';
import Header from './components/Header.jsx';
import LoginForm from './components/LoginForm.jsx';
import HomePanel from './components/HomePanel.jsx';
import DevicePages from './components/DevicePages.jsx';

function App() {
  const [view, setView] = useState('login'); // 'login' | 'home' | 'register' | 'deregister'
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (userId) => {
    setUser({ userId });
    setView('home');
  };

  const handleLogout = () => {
    setUser(null);
    setView('login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-800">
      <Header
        isAuthed={!!user}
        onLogout={handleLogout}
        onNavigate={(target) => setView(target)}
      />

      <main className="mx-auto max-w-6xl px-4 py-8">
        {view === 'login' && (
          <LoginForm onSuccess={handleLoginSuccess} />
        )}

        {view === 'home' && (
          <HomePanel
            onSelect={(action) => {
              if (action === 'register') setView('register');
              if (action === 'deregister') setView('deregister');
            }}
          />
        )}

        {view === 'register' && (
          <DevicePages mode="register" userId={user?.userId || ''} onBack={() => setView('home')} />
        )}

        {view === 'deregister' && (
          <DevicePages mode="deregister" userId={user?.userId || ''} onBack={() => setView('home')} />
        )}
      </main>
    </div>
  );
}

export default App;
