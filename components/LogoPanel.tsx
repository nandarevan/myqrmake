"use strict";
import React, { useRef, useState } from "react";
import {
  UploadCloud,
  X,
  AlertCircle,
  Sparkles,
  Sliders,
  Check,
  Maximize,
  HelpCircle,
} from "lucide-react";
import { LogoConfig, LogoPosition, LogoShape, WarningState } from "@/types";

interface LogoPanelProps {
  config: LogoConfig;
  onChange: (updated: Partial<LogoConfig>) => void;
  onClear: () => void;
}

const POSITIONS: { id: LogoPosition; label: string; desc: string; gridArea: string }[] = [
  { id: "top-left", label: "Top Left", desc: "Upper left corner", gridArea: "col-start-1 row-start-1" },
  { id: "top-right", label: "Top Right", desc: "Upper right corner", gridArea: "col-start-3 row-start-1" },
  { id: "center", label: "Center", desc: "Balanced middle (Recommended)", gridArea: "col-start-2 row-start-2" },
  { id: "bottom-left", label: "Bottom Left", desc: "Lower left corner", gridArea: "col-start-1 row-start-3" },
  { id: "bottom-right", label: "Bottom Right", desc: "Lower right corner", gridArea: "col-start-3 row-start-3" },
];

export const LogoPanel: React.FC<LogoPanelProps> = ({
  config,
  onChange,
  onClear,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Smart Warning calculation
  const getWarningState = (): WarningState => {
    if (!config.dataUrl) {
      return { hasWarning: false, type: null, message: "", recommendation: "" };
    }

    // Check file size (> 2MB)
    if (config.sizeBytes > 2 * 1024 * 1024) {
      return {
        hasWarning: true,
        type: "file-size",
        message: `High file size (${(config.sizeBytes / (1024 * 1024)).toFixed(1)} MB). Large files may slow down rendering on mobile devices.`,
        recommendation: "MyQR Make automatically renders high DPI canvas downscaled.",
      };
    }

    // Check raw dimensions (> 1500px)
    if (config.width > 1500 || config.height > 1500) {
      return {
        hasWarning: true,
        type: "dimensions",
        message: `Large image dimensions (${config.width} × ${config.height}px). May consume higher canvas memory.`,
        recommendation: "Automatic fitting preserves clarity while maintaining crisp scanning performance.",
      };
    }

    // Check coverage scale (> 25% of QR area)
    if (config.scale > 0.25) {
      return {
        hasWarning: true,
        type: "coverage",
        message: `Logo size is ${Math.round(config.scale * 100)}% of QR grid. Sizes above 25% may reduce scan reliability on older cameras.`,
        recommendation: "Recommended: keep logo scale between 15% and 22% for 100% instant scanning.",
      };
    }

    return { hasWarning: false, type: null, message: "", recommendation: "" };
  };

  const warning = getWarningState();

  const handleFileProcess = (file: File) => {
    const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/svg+xml"];
    if (!validTypes.includes(file.type)) {
      alert("Please upload a PNG, JPEG, or SVG image.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      const img = new Image();
      img.onload = () => {
        onChange({
          file,
          dataUrl,
          name: file.name,
          sizeBytes: file.size,
          width: img.width,
          height: img.height,
        });
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Logo Uploader */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-xs font-bold tracking-wider text-black uppercase flex items-center gap-2">
              <span>2. Add & Position Your Custom Logo</span>
            </label>
            <p className="text-[11px] text-black/50 mt-0.5">
              Upload your brand logo (PNG, JPEG, SVG) and choose its spot
            </p>
          </div>
          {config.dataUrl && (
            <button
              type="button"
              onClick={onClear}
              className="text-[11px] font-medium text-black/60 hover:text-black flex items-center gap-1 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              <span>Remove Logo</span>
            </button>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".png,.jpg,.jpeg,.svg"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleFileProcess(e.target.files[0]);
            }
          }}
        />

        {!config.dataUrl ? (
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`w-full py-8 px-4 rounded-xl border-2 border-dashed transition-all flex flex-col items-center justify-center text-center cursor-pointer ${
              isDragging
                ? "border-sea bg-sea-50/50"
                : "border-black/20 bg-white hover:border-sea hover:bg-black/[0.01]"
            }`}
          >
            <div className="w-12 h-12 rounded-full bg-sea-50 text-sea border border-sea-200 flex items-center justify-center mb-3">
              <UploadCloud className="w-6 h-6" />
            </div>
            <p className="text-sm font-semibold text-black">
              Click to browse or drag & drop logo
            </p>
            <p className="text-xs text-black/50 mt-1">
              Supports transparent PNG, SVG, or high resolution JPEG
            </p>
          </div>
        ) : (
          <div className="flex items-center gap-4 p-3.5 rounded-xl border border-black/15 bg-white shadow-subtle">
            <div className="w-14 h-14 rounded-lg border border-black/10 bg-black/[0.02] flex items-center justify-center p-1.5 shrink-0 relative overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={config.dataUrl}
                alt="Logo preview"
                className="max-w-full max-h-full object-contain"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold text-black truncate">
                {config.name}
              </p>
              <p className="text-[11px] text-black/50 font-mono mt-0.5">
                {config.width} × {config.height}px ·{" "}
                {(config.sizeBytes / 1024).toFixed(1)} KB
              </p>
              <div className="flex items-center gap-2 mt-1.5">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-[11px] font-semibold text-sea hover:text-sea-700 underline"
                >
                  Replace Logo
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Smart Warning Banner (Strictly 3-color palette: Pure White, Deep Black, Sea Blue) */}
      {warning.hasWarning && (
        <div className="p-3.5 rounded-xl border border-black/20 bg-white shadow-sm space-y-2 animate-fadeIn">
          <div className="flex items-start gap-2.5">
            <div className="p-1 rounded bg-sea-50 text-sea border border-sea-200 shrink-0 mt-0.5">
              <AlertCircle className="w-4 h-4 text-sea" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-bold text-black leading-tight">
                Smart Scannability Advisory
              </p>
              <p className="text-xs text-black/80 mt-1 leading-relaxed">
                {warning.message}
              </p>
              <p className="text-[11px] text-black/50 mt-1">
                {warning.recommendation}
              </p>
            </div>
          </div>

          {warning.type === "coverage" && (
            <div className="pt-2 border-t border-black/10 flex justify-end">
              <button
                type="button"
                onClick={() => onChange({ scale: 0.2 })}
                className="px-3 py-1 text-xs font-semibold rounded-md bg-sea text-white hover:bg-sea-700 transition-colors shadow-sm"
              >
                Fit to 20% Safe Zone
              </button>
            </div>
          )}
        </div>
      )}

      {/* 2. Interactive Position Selector UI */}
      {config.dataUrl && (
        <div className="space-y-3 pt-3 border-t border-black/10">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold tracking-wider text-black uppercase">
              Flexible Logo Positioning
            </label>
            <span className="text-[11px] font-mono text-sea font-semibold capitalize">
              {config.position.replace("-", " ")}
            </span>
          </div>

          {/* 3x3 Visual Interactive Grid */}
          <div className="grid grid-cols-3 grid-rows-3 gap-2 p-3 rounded-xl border border-black/15 bg-black/[0.01]">
            {POSITIONS.map((pos) => {
              const isSelected = config.position === pos.id;
              return (
                <button
                  key={pos.id}
                  type="button"
                  onClick={() => onChange({ position: pos.id })}
                  className={`${pos.gridArea} p-2.5 rounded-lg border text-center transition-all flex flex-col items-center justify-center gap-1 group relative ${
                    isSelected
                      ? "border-sea bg-sea text-white shadow-md ring-2 ring-sea/30"
                      : "border-black/15 bg-white text-black/70 hover:border-black/40 hover:text-black"
                  }`}
                >
                  {/* Position Micro Dot Indicator */}
                  <div
                    className={`w-3 h-3 rounded-sm border transition-colors ${
                      isSelected
                        ? "bg-white border-white"
                        : "border-black/30 group-hover:border-black"
                    }`}
                  />
                  <span className="text-[11px] font-semibold leading-tight">
                    {pos.label}
                  </span>
                  {isSelected && (
                    <span className="text-[9px] opacity-80 hidden sm:block">
                      Active
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. Logo Scale & Pad Shape */}
      {config.dataUrl && (
        <div className="space-y-4 pt-3 border-t border-black/10">
          {/* Logo Scale Slider */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-black/70 font-medium">
                Logo Scale Size
              </span>
              <div className="flex items-center gap-1 font-mono text-xs font-bold text-black">
                <span>{Math.round(config.scale * 100)}%</span>
                <span className="text-[10px] text-black/40 font-normal">
                  (Safe max: 25%)
                </span>
              </div>
            </div>
            <input
              type="range"
              min="0.12"
              max="0.30"
              step="0.01"
              value={config.scale}
              onChange={(e) => onChange({ scale: parseFloat(e.target.value) })}
              className="w-full accent-sea cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-black/40 font-mono">
              <span>12% Minimal</span>
              <span>20% Optimal</span>
              <span>30% Maximum</span>
            </div>
          </div>

          {/* Logo Background Shape Pad */}
          <div className="space-y-2">
            <span className="text-xs text-black/70 font-medium">
              Logo Background Frame
            </span>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: "circle" as LogoShape, label: "Circle" },
                { id: "rounded" as LogoShape, label: "Rounded" },
                { id: "square" as LogoShape, label: "Square" },
                { id: "none" as LogoShape, label: "Direct Cut" },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onChange({ shape: item.id })}
                  className={`py-2 px-1 text-xs font-medium rounded-lg border transition-all text-center ${
                    config.shape === item.id
                      ? "border-sea bg-sea-50 text-sea-800 ring-1 ring-sea"
                      : "border-black/15 bg-white text-black/70 hover:border-black/40 hover:text-black"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          {/* Logo Inner Padding */}
          {config.shape !== "none" && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-black/70 font-medium">
                  Inner Pad Margin
                </span>
                <span className="text-xs font-mono text-black">
                  {config.padding}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="25"
                step="2"
                value={config.padding}
                onChange={(e) =>
                  onChange({ padding: parseInt(e.target.value, 10) })
                }
                className="w-full accent-sea cursor-pointer"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
