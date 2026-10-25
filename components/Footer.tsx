"use client";
import React, { useState } from "react";
import { X, Shield, FileText } from "lucide-react";

export const Footer: React.FC = () => {
  const [modalType, setModalType] = useState<"privacy" | "terms" | null>(null);

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <footer className="w-full border-t border-black/10 bg-white py-6 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-black/60">
          {/* Copyright & Creator Info */}
          <div className="flex items-center gap-3 text-center md:text-left flex-wrap justify-center md:justify-start">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo_myqrmake.png"
              alt="MyQR Make"
              className="h-7 w-auto object-contain"
            />
            <div>
              <span>© 2026 MyQR Make. Dibuat oleh </span>
              <strong className="font-semibold text-black">Nanda Revan Saputro</strong>
              <span>. Hak cipta dilindungi.</span>
            </div>
          </div>

          {/* Navigation & Scroll To Top */}
          <div className="flex items-center gap-6 text-black/60">
            <button
              type="button"
              onClick={() => setModalType("privacy")}
              className="hover:text-sea transition-colors cursor-pointer"
            >
              Kebijakan Privasi
            </button>
            <button
              type="button"
              onClick={() => setModalType("terms")}
              className="hover:text-sea transition-colors cursor-pointer"
            >
              Syarat & Ketentuan
            </button>
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-sea transition-colors font-medium text-black cursor-pointer"
            >
              <span>Ke Atas</span>
              <span className="text-sm leading-none">↑</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Clean Minimalist Modal */}
      {modalType && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-md bg-white rounded-2xl border border-black/15 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-black/10">
              <div className="flex items-center gap-2">
                {modalType === "privacy" ? (
                  <Shield className="w-4 h-4 text-sea" />
                ) : (
                  <FileText className="w-4 h-4 text-sea" />
                )}
                <h3 className="text-sm font-bold text-black">
                  {modalType === "privacy" ? "Kebijakan Privasi" : "Syarat & Ketentuan"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setModalType(null)}
                className="p-1 text-black/50 hover:text-black rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs text-black/70 leading-relaxed space-y-2">
              {modalType === "privacy" ? (
                <>
                  <p>
                    MyQR Make sangat menghargai privasi Anda. Semua proses pembuatan QR code dan penyisipan logo dilakukan secara lokal di peramban browser perangkat Anda tanpa pengiriman data ke server luar.
                  </p>
                  <p>
                    Tidak ada riwayat URL, teks, maupun file gambar logo yang disimpan atau dibagikan ke pihak ketiga mana pun.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Layanan MyQR Make disediakan secara gratis dan terbuka untuk kebutuhan pribadi maupun komersial Anda.
                  </p>
                  <p>
                    Hasil unduhan gambar dan dokumen PDF bebas digunakan untuk keperluan branding, kemasan produk, maupun materi promosi tanpa batasan.
                  </p>
                </>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setModalType(null)}
                className="px-4 py-2 text-xs font-semibold rounded-lg bg-black text-white hover:bg-sea transition-colors cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
