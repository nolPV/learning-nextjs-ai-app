import type { Metadata } from "next";
import { Suspense } from "react";
import "../globals.css";

export const metadata: Metadata = {
  title: "Admin Dashboard - E-Commerce",
  description: "E-Commerce Admin Panel",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="font-sans">
      <body>
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">Loading Dashboard...</div>}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
