import type { Metadata } from "next";
import { Suspense } from "react";
import "../globals.css";

export const metadata: Metadata = {
  title: "Admin Dashboard - ระบบ E-Commerce",
  description: "ระบบหลังบ้าน E-Commerce",
};

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className="font-sans">
      <body>
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">กำลังโหลดแดชบอร์ด...</div>}>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
