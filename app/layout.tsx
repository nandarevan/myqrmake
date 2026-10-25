import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Myqrmake · Minimalist High Precision QR & Logo Generator",
  description:
    "Production ready ultra minimalist QR code generator with dual menu modes, custom logo upload, flexible positioning, high error correction, and instant PDF/Image export.",
  keywords: [
    "QR Code Generator",
    "Custom Logo QR",
    "Myqrmake",
    "High Resolution QR",
    "PDF QR Export",
    "Minimalist QR",
  ],
  authors: [{ name: "Nanda Revan Saputro" }],
  openGraph: {
    title: "Myqrmake · Ultra Minimalist QR & Logo Generator",
    description:
      "Generate clean QR codes and embed custom brand logos with flexible positioning and vector PDF export.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-white text-black">
      <body className="min-h-full flex flex-col bg-white text-black antialiased">
        {children}
      </body>
    </html>
  );
}
