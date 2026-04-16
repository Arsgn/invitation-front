import type { Metadata } from "next";
import "./globals.scss";
import LayoutClient from "./layout.c";

export const metadata: Metadata = {
  title: "Үйлөнүү тою",
  description: "Той чакыруусу",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <LayoutClient>{children}</LayoutClient>
      </body>
    </html>
  );
}