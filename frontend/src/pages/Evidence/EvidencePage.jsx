import React, { useState, useEffect } from 'react';
import { getEvidence } from '../../services/api';

const defaultEvidence = [
  {
    tag: 'TAG-0824',
    name: '9mm Spent Cartridge Casing',
    location: 'Ballistics Lab // Shelf B-12',
    caseId: 'CR-2024-912',
    status: 'Secured in Vault',
    statusType: 'secured',
    hash: '0x8f2a...4b12',
    category: 'Ballistics',
    collectedBy: 'Det. Miller',
    collectedDate: '2026-11-04 14:22',
  },
  {
    tag: 'TAG-0825',
    name: 'Partial Latent Print on Glass',
    location: 'Biometrics Lab // AFIS Pending',
    caseId: 'CR-2024-884',
    status: 'Processing',
    statusType: 'processing',
    hash: '0x3c71...9e04',
    category: 'Biometrics',
    collectedBy: 'Insp. Thorne',
    collectedDate: '2026-11-05 09:10',
  },
  {
    tag: 'TAG-0826',
    name: 'Charred Timber Accelerant Sample',
    location: 'Chemistry Lab // GC-MS Rack 3',
    caseId: 'CR-2024-912',
    status: 'Analysis Complete',
    statusType: 'completed',
    hash: '0x7d91...2a55',
    category: 'Chemical',
    collectedBy: 'Dr. Vance',
    collectedDate: '2026-11-05 16:45',
  },
  {
    tag: 'TAG-0827',
    name: 'NVMe 512GB Write-Blocked SSD',
    location: 'Cyber Suite // Armored Safe 01',
    caseId: 'CR-2024-771',
    status: 'Secured in Vault',
    statusType: 'secured',
    hash: '0xe3b0...b855',
    category: 'Digital',
    collectedBy: 'Lab Tech Jin',
    collectedDate: '2026-11-06 08:30',
  },
];

export default function EvidencePage({ onOpenNewEvidenceModal, refreshTrigger }) {
  const [evidenceList, setEvidenceList] = useState(defaultEvidence);
  const [filterCategory, setFilterCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  const categories = ['All', 'Ballistics', 'Biometrics', 'Chemical', 'Digital'];

  useEffect(() => {
    async function loadData() {
      const serverData = await getEvidence(filterCategory, searchQuery);
      if (serverData && serverData.length > 0) {
        setEvidenceList(serverData);
      }
    }
    loadData();
  }, [filterCategory, searchQuery, refreshTrigger]);

  const filtered = evidenceList.filter((item) => {
    const matchesCat = filterCategory === 'All' || item.category === filterCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tag.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.caseId.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="flex flex-col w-full pb-6">
      <div className="flex flex-col w-full px-gutter space-y-4 max-w-4xl mx-auto mt-space-sm">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary-container text-[20px]">inventory_2</span>
              <h1 className="font-headline-md text-headline-md text-primary tracking-tight">Evidence Vault Ledger</h1>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Cryptographic chain-of-custody tracking with ISO 17025 compliance.
            </p>
          </div>
          <button
            onClick={onOpenNewEvidenceModal}
            className="px-3 py-2 bg-primary-container text-on-primary-container font-headline-sm text-xs uppercase tracking-wider rounded-lg flex items-center gap-1 shadow-sm active:scale-95 transition-transform hover:brightness-110"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            <span>LOG ITEM</span>
          </button>
        </div>

        {/* Search & Category Filter */}
        <div className="flex flex-col gap-2">
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by tag, item name, or case number..."
              className="w-full pl-9 pr-4 py-2 bg-surface-container rounded-lg text-sm text-on-surface placeholder:text-on-surface-variant/60 border border-outline-variant/30 focus:outline-none focus:border-primary-container"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider transition-colors select-none ${
                  filterCategory === cat
                    ? 'bg-primary-container text-on-primary-container font-semibold'
                    : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Evidence Items List */}
        <div className="space-y-2.5">
          {filtered.map((item) => (
            <div
              key={item.tag}
              onClick={() => setSelectedItem(item)}
              className="p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20 flex flex-col space-y-2 cursor-pointer hover:border-primary-container/40 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-tertiary-container/30 text-tertiary-fixed-dim font-code-telemetry text-xs font-semibold">
                    {item.tag}
                  </span>
                  <span className="font-code-telemetry text-xs text-on-surface-variant">
                    CASE #{item.caseId}
                  </span>
                </div>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full flex items-center gap-1 ${
                    item.statusType === 'secured'
                      ? 'bg-primary-container/20 text-primary-container'
                      : item.statusType === 'processing'
                      ? 'bg-secondary/20 text-secondary'
                      : 'bg-surface-container-highest text-on-surface'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                  {item.status}
                </span>
              </div>

              <div className="flex flex-col">
                <h4 className="font-headline-sm text-sm text-on-surface font-semibold">{item.name}</h4>
                <p className="font-body-sm text-xs text-on-surface-variant">{item.location}</p>
              </div>

              <div className="flex items-center justify-between pt-1 border-t border-surface-container-high/60 font-code-telemetry text-[11px] text-on-surface-variant">
                <span>By: {item.collectedBy}</span>
                <span className="text-primary truncate ml-2 max-w-[200px]">SHA: {item.hash}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Item Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-surface-container-low rounded-2xl p-6 border border-primary-container/40 shadow-2xl flex flex-col space-y-4">
            <div className="flex items-center justify-between border-b border-surface-container-high pb-2">
              <span className="font-code-telemetry text-xs text-tertiary-fixed-dim font-bold">
                {selectedItem.tag} // DOSSIER
              </span>
              <button onClick={() => setSelectedItem(null)} className="text-on-surface-variant hover:text-primary">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-1">
              <h3 className="font-headline-sm text-lg text-primary">{selectedItem.name}</h3>
              <p className="font-code-telemetry text-xs text-on-surface-variant">Case: {selectedItem.caseId}</p>
            </div>

            <div className="bg-surface-container-lowest p-3 rounded-lg border border-outline-variant/30 font-code-telemetry text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">STORAGE REPOSITORY:</span>
                <span className="text-on-surface">{selectedItem.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">COLLECTOR OFFICER:</span>
                <span className="text-on-surface">{selectedItem.collectedBy}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">INTAKE TIMESTAMP:</span>
                <span className="text-on-surface">{selectedItem.collectedDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant">CUSTODY HASH:</span>
                <span className="text-primary truncate max-w-[180px]">{selectedItem.hash}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedItem(null)}
              className="w-full py-2.5 bg-primary-container text-on-primary-container font-headline-sm text-sm uppercase tracking-wider rounded-lg hover:brightness-110"
            >
              Close Dossier
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
