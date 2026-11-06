import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Header({ onSearchClick, onAlertsClick }) {
  const location = useLocation();

  const getSubTitle = () => {
    switch (location.pathname) {
      case '/dashboard':
        return 'FORENSIC DEPT // Dashboard';
      case '/forensic-lab':
        return 'FORENSIC DEPT // Forensic Lab';
      case '/locations':
        return 'FORENSIC DEPT // Locations';
      case '/evidence':
        return 'FORENSIC DEPT // Evidence Vault';
      case '/more':
        return 'FORENSIC DEPT // System Settings';
      case '/':
      case '/overview':
      default:
        return 'FORENSIC DEPT // Overview';
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-surface-container-lowest/85 backdrop-blur-xl shadow-[0_4px_20px_rgba(3,7,18,0.75)] pt-safe">
      <div className="h-16 px-gutter flex items-center justify-between">
        <div className="flex items-center gap-space-sm">
          <img
            alt="CrimeScene Hub Logo"
            className="h-8 w-auto object-contain"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuASJ3haOULw2sHWp_dk7AqQnVxRAPJhxWir3GdpC5WFicTUa-BxQDLcrvdEd89gjuIc1c4YLUVxil5AN3VAQkt2w9KK4sHuYozxlTHu7hUI06RhBvZ19m9CtrvlaIlfbMAMSemUoD7ZNH8FE2VionTPlqPLVrIlmkZvTy8dog299tEcVwVnPhwKgQLa7Y2Sou77SL395HtBxWdXjZchaR9cUNKWarO5eWyvEDrlIvw"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-space-xs">
              <span className="font-headline-sm text-headline-sm text-primary tracking-tight">
                CrimeScene Hub
              </span>
              <span className="px-1.5 py-0.5 rounded-DEFAULT bg-primary-container/20 text-primary-container font-label-sm text-label-sm uppercase tracking-wider">
                SECURE
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse"></span>
              <span className="font-code-telemetry text-code-telemetry text-on-surface-variant uppercase">
                {getSubTitle()}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-space-xs">
          <button
            onClick={onSearchClick}
            aria-label="Global Evidence Search"
            className="w-11 h-11 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors active:scale-95"
          >
            <span className="material-symbols-outlined text-[20px]">search</span>
          </button>
          <button
            onClick={onAlertsClick}
            aria-label="Investigation Telemetry Alerts"
            className="w-11 h-11 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors relative active:scale-95"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-primary-container"></span>
          </button>
          <div className="w-11 h-11 flex items-center justify-center pl-1">
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover ring-1 ring-primary/20"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvisKsrmzgZL2ygjNOH-NZ4qhTodCYVkrRpA2pFDMXvsehSn7h92cmXuCjUTzsatZIKUIt_AFPm0IRaeWqyrpknTkioXdPPv9GUXliHFjsatsboujwVZgSeLnXvytJbSzwwE_CLUpDk1WAm9HbJoDU5U--KLvZplWi-n0pDlp5c-at-BPnHVAE3iZXElNubbk5dG-mtvJmeoIKgSoCO_27u0dycb2s75QnwDb6VCg"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

