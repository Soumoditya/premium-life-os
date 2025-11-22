import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Premium Life OS",
  description: "Your personal AI-powered productivity workspace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
