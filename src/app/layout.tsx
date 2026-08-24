import type { Metadata, Viewport } from "next";
import {
  Bitcount_Ink,
  Geist_Mono,
  Nunito,
  Raleway,
} from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import "./globals.css";

const bitcountInk = Bitcount_Ink({
  variable: "--font-bitcount",
  subsets: ["latin"],
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

export const metadata: Metadata = {
  title: {
    default: "0xkhingx",
    template: "%s — 0xkhingx",
  },
  description: "ML engineer building models — and the products around them.",
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
      </body>
    </html>
  );
}
