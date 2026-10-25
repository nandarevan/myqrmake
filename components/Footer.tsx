"use client";
import React, { useState } from "react";
import { X, Shield, FileText } from "lucide-react";
import { Translations } from "@/lib/translations";

interface FooterProps {
  t?: Translations["footer"];
}

export const Footer: React.FC<FooterProps> = ({ t }) => {
  const [modalType, setModalType] = useState<"privacy" | "terms" | null>(null);

  const labels = t || {
    copyrightPrefix: "© 2026 MyQR Make. Dibuat oleh ",
    author: "Nanda Revan Saputro",
    copyrightSuffix: ". Hak cipta dilindungi.",
    privacy: "Kebijakan Privasi",
    terms: "Syarat & Ketentuan",
    backToTop: "Ke Atas",
    close: "Tutup",
    privacyModal: {
      title: "Kebijakan Privasi",
      p1: "MyQR Make sangat menghargai privasi Anda. Semua proses pembuatan QR code dan penyisipan logo dilakukan secara lokal di peramban browser perangkat Anda tanpa pengiriman data ke server luar.",
      p2: "Tidak ada riwayat URL, teks, maupun file gambar logo yang disimpan atau dibagikan ke pihak ketiga mana pun.",
    },
    termsModal: {
      title: "Syarat & Ketentuan",
      p1: "Layanan MyQR Make disediakan secara gratis dan terbuka untuk kebutuhan pribadi maupun komersial Anda.",
      p2: "Hasil unduhan gambar dan dokumen PDF bebas digunakan untuk keperluan branding, kemasan produk, maupun materi promosi tanpa batasan.",
    },
  };

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <footer className="w-full border-t border-black/10 dark:border-white/10 bg-white dark:bg-zinc-950 py-6 mt-16 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-black/60 dark:text-white/60">
          {/* Copyright & Creator Info */}
          <div className="flex items-center gap-3 text-center md:text-left flex-wrap justify-center md:justify-start">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo_myqrmake.png"
              alt="MyQR Make"
              className="h-7 w-auto object-contain dark:brightness-110"
            />
            <div>
              <span>{labels.copyrightPrefix}</span>
              <strong className="font-semibold text-black dark:text-white">{labels.author}</strong>
              <span>{labels.copyrightSuffix}</span>
            </div>
          </div>

          {/* Navigation & Scroll To Top */}
          <div className="flex items-center gap-6 text-black/60 dark:text-white/60">
            <button
              type="button"
              onClick={() => setModalType("privacy")}
              className="hover:text-sea transition-colors cursor-pointer"
            >
              {labels.privacy}
            </button>
            <button
              type="button"
              onClick={() => setModalType("terms")}
              className="hover:text-sea transition-colors cursor-pointer"
            >
              {labels.terms}
            </button>
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-sea transition-colors font-medium text-black dark:text-white cursor-pointer"
            >
              <span>{labels.backToTop}</span>
              <span className="text-sm leading-none">↑</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Clean Minimalist Modal */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 dark:bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl border border-black/15 dark:border-white/15 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-black/10 dark:border-white/10">
              <div className="flex items-center gap-2">
                {modalType === "privacy" ? (
                  <Shield className="w-4 h-4 text-sea" />
                ) : (
                  <FileText className="w-4 h-4 text-sea" />
                )}
                <h3 className="text-sm font-bold text-black dark:text-white">
                  {modalType === "privacy" ? labels.privacyModal.title : labels.termsModal.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setModalType(null)}
                className="p-1 text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs text-black/70 dark:text-white/70 leading-relaxed space-y-2">
              {modalType === "privacy" ? (
                <>
                  <p>{labels.privacyModal.p1}</p>
                  <p>{labels.privacyModal.p2}</p>
                </>
              ) : (
                <>
                  <p>{labels.termsModal.p1}</p>
                  <p>{labels.termsModal.p2}</p>
                </>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setModalType(null)}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-black dark:bg-white text-white dark:text-black hover:bg-sea dark:hover:bg-sea dark:hover:text-white transition-colors cursor-pointer"
              >
                {labels.close}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
