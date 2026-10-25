"use strict";
import React from "react";
import { QrCode, Image as ImageIcon } from "lucide-react";
import { ModeType } from "@/types";

interface ModeToggleProps {
  currentMode: ModeType;
  onModeChange: (mode: ModeType) => void;
}

export const ModeToggle: React.FC<ModeToggleProps> = ({
  currentMode,
  onModeChange,
}) => {
  return (
    <div className="w-full bg-white p-1 rounded-xl border border-black/10 shadow-sm">
      <div className="grid grid-cols-2 gap-1.5" role="tablist">
        {/* Mode 1: Only QR Code */}
        <button
          role="tab"
          aria-selected={currentMode === "only-qr"}
          onClick={() => onModeChange("only-qr")}
          className={`flex items-center justify-center gap-2.5 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
            currentMode === "only-qr"
              ? "bg-black text-white shadow-sm ring-2 ring-sea/30"
              : "text-black/70 hover:text-black hover:bg-black/5"
          }`}
        >
          <QrCode
            className={`w-4 h-4 transition-colors ${
              currentMode === "only-qr" ? "text-sea-300" : "text-black/50"
            }`}
          />
          <div className="flex flex-col items-start text-left">
            <span className="leading-tight">Only QR Code</span>
            <span
              className={`text-[10px] font-normal ${
                currentMode === "only-qr" ? "text-white/70" : "text-black/40"
              }`}
            >
              Standard clean code
            </span>
          </div>
          {currentMode === "only-qr" && (
            <span className="ml-auto w-2 h-2 rounded-full bg-sea" />
          )}
        </button>

        {/* Mode 2: QR Code with Custom Logo */}
        <button
          role="tab"
          aria-selected={currentMode === "qr-with-logo"}
          onClick={() => onModeChange("qr-with-logo")}
          className={`flex items-center justify-center gap-2.5 py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer ${
            currentMode === "qr-with-logo"
              ? "bg-black text-white shadow-sm ring-2 ring-sea/30"
              : "text-black/70 hover:text-black hover:bg-black/5"
          }`}
        >
          <ImageIcon
            className={`w-4 h-4 transition-colors ${
              currentMode === "qr-with-logo" ? "text-sea-300" : "text-black/50"
            }`}
          />
          <div className="flex flex-col items-start text-left">
            <span className="leading-tight">QR with Custom Logo</span>
            <span
              className={`text-[10px] font-normal ${
                currentMode === "qr-with-logo" ? "text-white/70" : "text-black/40"
              }`}
            >
              Logo upload & position
            </span>
          </div>
          {currentMode === "qr-with-logo" && (
            <span className="ml-auto w-2 h-2 rounded-full bg-sea" />
          )}
        </button>
      </div>
    </div>
  );
};
