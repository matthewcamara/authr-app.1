import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Authr Associates — Author Marketing OS",
  description:
    "All-in-one marketing operating system for self-published authors. Track sales, optimize metadata, manage reviewers, and automate your book marketing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full ${dmSans.variable} ${playfair.variable}`} suppressHydrationWarning>
      <body className="h-full" style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
