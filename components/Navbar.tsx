"use strict";
import React from "react";
import { QrCode, RefreshCw } from "lucide-react";

interface NavbarProps {
  onReset: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onReset }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/10 bg-white/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo_myqrmake.png"
              alt="MyQR Make"
              className="h-10 sm:h-11 w-auto object-contain transition-transform hover:scale-105"
            />
          </div>
          <div className="hidden lg:block pl-4 border-l border-black/15">
            <p className="text-xs text-black/60 font-medium">
              Ultra Minimalist High Precision QR & Logo Engine
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-3">
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
