"use client";
import React, { useState } from "react";
import {
  Link as LinkIcon,
  Type,
  Wifi,
  Mail,
  User,
  Check,
} from "lucide-react";
import { QRConfig, ModuleStyle, EyeStyle } from "@/types";
import { Translations } from "@/lib/translations";

interface InputPanelProps {
  config: QRConfig;
  onChange: (updated: Partial<QRConfig>) => void;
  hasLogo?: boolean;
  children?: React.ReactNode;
  t?: Translations["inputPanel"];
}

type ContentCategory = "url" | "text" | "wifi" | "email" | "contact";

const TYPE_CONFIGS = [
  { id: "url" as ContentCategory, icon: LinkIcon },
  { id: "text" as ContentCategory, icon: Type },
  { id: "wifi" as ContentCategory, icon: Wifi },
  { id: "email" as ContentCategory, icon: Mail },
  { id: "contact" as ContentCategory, icon: User },
];

export const InputPanel: React.FC<InputPanelProps> = ({
  config,
  onChange,
  hasLogo = false,
  children,
  t,
}) => {
  const [activeCategory, setActiveCategory] = useState<ContentCategory>("url");

  const labels = t || {
    section1Title: "1. Masukkan Tautan atau Teks Anda",
    section1Desc: "Ketik atau tempel link website, teks, atau media sosial",
    typePresets: {
      url: "URL",
      text: "Teks",
      wifi: "WiFi",
      email: "Email",
      contact: "Kontak",
    },
    placeholders: {
      url: "Ketik atau tempel link website di sini...",
      text: "Ketik teks atau catatan yang ingin dibuatkan QR di sini...",
      wifi: "Ketik nama WiFi atau kata sandi jaringan di sini...",
      email: "Ketik alamat email penerima atau pesan di sini...",
      contact: "Ketik nama kontak, nomor telepon, atau detail vCard di sini...",
    },
    chars: "karakter",
    section2TitleWithLogo: "3. Pengaturan Pola dan Desain",
    section2TitleNoLogo: "2. Pengaturan Pola dan Desain",
    moduleShape: "Bentuk Titik Pola",
    shapes: {
      square: "Kotak Klasik",
      rounded: "Sudut Halus",
      dots: "Titik Modern",
    },
    eyeFrame: "Bentuk Sudut QR",
    eyes: {
      square: "Kotak Tegas",
      rounded: "Lengkung Lembut",
      circle: "Lingkaran Penuh",
    },
    darkColor: "Warna Pola QR",
    colors: {
      black: "Hitam Pekat",
      sea: "Biru Laut",
    },
    paletteInfo: "Palet 3 Warna Utama",
  };

  const currentPlaceholder =
    labels.placeholders[activeCategory] || labels.placeholders.url;

  return (
    <div className="space-y-6">
      {/* 1. Content Input Section */}
      <div className="space-y-3">
        <div>
          <label className="text-xs font-bold tracking-wider text-black dark:text-white uppercase flex items-center gap-2">
            <span>{labels.section1Title}</span>
          </label>
          <p className="text-[11px] text-black/50 dark:text-white/50 mt-0.5 text-justify">
            {labels.section1Desc}
          </p>
        </div>

        {/* Quick Format Type Category Selector (URL, Text, WiFi, Email, Contact) */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {TYPE_CONFIGS.map((item) => {
            const Icon = item.icon;
            const isSelected = activeCategory === item.id;
            const itemLabel = labels.typePresets[item.id];
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveCategory(item.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg transition-all cursor-pointer ${
                  isSelected
                    ? "bg-sea text-white border border-sea shadow-sm"
                    : "bg-white dark:bg-zinc-900 text-black/70 dark:text-white/70 border border-black/15 dark:border-white/15 hover:border-sea hover:text-sea dark:hover:border-sea"
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{itemLabel}</span>
              </button>
            );
          })}
        </div>

        {/* Text Input / Textarea with dynamic contextual placeholder */}
        <div className="relative">
          <textarea
            value={config.content}
            onChange={(e) => onChange({ content: e.target.value })}
            placeholder={currentPlaceholder}
            rows={3}
            className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-black/20 dark:border-white/20 bg-white dark:bg-zinc-950 text-black dark:text-white placeholder:text-black/40 dark:placeholder:text-white/40 focus:outline-none focus:border-sea focus:ring-2 focus:ring-sea/20 transition-all resize-none font-mono"
          />
          <div className="absolute right-2.5 bottom-2.5 text-[10px] text-black/40 dark:text-white/40 font-mono">
            {config.content.length} {labels.chars}
          </div>
        </div>
      </div>

      {/* Embedded Logo Panel (in Mode 2, positioned directly below Section 1) */}
      {children && (
        <div className="pt-6 border-t border-black/10 dark:border-white/10 animate-fadeIn">
          {children}
        </div>
      )}

      {/* Grid & Pattern Styling Options (Section 2 or 3) */}
      <div className="space-y-4 pt-4 border-t border-black/10 dark:border-white/10">
        <label className="text-xs font-bold tracking-wider text-black dark:text-white uppercase flex items-center gap-2">
          <span>{hasLogo ? labels.section2TitleWithLogo : labels.section2TitleNoLogo}</span>
        </label>

        {/* Module Shapes */}
        <div className="space-y-2">
          <span className="text-xs text-black/70 dark:text-white/70 font-medium">{labels.moduleShape}</span>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "square" as ModuleStyle, label: labels.shapes.square },
              { id: "rounded" as ModuleStyle, label: labels.shapes.rounded },
              { id: "dots" as ModuleStyle, label: labels.shapes.dots },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onChange({ moduleStyle: item.id })}
                className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all text-center cursor-pointer ${
                  config.moduleStyle === item.id
                    ? "border-sea bg-sea-50 dark:bg-sea-950/40 text-sea-800 dark:text-sea-300 ring-1 ring-sea"
                    : "border-black/15 dark:border-white/15 bg-white dark:bg-zinc-900 text-black/70 dark:text-white/70 hover:border-black/40 dark:hover:border-white/40 hover:text-black dark:hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Corner Eye Shapes */}
        <div className="space-y-2">
          <span className="text-xs text-black/70 dark:text-white/70 font-medium">{labels.eyeFrame}</span>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "square" as EyeStyle, label: labels.eyes.square },
              { id: "rounded" as EyeStyle, label: labels.eyes.rounded },
              { id: "circle" as EyeStyle, label: labels.eyes.circle },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => onChange({ eyeStyle: item.id })}
                className={`py-2 px-3 text-xs font-medium rounded-lg border transition-all text-center cursor-pointer ${
                  config.eyeStyle === item.id
                    ? "border-sea bg-sea-50 dark:bg-sea-950/40 text-sea-800 dark:text-sea-300 ring-1 ring-sea"
                    : "border-black/15 dark:border-white/15 bg-white dark:bg-zinc-900 text-black/70 dark:text-white/70 hover:border-black/40 dark:hover:border-white/40 hover:text-black dark:hover:text-white"
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
            <span className="text-xs text-black/70 dark:text-white/70 font-medium">{labels.darkColor}</span>
            <span className="text-[10px] text-black/50 dark:text-white/50 font-mono">
              {labels.paletteInfo}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => onChange({ darkColor: "#000000" })}
              className={`flex items-center justify-between p-2.5 rounded-lg border transition-all cursor-pointer ${
                config.darkColor === "#000000"
                  ? "border-sea bg-sea-50 dark:bg-sea-950/40 ring-1 ring-sea"
                  : "border-black/15 dark:border-white/15 bg-white dark:bg-zinc-900 hover:border-black/40 dark:hover:border-white/40"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-black border border-black/20" />
                <span className="text-xs font-semibold text-black dark:text-white">{labels.colors.black}</span>
              </div>
              {config.darkColor === "#000000" && (
                <Check className="w-3.5 h-3.5 text-sea" />
              )}
            </button>

            <button
              type="button"
              onClick={() => onChange({ darkColor: "#0284c7" })}
              className={`flex items-center justify-between p-2.5 rounded-lg border transition-all cursor-pointer ${
                config.darkColor === "#0284c7"
                  ? "border-sea bg-sea-50 dark:bg-sea-950/40 ring-1 ring-sea"
                  : "border-black/15 dark:border-white/15 bg-white dark:bg-zinc-900 hover:border-black/40 dark:hover:border-white/40"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-sea border border-sea/30" />
                <span className="text-xs font-semibold text-black dark:text-white">{labels.colors.sea}</span>
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
            <span className="text-xs text-black/70 dark:text-white/70 font-medium">Quiet Zone Margin</span>
            <span className="text-xs text-black dark:text-white font-semibold font-mono">
              {config.margin} modules
            </span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 4, 6].map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => onChange({ margin: m })}
                className={`py-1.5 text-xs font-medium rounded-md border transition-all cursor-pointer ${
                  config.margin === m
                    ? "border-sea bg-sea text-white"
                    : "border-black/15 dark:border-white/15 bg-white dark:bg-zinc-900 text-black/70 dark:text-white/70 hover:border-black/40 dark:hover:border-white/40 hover:text-black dark:hover:text-white"
                }`}
              >
                {m}x
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
