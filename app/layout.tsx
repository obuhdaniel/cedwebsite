import type { Metadata } from "next";
import "./globals.css";
import "./portal.css";

export const metadata: Metadata = {
  title: "CED — Industrial procurement, logistics & site support",
  description: "Equipment, aggregates, manpower, logistics tracking and emergency support for Nigeria's largest sites.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
