"use strict";
import React from "react";
import {
  Link as LinkIcon,
  Type,
  Wifi,
  Mail,
  User,
  Shield,
  Layers,
  Palette,
  Maximize2,
  Check,
} from "lucide-react";
import { QRConfig, ModuleStyle, EyeStyle } from "@/types";

interface InputPanelProps {
  config: QRConfig;
  onChange: (updated: Partial<QRConfig>) => void;
  hasLogo?: boolean;
  children?: React.ReactNode;
}

const PRESETS = [
  { label: "URL", icon: LinkIcon, sample: "https://myqrmake.vercel.app" },
  { label: "Text", icon: Type, sample: "Welcome to MyQR Make 2026" },
  { label: "WiFi", icon: Wifi, sample: "WIFI:S:MyNetwork;T:WPA;P:SecurePass2026;;" },
  { label: "Email", icon: Mail, sample: "mailto:hello@myqrmake.com?subject=Inquiry" },
  { label: "Contact", icon: User, sample: "BEGIN:VCARD\nVERSION:3.0\nFN:Nanda Revan\nEMAIL:nanda@example.com\nEND:VCARD" },
];

export const InputPanel: React.FC<InputPanelProps> = ({
  config,
  onChange,
  hasLogo = false,
  children,
}) => {
  return (
    <div className="space-y-6">
      {/* 1. Friendly Content Input Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-xs font-bold tracking-wider text-black uppercase flex items-center gap-2">
              <span>1. Enter Your Link or Text</span>
            </label>
            <p className="text-[11px] text-black/50 mt-0.5">
              Ketik atau tempel link website, teks, atau media sosial
            </p>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {PRESETS.map((preset) => {
            const Icon = preset.icon;
            const isActive = config.content === preset.sample;
            return (
              <button
                key={preset.label}
                type="button"
                onClick={() => onChange({ content: preset.sample })}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                  isActive
                    ? "bg-sea text-white border border-sea shadow-sm"
                    : "bg-white text-black/70 border border-black/15 hover:border-sea hover:text-sea"
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{preset.label}</span>
              </button>
            );
          })}
        </div>

        {/* Text Input / Textarea */}
        <div className="relative">
          <textarea
            value={config.content}
            onChange={(e) => onChange({ content: e.target.value })}
            placeholder="Ketik atau tempel link di sini..."
            rows={3}
            className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-black/20 bg-white text-black placeholder:text-black/40 focus:outline-none focus:border-sea focus:ring-2 focus:ring-sea/20 transition-all resize-none font-mono"
          />
          <div className="absolute right-2.5 bottom-2.5 text-[10px] text-black/40 font-mono">
            {config.content.length} chars
          </div>
        </div>
      </div>

      {/* Embedded Logo Panel (in Mode 2, positioned directly below Section 1) */}
      {children && (
        <div className="pt-6 border-t border-black/10 animate-fadeIn">
          {children}
        </div>
      )}

      {/* Grid & Pattern Styling Options (Section 2 or 3) */}
      <div className="space-y-4 pt-4 border-t border-black/10">
        <label className="text-xs font-bold tracking-wider text-black uppercase flex items-center gap-2">
          <span>{hasLogo ? "3. Grid & Pattern Styling" : "2. Grid & Pattern Styling"}</span>
        </label>

        {/* Module Shapes */}
        <div className="space-y-2">
          <span className="text-xs text-black/70 font-medium">Module Shape</span>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "square" as ModuleStyle, label: "Classic Square" },
              { id: "rounded" as ModuleStyle, label: "Smooth Rounded" },
              { id: "dots" as ModuleStyle, label: "Modern Dots" },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onChange({ moduleStyle: item.id })}
                className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all text-center ${
                  config.moduleStyle === item.id
                    ? "border-sea bg-sea-50 text-sea-800 ring-1 ring-sea"
                    : "border-black/15 bg-white text-black/70 hover:border-black/40 hover:text-black"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Corner Eye Shapes */}
        <div className="space-y-2">
          <span className="text-xs text-black/70 font-medium">Corner Eye Frame</span>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "square" as EyeStyle, label: "Sharp Square" },
              { id: "rounded" as EyeStyle, label: "Soft Curve" },
              { id: "circle" as EyeStyle, label: "Full Circle" },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onChange({ eyeStyle: item.id })}
                className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all text-center ${
                  config.eyeStyle === item.id
                    ? "border-sea bg-sea-50 text-sea-800 ring-1 ring-sea"
                    : "border-black/15 bg-white text-black/70 hover:border-black/40 hover:text-black"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Strict Color Theme Selector: Deep Black or Sea Blue */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-black/70 font-medium">Dark Module Color</span>
            <span className="text-[10px] text-black/50 font-mono">
              Strict 3 Color Palette
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => onChange({ darkColor: "#000000" })}
              className={`flex items-center justify-between p-2.5 rounded-lg border transition-all ${
                config.darkColor === "#000000"
                  ? "border-sea bg-sea-50 ring-1 ring-sea"
                  : "border-black/15 bg-white hover:border-black/40"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-black border border-black/20" />
                <span className="text-xs font-semibold text-black">Deep Black</span>
              </div>
              {config.darkColor === "#000000" && (
                <Check className="w-3.5 h-3.5 text-sea" />
              )}
            </button>

            <button
              type="button"
              onClick={() => onChange({ darkColor: "#0284c7" })}
              className={`flex items-center justify-between p-2.5 rounded-lg border transition-all ${
                config.darkColor === "#0284c7"
                  ? "border-sea bg-sea-50 ring-1 ring-sea"
                  : "border-black/15 bg-white hover:border-black/40"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-sea border border-sea/30" />
                <span className="text-xs font-semibold text-black">Sea Blue</span>
              </div>
              {config.darkColor === "#0284c7" && (
                <Check className="w-3.5 h-3.5 text-sea" />
              )}
            </button>
          </div>
        </div>

        {/* Margin / Quiet Zone */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-black/70 font-medium">Quiet Zone Margin</span>
            <span className="text-xs text-black font-semibold">
              {config.margin} modules
            </span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 4, 6].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => onChange({ margin: m })}
                className={`py-1.5 text-xs font-medium rounded-md border transition-all ${
                  config.margin === m
                    ? "border-sea bg-sea text-white"
                    : "border-black/15 bg-white text-black/70 hover:border-black/40 hover:text-black"
                }`}
              >
                {m === 1 ? "Compact" : m === 2 ? "Normal" : m === 4 ? "Standard" : "Wide"}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
