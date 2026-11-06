import React from 'react';

export default function MorePage() {
  return (
    <div className="flex flex-col w-full pb-6">
      <div className="flex flex-col w-full px-gutter space-y-4 max-w-4xl mx-auto mt-space-sm">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary-container text-[20px]">tune</span>
          <h1 className="font-headline-md text-headline-md text-primary tracking-tight">System &amp; Settings</h1>
        </div>

        {/* Terminal Configuration */}
        <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/20 space-y-3">
          <h3 className="font-headline-sm text-sm text-on-surface uppercase tracking-wide">
            Terminal Configuration
          </h3>
          <div className="space-y-2 text-xs font-code-telemetry">
            <div className="flex justify-between py-1.5 border-b border-surface-container-high/60">
              <span className="text-on-surface-variant">FORENSIC SUITE VERSION:</span>
              <span className="text-primary">v4.12.0 (Build 8849)</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-surface-container-high/60">
              <span className="text-on-surface-variant">CRYPTOGRAPHIC ACCELERATOR:</span>
              <span className="text-primary-container">AES-256-GCM / SHA-512</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-surface-container-high/60">
              <span className="text-on-surface-variant">JURISDICTIONAL JURISPRUDENCE:</span>
              <span className="text-on-surface">ISO/IEC 17025 Accredited</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-surface-container-high/60">
              <span className="text-on-surface-variant">AFIS / NGI SATELLITE RELAY:</span>
              <span className="text-tertiary-fixed-dim">ONLINE • LATENCY 14ms</span>
            </div>
          </div>
        </div>

        {/* Forensic Division Personnel */}
        <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/20 space-y-3">
          <h3 className="font-headline-sm text-sm text-on-surface uppercase tracking-wide">
            Operational Personnel
          </h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 rounded bg-surface-container">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary-container/20 text-primary-container flex items-center justify-center font-bold text-xs">
                  EV
                </div>
                <div>
                  <div className="text-sm font-medium text-on-surface">Dr. Elena Vance</div>
                  <div className="text-xs text-on-surface-variant font-code-telemetry">Lead Spectroscopist</div>
                </div>
              </div>
              <span className="text-xs text-primary-container font-code-telemetry">ACTIVE</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-surface-container">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-secondary/20 text-secondary flex items-center justify-center font-bold text-xs">
                  DM
                </div>
                <div>
                  <div className="text-sm font-medium text-on-surface">Detective Miller</div>
                  <div className="text-xs text-on-surface-variant font-code-telemetry">CSI Recon Unit 4</div>
                </div>
              </div>
              <span className="text-xs text-primary-container font-code-telemetry">ACTIVE</span>
            </div>
          </div>
        </div>

        {/* Security & Audit Notice */}
        <div className="p-4 rounded-xl bg-surface-container-low border border-outline-variant/20 flex items-start gap-3">
          <span className="material-symbols-outlined text-primary-container text-[22px] shrink-0">
            shield_lock
          </span>
          <div className="text-xs space-y-1">
            <div className="font-medium text-on-surface">Courtroom Chain-of-Custody Integrity Guarantee</div>
            <p className="text-on-surface-variant leading-relaxed">
              All digital evidence exports, spectrophotometer traces, and biometric classification records are non-repudiable and time-stamped via hardware cryptographic modules.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

