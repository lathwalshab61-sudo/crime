import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import OverviewPage from './pages/Overview/OverviewPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import ForensicLabPage from './pages/ForensicLab/ForensicLabPage';
import LocationsPage from './pages/Locations/LocationsPage';
import EvidencePage from './pages/Evidence/EvidencePage';
import MorePage from './pages/More/MorePage';
import { GlobalSearchModal, NewEvidenceModal, AlertsModal } from './components/GlobalEvidenceModal';
import { createEvidence } from './services/api';

export default function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNewEvidenceOpen, setIsNewEvidenceOpen] = useState(false);
  const [isAlertsOpen, setIsAlertsOpen] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleAddEvidence = async (evidenceData) => {
    try {
      await createEvidence(evidenceData);
      setRefreshTrigger((prev) => prev + 1);
    } catch (err) {
      console.error('Failed to log evidence via backend:', err);
    }
  };

  return (
    <BrowserRouter>
      <div className="bg-surface font-body-md text-body-md text-on-surface antialiased flex flex-col min-h-screen">
        {/* Global Fixed Header */}
        <Header
          onSearchClick={() => setIsSearchOpen(true)}
          onAlertsClick={() => setIsAlertsOpen(true)}
        />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col relative w-full pt-16 pb-20 bg-surface">
          <Routes>
            <Route path="/" element={<OverviewPage />} />
            <Route path="/overview" element={<Navigate to="/" replace />} />
            <Route
              path="/dashboard"
              element={
                <DashboardPage
                  onOpenNewEvidenceModal={() => setIsNewEvidenceOpen(true)}
                  refreshTrigger={refreshTrigger}
                />
              }
            />
            <Route path="/forensic-lab" element={<ForensicLabPage />} />
            <Route path="/locations" element={<LocationsPage />} />
            <Route
              path="/evidence"
              element={
                <EvidencePage
                  onOpenNewEvidenceModal={() => setIsNewEvidenceOpen(true)}
                  refreshTrigger={refreshTrigger}
                />
              }
            />
            <Route path="/more" element={<MorePage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Global Fixed Bottom Navigation */}
        <BottomNav />

        {/* Global Modals */}
        <GlobalSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        <NewEvidenceModal
          isOpen={isNewEvidenceOpen}
          onClose={() => setIsNewEvidenceOpen(false)}
          onAddEvidence={handleAddEvidence}
        />
        <AlertsModal isOpen={isAlertsOpen} onClose={() => setIsAlertsOpen(false)} />
      </div>
    </BrowserRouter>
  );
}
