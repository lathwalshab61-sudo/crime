import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { path: '/', label: 'Overview', icon: 'radar' },
  { path: '/dashboard', label: 'Dashboard', icon: 'monitoring' },
  { path: '/forensic-lab', label: 'Lab', icon: 'biotech' },
  { path: '/locations', label: 'Locations', icon: 'share_location' },
  { path: '/evidence', label: 'Evidence', icon: 'inventory_2' },
  { path: '/more', label: 'More', icon: 'menu' },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 w-full z-50 pb-safe bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_-4px_24px_rgba(0,0,0,0.8)] border-t border-outline-variant/30">
      <div className="flex items-center justify-around h-16 px-space-xs max-w-lg mx-auto md:max-w-3xl">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-14 h-14 transition-colors select-none ${
                isActive
                  ? 'text-primary-container font-medium'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div className="relative">
                  <span className="material-symbols-outlined text-[22px] transition-transform duration-200">
                    {item.icon}
                  </span>
                  {isActive && (
                    <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary-container shadow-[0_0_6px_#00e5ff]"></span>
                  )}
                </div>
                <span className="font-label-sm text-label-sm mt-0.5 tracking-tight">
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

