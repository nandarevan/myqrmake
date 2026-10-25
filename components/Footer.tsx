"use strict";
import React from "react";
import { QrCode, ShieldCheck } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-black/10 bg-white py-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-black/60">
        {/* Brand & Info */}
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded bg-black text-white flex items-center justify-center overflow-hidden border border-black/10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo_myqrmake.jpg"
              alt="Myqrmake"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLElement).style.display = "none";
              }}
            />
          </div>
          <span className="font-semibold text-black">Myqrmake</span>
          <span>·</span>
          <span>Zero Config Vercel Ready</span>
        </div>

        {/* Footer Text Required: Nanda Revan Saputro and year 2026 strictly without any hyphens or dashes */}
        <div className="flex items-center gap-2 font-medium text-black">
          <span>Nanda Revan Saputro</span>
          <span className="w-1.5 h-1.5 rounded-full bg-sea" />
          <span>2026</span>
        </div>
      </div>
    </footer>
  );
};
