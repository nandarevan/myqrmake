export type Language = "id" | "en";

export interface Translations {
  navbar: {
    tagline: string;
    reset: string;
    resetTooltip: string;
  };
  hero: {
    title: string;
    subtitle: string;
    sampleLogoBtn: string;
    customLogoActive: string;
  };
  modeToggle: {
    heading: string;
    standardSublabel: string;
    logoSublabel: string;
    standardTitle: string;
    standardDesc: string;
    logoTitle: string;
    logoDesc: string;
  };
  inputPanel: {
    section1Title: string;
    section1Desc: string;
    typePresets: {
      url: string;
      text: string;
      wifi: string;
      email: string;
      contact: string;
    };
    placeholders: {
      url: string;
      text: string;
      wifi: string;
      email: string;
      contact: string;
    };
    chars: string;
    section2TitleWithLogo: string;
    section2TitleNoLogo: string;
    moduleShape: string;
    shapes: {
      square: string;
      rounded: string;
      dots: string;
    };
    eyeFrame: string;
    eyes: {
      square: string;
      rounded: string;
      circle: string;
    };
    darkColor: string;
    colors: {
      black: string;
      sea: string;
    };
    paletteInfo: string;
  };
  logoPanel: {
    sectionTitle: string;
    sectionDesc: string;
    removeLogo: string;
    uploadTitle: string;
    uploadDesc: string;
    replaceLogo: string;
    positionTitle: string;
    positions: {
      topLeft: { label: string; desc: string };
      topRight: { label: string; desc: string };
      center: { label: string; desc: string };
      bottomLeft: { label: string; desc: string };
      bottomRight: { label: string; desc: string };
    };
    stylingTitle: string;
    sizeLabel: string;
    frameCutout: string;
    shapes: {
      rounded: string;
      circle: string;
      square: string;
    };
    advisoryTitle: string;
    fitSafeZone: string;
    alertValidImage: string;
  };
  previewCanvas: {
    liveCanvas: string;
    sublabel: string;
    copy: string;
    copied: string;
    zoomIn: string;
    zoomOut: string;
    payloadLabel: string;
    qualityBadge: string;
    guarantee: string;
    modeCustomLogo: string;
    modeStandard: string;
  };
  exportBar: {
    downloadImage: string;
    downloadPdf: string;
    resolutions: {
      r1k: string;
      r2k: string;
      r4k: string;
    };
    modal: {
      title: string;
      descImage: string;
      descPdf: string;
      closeBtn: string;
    };
  };
  infoCard: {
    title: string;
    desc: string;
  };
  footer: {
    copyrightPrefix: string;
    author: string;
    copyrightSuffix: string;
    privacy: string;
    terms: string;
    backToTop: string;
    close: string;
    privacyModal: {
      title: string;
      p1: string;
      p2: string;
    };
    termsModal: {
      title: string;
      p1: string;
      p2: string;
    };
  };
}

