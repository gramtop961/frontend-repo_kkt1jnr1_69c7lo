import { useMemo, useState } from 'react';
import { ArrowLeft, CheckCircle2, Info, Search, Smartphone, TriangleAlert } from 'lucide-react';

const imeiRegex = /^(\d{15})$/; // Simple IMEI validation: 15 digits

export default function DevicePages({ mode = 'register', userId = '', onBack }) {
  const isRegister = mode === 'register';
  const [deviceId, setDeviceId] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState(null);

  const isValidIMEI = useMemo(() => imeiRegex.test(deviceId), [deviceId]);

  const handleRegister = async () => {
    setStatus({ type: '', message: '' });
    setLoading(true);
    try {
      // Placeholder for real Firestore checks
      await new Promise((r) => setTimeout(r, 600));
      setStatus({ type: 'success', message: 'Device registered successfully' });
      setDeviceId('');
    } catch (e) {
      setStatus({ type: 'error', message: 'Registration failed' });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    setStatus({ type: '', message: '' });
    setDetails(null);
    setLoading(true);
    try {
      // Placeholder for real Firestore query and join with users
      await new Promise((r) => setTimeout(r, 600));
      setDetails({
        deviceId,
        isLinked: true,
        linkedToUser: 'user_123',
        linkedAt: new Date().toISOString(),
        registeredBy: 'admin_1',
        registeredAt: new Date().toISOString(),
        user: {
          uid: 'user_123',
          name: 'Jane Doe',
          email: 'jane@example.com',
          mobilenumber: '+1 555 123 4567',
          city: 'San Francisco',
        },
      });
    } catch (e) {
      setStatus({ type: 'error', message: 'Search failed' });
    } finally {
      setLoading(false);
    }
  };

  const handleDeregister = async () => {
    if (!deviceId) return;
    const ok = window.confirm(`Do you want to de-register the device-${deviceId}?`);
    if (!ok) return;

    setStatus({ type: '', message: '' });
    setLoading(true);
    try {
      // Placeholder for Firestore updates
      await new Promise((r) => setTimeout(r, 600));
      setStatus({ type: 'success', message: `De-registering device-${deviceId} is successful` });
    } catch (e) {
      setStatus({ type: 'error', message: 'De-registration failed' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="max-w-2xl">
      <button onClick={onBack} className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6">
        <ArrowLeft className="h-4 w-4" /> Back
      </button>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <Smartphone className="h-6 w-6 text-indigo-600" />
          {isRegister ? 'Register device' : 'De-register device'}
        </h2>
        <p className="text-slate-600 mt-1">
          {isRegister ? 'Enter a valid IMEI (15 digits) and submit.' : 'Search a device by ID, review details, and de-register.'}
        </p>
      </div>

      {status.message && (
        <div
          className={`mb-4 rounded border px-3 py-2 text-sm flex items-center gap-2 ${
            status.type === 'success'
              ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
              : status.type === 'error'
              ? 'border-rose-200 bg-rose-50 text-rose-700'
              : 'border-slate-200 bg-slate-50 text-slate-700'
          }`}
        >
          {status.type === 'success' ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : status.type === 'error' ? (
            <TriangleAlert className="h-4 w-4" />
          ) : (
            <Info className="h-4 w-4" />
          )}
          <span>{status.message}</span>
        </div>
      )}

      <div className="space-y-4 bg-white p-6 rounded-xl shadow-sm border">
        <div>
          <label className="block text-sm mb-1">Device ID (IMEI)</label>
          <input
            type="text"
            className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="15-digit IMEI"
            value={deviceId}
            onChange={(e) => setDeviceId(e.target.value.trim())}
          />
          {deviceId && !isValidIMEI && (
            <p className="text-xs text-rose-600 mt-1">IMEI must be exactly 15 digits.</p>
          )}
        </div>

        {isRegister ? (
          <button
            onClick={handleRegister}
            disabled={!isValidIMEI || loading}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-indigo-600 text-white px-4 py-2 font-medium hover:bg-indigo-700 disabled:opacity-50"
          >
            Register
          </button>
        ) : (
          <div className="space-y-3">
            <button
              onClick={handleSearch}
              disabled={!deviceId || loading}
              className="inline-flex items-center justify-center gap-2 rounded-md border px-4 py-2 hover:bg-slate-50 disabled:opacity-50"
            >
              <Search className="h-4 w-4" /> Search
            </button>

            <button
              onClick={handleDeregister}
              disabled={!deviceId || loading}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-rose-600 text-white px-4 py-2 font-medium hover:bg-rose-700 disabled:opacity-50"
            >
              De-register
            </button>

            {details && (
              <div className="mt-4 rounded-lg border bg-slate-50 p-4 text-sm">
                <p className="font-medium mb-2">Device details</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <DataRow label="Device ID" value={details.deviceId} />
                  <DataRow label="Linked" value={details.isLinked ? 'Yes' : 'No'} />
                  <DataRow label="Linked To" value={details.linkedToUser || '-'} />
                  <DataRow label="Linked At" value={details.linkedAt || '-'} />
                  <DataRow label="Registered By" value={details.registeredBy || '-'} />
                  <DataRow label="Registered At" value={details.registeredAt || '-'} />
                </div>

                {details.user && (
                  <div className="mt-4">
                    <p className="font-medium mb-2">User details</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <DataRow label="UID" value={details.user.uid} />
                      <DataRow label="Name" value={details.user.name} />
                      <DataRow label="Email" value={details.user.email} />
                      <DataRow label="Mobile" value={details.user.mobilenumber} />
                      <DataRow label="City" value={details.user.city} />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

function DataRow({ label, value }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-slate-500">{label}</span>
      <span className="font-medium text-slate-800">{value}</span>
    </div>
  );
}
