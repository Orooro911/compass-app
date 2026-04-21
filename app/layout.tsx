import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Compass",
  description: "Your personal dashboard for life roles, connections, and meaningful situations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased" style={{ fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