export const translations: Record<Language, Translations> = {
  id: {
    navbar: {
      tagline: "Mesin Pembuat QR dan Logo Presisi Minimalis",
      reset: "Reset",
      resetTooltip: "Kembalikan ke pengaturan awal",
    },
    hero: {
      title: "MyQR Make",
      subtitle:
        "Buat kode QR beresolusi tinggi dengan penempatan logo rapi dan ekspor instan gambar serta dokumen PDF.",
      sampleLogoBtn: "Coba Mode 2 dengan Contoh Logo",
      customLogoActive: "Logo Kustom Aktif",
    },
    modeToggle: {
      heading: "PILIH GAYA KODE QR",
      standardSublabel: "QR Standar Bersih",
      logoSublabel: "QR Logo Kustom",
      standardTitle: "Kode QR Standar",
      standardDesc: "Kode bersih dan sederhana",
      logoTitle: "QR dengan Logo Anda",
      logoDesc: "Unggah dan atur posisi logo",
    },
    inputPanel: {
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
    },
    logoPanel: {
      sectionTitle: "2. Tambah dan Atur Posisi Logo Anda",
      sectionDesc: "Unggah logo merek Anda (PNG, JPEG, SVG) dan tentukan posisinya",
      removeLogo: "Hapus Logo",
      uploadTitle: "Klik untuk memilih atau seret logo ke sini",
      uploadDesc: "Mendukung PNG transparan, SVG, atau JPEG resolusi tinggi",
      replaceLogo: "Ganti Logo",
      positionTitle: "Pilih Posisi Penempatan Logo",
      positions: {
        topLeft: { label: "Kiri Atas", desc: "Sudut kiri atas" },
        topRight: { label: "Kanan Atas", desc: "Sudut kanan atas" },
        center: { label: "Tengah", desc: "Tengah seimbang (Disarankan)" },
        bottomLeft: { label: "Kiri Bawah", desc: "Sudut kiri bawah" },
        bottomRight: { label: "Kanan Bawah", desc: "Sudut kanan bawah" },
      },
      stylingTitle: "Ukuran Logo dan Bentuk Bingkai",
      sizeLabel: "Ukuran Logo",
      frameCutout: "Bingkai Pemotong Logo",
      shapes: {
        rounded: "Sudut Halus",
        circle: "Lingkaran",
        square: "Kotak",
      },
      advisoryTitle: "Saran Kemudahan Pemindaian",
      fitSafeZone: "Sesuaikan ke Zona Aman 20%",
      alertValidImage: "Silakan unggah file gambar PNG, JPEG, atau SVG.",
    },
    previewCanvas: {
      liveCanvas: "Kanvas Langsung",
      sublabel: "Mesin Resolusi Tinggi 1024 × 1024",
      copy: "Salin",
      copied: "Tersalin",
      zoomIn: "Perbesar",
      zoomOut: "Perkecil",
      payloadLabel: "Isi Tautan QR",
      qualityBadge: "Kualitas Tinggi",
      guarantee: "Mudah Dipindai Semua Perangkat",
      modeCustomLogo: "Mode: Logo Kustom",
      modeStandard: "Mode: QR Standar",
    },
    exportBar: {
      downloadImage: "Unduh Gambar Resolusi Tinggi",
      downloadPdf: "Unduh Dokumen PDF Siap Cetak",
      resolutions: {
        r1k: "Standar Jernih (1K)",
        r2k: "Ultra HD (2K) · Disarankan",
        r4k: "Master Cetak (4K)",
      },
      modal: {
        title: "Selamat! Unduhan Berhasil",
        descImage:
          "Gambar QR code resolusi tinggi Anda telah berhasil dibuat dan disimpan ke perangkat Anda. Siap digunakan kapan saja.",
        descPdf:
          "Dokumen PDF siap cetak ukuran A4 telah berhasil diunduh. Dilengkapi tampilan tajam dan kotak informasi tautan.",
        closeBtn: "Selesai",
      },
    },
    infoCard: {
      title: "Petunjuk Pemindaian",
      desc: "QR code dibuat dengan ketahanan tinggi agar tetap terbaca jelas meskipun logo diletakkan di tengah. Kompatibel dengan semua kamera smartphone Android dan iPhone.",
    },
    footer: {
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
    },
  },
  en: {
    navbar: {
      tagline: "Ultra Minimalist High Precision QR & Logo Engine",
      reset: "Reset",
      resetTooltip: "Reset to default settings",
    },
    hero: {
      title: "MyQR Make",
      subtitle:
        "Generate high precision QR codes with seamless logo positioning and instant high resolution image and PDF export.",
      sampleLogoBtn: "Try Mode 2 with Sample Logo",
      customLogoActive: "Custom Logo Active",
    },
    modeToggle: {
      heading: "CHOOSE QR CODE STYLE",
      standardSublabel: "Clean Standard QR",
      logoSublabel: "Custom Logo QR",
      standardTitle: "Standard QR Code",
      standardDesc: "Clean and simple code",
      logoTitle: "QR with Your Logo",
      logoDesc: "Upload and position logo",
    },
    inputPanel: {
      section1Title: "1. Enter Your Link or Text",
      section1Desc: "Type or paste website link, text, or social media",
      typePresets: {
        url: "URL",
        text: "Text",
        wifi: "WiFi",
        email: "Email",
        contact: "Contact",
      },
      placeholders: {
        url: "Type or paste website link here...",
        text: "Type text or notes to encode in the QR here...",
        wifi: "Type WiFi network name or password details here...",
        email: "Type recipient email address or subject here...",
        contact: "Type contact name, phone number, or vCard info here...",
      },
      chars: "chars",
      section2TitleWithLogo: "3. Grid & Pattern Styling",
      section2TitleNoLogo: "2. Grid & Pattern Styling",
      moduleShape: "Module Shape",
      shapes: {
        square: "Classic Square",
        rounded: "Smooth Rounded",
        dots: "Modern Dots",
      },
      eyeFrame: "Corner Eye Frame",
      eyes: {
        square: "Sharp Square",
        rounded: "Soft Curve",
        circle: "Full Circle",
      },
      darkColor: "Dark Module Color",
      colors: {
        black: "Deep Black",
        sea: "Sea Blue",
      },
      paletteInfo: "Strict 3 Color Palette",
    },
    logoPanel: {
      sectionTitle: "2. Add & Position Your Custom Logo",
      sectionDesc: "Upload your brand logo (PNG, JPEG, SVG) and choose its spot",
      removeLogo: "Remove Logo",
      uploadTitle: "Click to browse or drag & drop logo",
      uploadDesc: "Supports transparent PNG, SVG, or high resolution JPEG",
      replaceLogo: "Replace Logo",
      positionTitle: "Select Logo Placement Position",
      positions: {
        topLeft: { label: "Top Left", desc: "Upper left corner" },
        topRight: { label: "Top Right", desc: "Upper right corner" },
        center: { label: "Center", desc: "Balanced middle (Recommended)" },
        bottomLeft: { label: "Bottom Left", desc: "Lower left corner" },
        bottomRight: { label: "Bottom Right", desc: "Lower right corner" },
      },
      stylingTitle: "Logo Sizing & Frame Shape",
      sizeLabel: "Logo Size",
      frameCutout: "Logo Frame Cutout",
      shapes: {
        rounded: "Rounded",
        circle: "Circle",
        square: "Square",
      },
      advisoryTitle: "Smart Scannability Advisory",
      fitSafeZone: "Fit to 20% Safe Zone",
      alertValidImage: "Please upload a PNG, JPEG, or SVG image.",
    },
    previewCanvas: {
      liveCanvas: "Live Canvas",
      sublabel: "1024 × 1024 High Resolution Engine",
      copy: "Copy",
      copied: "Copied",
      zoomIn: "Zoom In",
      zoomOut: "Zoom Out",
      payloadLabel: "QR Code Link Payload",
      qualityBadge: "High Quality",
      guarantee: "Instantly Scannable on All Devices",
      modeCustomLogo: "Mode: Custom Logo",
      modeStandard: "Mode: Standard QR",
    },
    exportBar: {
      downloadImage: "Download High Resolution Image",
      downloadPdf: "Download Print Ready PDF Document",
      resolutions: {
        r1k: "Standard Crisp (1K)",
        r2k: "Ultra HD (2K) · Recommended",
        r4k: "Print Master (4K)",
      },
      modal: {
        title: "Congrats! Download Successful",
        descImage:
          "Your high resolution QR code has been successfully generated and saved to your device. Ready for instant use.",
        descPdf:
          "Your print ready A4 PDF document has been successfully downloaded with high definition QR code and link box.",
        closeBtn: "Done",
      },
    },
    infoCard: {
      title: "Scanning Guide",
      desc: "QR code is built with high reliability to ensure effortless reading even with a centered logo. 100% compatible with all Android and iPhone smartphone cameras.",
    },
    footer: {
      copyrightPrefix: "© 2026 MyQR Make. Created by ",
      author: "Nanda Revan Saputro",
      copyrightSuffix: ". All rights reserved.",
      privacy: "Privacy Policy",
      terms: "Terms & Conditions",
      backToTop: "Back to Top",
      close: "Close",
      privacyModal: {
        title: "Privacy Policy",
        p1: "MyQR Make values your privacy. All QR generation and logo composition processes occur entirely inside your browser without transmitting data to external servers.",
        p2: "No URLs, text payloads, or uploaded logo files are stored or shared with any third party.",
      },
      termsModal: {
        title: "Terms & Conditions",
        p1: "MyQR Make services are free and open for both your personal and commercial needs.",
        p2: "Generated images and PDF documents can be used freely for branding, packaging, or marketing materials without restrictions.",
      },
    },
  },
};
