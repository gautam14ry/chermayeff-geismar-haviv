import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";
import Header from "./Header";

 const camphor = localFont({
  src: '../public/fonts/Camphor-W01-Regular.woff2',
  variable: '--font-camphor'
})

export const metadata: Metadata = {
  title: "Chermayeff & Geismar & Haviv",
  description: "Creators of many of the world’s most iconic and enduring brands, Chermayeff & Geismar & Haviv is an independent design firm specializing in the development of trademarks and identity programs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`chermayeff ${camphor.variable}`}>
        <Header />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
