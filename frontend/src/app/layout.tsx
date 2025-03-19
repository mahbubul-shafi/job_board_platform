import Navbar from '@/components/Navbar';
import type { Metadata } from "next";
import "@/styles/globals.css";


export const metadata: Metadata = {
  title: "Job Board Platform",
  description: "Find your dream job or post job opportunities.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}