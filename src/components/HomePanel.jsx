import { Cpu, Unlink } from 'lucide-react';

export default function HomePanel({ onSelect }) {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-2">Welcome to admin portal!</h2>
      <p className="text-slate-600 mb-6">Follow these steps to use the portal effectively:</p>
      <ol className="list-decimal list-inside space-y-1 text-slate-700 mb-8">
        <li>Use the Register option to add a new device by IMEI.</li>
        <li>Search an existing device to review ownership details.</li>
        <li>De-register a device when it should no longer be linked to a user.</li>
        <li>Use the header to navigate and sign out securely when done.</li>
      </ol>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <button
          onClick={() => onSelect('register')}
          className="aspect-square rounded-full border bg-white shadow-sm hover:shadow group flex flex-col items-center justify-center gap-3 p-6"
          aria-label="Register new device"
        >
          <div className="h-14 w-14 rounded-full bg-indigo-600 text-white grid place-items-center group-hover:scale-105 transition">
            <Cpu className="h-8 w-8" />
          </div>
          <span className="text-lg font-medium">Register new device</span>
          <p className="text-sm text-slate-500 text-center max-w-[14ch]">Add a device by its IMEI number.</p>
        </button>

        <button
          onClick={() => onSelect('deregister')}
          className="aspect-square rounded-full border bg-white shadow-sm hover:shadow group flex flex-col items-center justify-center gap-3 p-6"
          aria-label="De-register a device"
        >
          <div className="h-14 w-14 rounded-full bg-rose-600 text-white grid place-items-center group-hover:scale-105 transition">
            <Unlink className="h-8 w-8" />
          </div>
          <span className="text-lg font-medium">De-register a device</span>
          <p className="text-sm text-slate-500 text-center max-w-[18ch]">Search and unlink the device.</p>
        </button>
      </div>
    </section>
  );
}
