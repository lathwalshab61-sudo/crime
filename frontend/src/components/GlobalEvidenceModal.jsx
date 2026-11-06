import React, { useState } from 'react';

export function GlobalSearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-lg bg-surface-container-low rounded-2xl p-5 border border-primary-container/40 shadow-2xl flex flex-col space-y-4">
        <div className="flex items-center justify-between border-b border-surface-container-high pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-container">search</span>
            <h3 className="font-headline-sm text-primary">Global Evidence Search</h3>
          </div>
          <button onClick={onClose} className="text-on-surface-variant hover:text-primary">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <input
          autoFocus
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Query AFIS, CODIS, Ballistics, or Incident logs..."
          className="w-full px-3.5 py-2.5 bg-surface-container rounded-lg text-sm text-on-surface placeholder:text-on-surface-variant/60 border border-outline-variant/30 focus:outline-none focus:border-primary-container"
        />

        <div className="space-y-1.5 font-code-telemetry text-xs">
          <div className="text-on-surface-variant uppercase text-[10px] tracking-wider">Suggested Queries</div>
          <div
            onClick={() => setQuery('#CR-2024-884')}
            className="p-2 rounded bg-surface-container hover:bg-surface-container-high cursor-pointer flex justify-between"
          >
            <span className="text-primary font-medium">#CR-2024-884</span>
            <span className="text-on-surface-variant">Subway Station Latent Print</span>
          </div>
          <div
            onClick={() => setQuery('9mm Spent Cartridge')}
            className="p-2 rounded bg-surface-container hover:bg-surface-container-high cursor-pointer flex justify-between"
          >
            <span className="text-primary font-medium">TAG-0824</span>
            <span className="text-on-surface-variant">Pier 44 Ballistics Sample</span>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-primary-container text-on-primary-container font-headline-sm text-xs uppercase tracking-wider rounded-lg"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

export function NewEvidenceModal({ isOpen, onClose, onAddEvidence }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Ballistics');
  const [location, setLocation] = useState('');
  const [caseId, setCaseId] = useState('CR-2024-912');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    if (onAddEvidence) {
      onAddEvidence({
        name,
        category,
        location: location || 'Forensic Intake Vault // Shelf A-1',
        caseId,
      });
    }
    setName('');
    setLocation('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-md bg-surface-container-low rounded-2xl p-6 border border-primary-container/40 shadow-2xl flex flex-col space-y-4">
        <div className="flex items-center justify-between border-b border-surface-container-high pb-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-container">add_box</span>
            <h3 className="font-headline-sm text-primary">Log New Evidence Item</h3>
          </div>
          <button onClick={onClose} className="text-on-surface-variant hover:text-primary">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 font-body-sm text-xs">
          <div>
            <label className="block text-on-surface-variant uppercase tracking-wider mb-1">
              Evidence Name / Description
            </label>
            <input
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. 7.62mm Bullet Fragment, Latent Knife Print..."
              className="w-full px-3 py-2 bg-surface-container rounded-lg text-on-surface border border-outline-variant/30 focus:outline-none focus:border-primary-container"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-on-surface-variant uppercase tracking-wider mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-surface-container rounded-lg text-on-surface border border-outline-variant/30 focus:outline-none focus:border-primary-container"
              >
                <option value="Ballistics">Ballistics</option>
                <option value="Biometrics">Biometrics</option>
                <option value="Chemical">Chemical</option>
                <option value="Digital">Digital</option>
                <option value="Serology">Serology</option>
              </select>
            </div>

            <div>
              <label className="block text-on-surface-variant uppercase tracking-wider mb-1">Case Number</label>
              <input
                type="text"
                value={caseId}
                onChange={(e) => setCaseId(e.target.value)}
                className="w-full px-3 py-2 bg-surface-container rounded-lg text-on-surface border border-outline-variant/30 focus:outline-none focus:border-primary-container"
              />
            </div>
          </div>

          <div>
            <label className="block text-on-surface-variant uppercase tracking-wider mb-1">Storage Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Ballistics Rack B-4, Cold Storage..."
              className="w-full px-3 py-2 bg-surface-container rounded-lg text-on-surface border border-outline-variant/30 focus:outline-none focus:border-primary-container"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-2.5 bg-primary-container text-on-primary-container font-headline-sm uppercase tracking-wider rounded-lg shadow-md hover:brightness-110 active:scale-[0.98] transition-all"
            >
              Sign &amp; Cryptographically Commit Log
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function AlertsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 bg-black/80 backdrop-blur-md">
      <div className="w-full max-w-md bg-surface-container-low rounded-2xl p-5 border border-primary-container/40 shadow-2xl flex flex-col space-y-3">
        <div className="flex items-center justify-between border-b border-surface-container-high pb-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-container">notifications</span>
            <h3 className="font-headline-sm text-primary">Telemetry Alerts</h3>
          </div>
          <button onClick={onClose} className="text-on-surface-variant hover:text-primary">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="space-y-2 font-code-telemetry text-xs">
          <div className="p-2.5 rounded bg-surface-container border border-primary-container/30">
            <div className="flex justify-between text-primary font-semibold mb-1">
              <span>DNA PHENOTYPING MATCH 94.6%</span>
              <span className="text-on-surface-variant">02m ago</span>
            </div>
            <p className="text-on-surface font-body-sm text-xs">
              Cold case #CR-2024-884 suspect phenotyping correlation verified with IAFIS.
            </p>
          </div>
          <div className="p-2.5 rounded bg-surface-container border border-outline-variant/30">
            <div className="flex justify-between text-tertiary-fixed-dim font-semibold mb-1">
              <span>PERIMETER TRIP SENSOR #P-04</span>
              <span className="text-on-surface-variant">14m ago</span>
            </div>
            <p className="text-on-surface font-body-sm text-xs">
              Northside Docks Pier 44 boundary sensor cleared as environmental artifact.
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2 bg-surface-container-highest text-primary font-headline-sm text-xs uppercase tracking-wider rounded-lg mt-2"
        >
          Dismiss Alerts
        </button>
      </div>
    </div>
  );
}

