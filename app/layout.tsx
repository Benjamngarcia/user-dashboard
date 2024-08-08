import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700"]
});


export const metadata: Metadata = {
  title: "Users Dashboard",
  description: "Users Dashboard built with Next.js + TypeScript",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} bg-gray-300`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-7">
          {children}
        </div>
      </body>
    </html>
  );
}
