"use strict";
import React from "react";
import { QrCode, Sparkles, ShieldCheck, RefreshCw } from "lucide-react";

interface NavbarProps {
  onReset: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onReset }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/10 bg-white/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-black text-white flex items-center justify-center relative shadow-sm group transition-transform hover:scale-105">
            <QrCode className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-sea rounded-full ring-2 ring-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight text-black">
                LogoQR Studio
              </span>
              <span className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-sea-50 text-sea-700 border border-sea-200">
                Studio Edition
              </span>
            </div>
            <p className="text-xs text-black/60 hidden sm:block">
              Ultra Minimalist High Precision QR & Logo Engine
            </p>
          </div>
        </div>

        {/* Status Indicators & Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-black/10 bg-white text-xs text-black/70">
            <ShieldCheck className="w-4 h-4 text-sea" />
            <span className="font-medium text-black">High ECC (30%)</span>
            <span className="w-1.5 h-1.5 rounded-full bg-sea" />
            <span>Zero Data Loss</span>
          </div>

          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-black/15 text-black hover:border-sea hover:text-sea transition-all active:scale-95"
            title="Reset to default settings"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </div>
    </header>
  );
};
