import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Social Publisher | Create Once. Publish Everywhere.",
  description: "Buffer-inspired social media publisher for Facebook Pages and Instagram Business Accounts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-[#f8fafc] text-slate-900 font-sans selection:bg-purple-100 selection:text-purple-900">
        {children}
      </body>
    </html>
  );
}
