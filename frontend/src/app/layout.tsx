import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";

export const metadata: Metadata = {
  title: "Maeaco ploit | Create Once. Publish Everywhere.",
  description: "Maeaco ploit social media publisher for Facebook Pages and Instagram Business Accounts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-[#f8fafc] text-slate-900 font-sans selection:bg-[#E7F3FF] selection:text-[#1877F2]">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
