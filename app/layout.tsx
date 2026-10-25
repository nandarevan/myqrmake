import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://myqrmake.vercel.app"),
  title: "MyQR Make · Minimalist High Precision QR & Logo Generator",
  description:
    "Generate custom QR codes with high precision logo positioning, automatic 30% error correction, and instant high resolution image and PDF export.",
  keywords: [
    "QR Code Generator",
    "Custom Logo QR",
    "MyQR Make",
    "High Resolution QR",
    "PDF QR Export",
    "Minimalist QR",
  ],
  authors: [{ name: "Nanda Revan Saputro" }],
  openGraph: {
    title: "MyQR Make · Minimalist High Precision QR & Logo Generator",
    description:
      "Generate custom QR codes with high precision logo positioning, automatic 30% error correction, and instant high resolution image and PDF export.",
    url: "https://myqrmake.vercel.app",
    siteName: "MyQR Make",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MyQR Make Logo",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MyQR Make · Minimalist High Precision QR & Logo Generator",
    description:
      "Generate custom QR codes with high precision logo positioning, automatic 30% error correction, and instant high resolution image and PDF export.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/logo_square.jpg" },
      { url: "/logo_myqrmake.jpg" },
    ],
    shortcut: "/favicon.ico",
    apple: "/logo_square.jpg",
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
