import type { Metadata, Viewport } from "next";
import {
  Bitcount_Ink,
  Geist_Mono,
  Nunito,
  Raleway,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Navbar } from "@/components/layout/navbar";
import "./globals.css";

const bitcountInk = Bitcount_Ink({
  variable: "--font-bitcount",
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
  "https://0xkhingx.vercel.app";

export const metadata: Metadata = {
  // TODO: replace with custom domain when purchased — update NEXT_PUBLIC_SITE_URL too
  metadataBase: new URL(siteUrl),
  title: {
    default: "0xkhingx",
    template: "%s — 0xkhingx",
  },
  description: "ML engineer building models — and the products around them.",
  alternates: {
    canonical: "/",
  },
  authors: [{ name: "Oluwadamilare Ogundele", url: siteUrl }],
  creator: "Oluwadamilare Ogundele",
  publisher: "0xkhingx",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "0xkhingx",
    title: "0xkhingx",
    description: "ML engineer building models — and the products around them.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "0xkhingx — ML engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "0xkhingx",
    description: "ML engineer building models — and the products around them.",
    creator: "@0xkhingx",
    images: ["/opengraph-image"],
  },
};

export const viewport: Viewport = {
  themeColor: "#121110",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bitcountInk.variable} ${nunito.variable} ${raleway.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
