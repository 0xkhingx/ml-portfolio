import type { Metadata, Viewport } from "next";
import {
  Bitcount_Ink,
  Geist_Mono,
  Josefin_Sans,
  Nunito,
} from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Navbar } from "@/components/layout/navbar";
import { JsonLd, personJsonLd, websiteJsonLd } from "@/components/seo/json-ld";
import { ThemeProvider } from "@/components/theme/provider";
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

const josefinSans = Josefin_Sans({
  variable: "--font-josefin",
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
    default: "Dre (0xkhingx) — Software Engineer",
    template: "%s — 0xkhingx",
  },
  description:
    "Dre, known online as 0xkhingx, is a software engineer building end-to-end products across web applications, machine learning and product engineering — Python, TypeScript, React/Next.js, from data pipelines and APIs to interfaces and deployment.",
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
    siteName: "Dre (0xkhingx) — Software Engineer",
    title: "Dre (0xkhingx) — Software Engineer",
    description:
      "Dre, known online as 0xkhingx, is a software engineer building end-to-end products across web applications, machine learning and product engineering.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "0xkhingx — Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dre (0xkhingx) — Software Engineer",
    description:
      "Dre, known online as 0xkhingx, is a software engineer building end-to-end products across web applications, machine learning and product engineering.",
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
      className={`${bitcountInk.variable} ${nunito.variable} ${josefinSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <JsonLd data={[websiteJsonLd(siteUrl), personJsonLd(siteUrl)]} />
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
