import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Credetials Management System",
  description: "A system to issue and verify credentials securely.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` antialiased`}
        suppressHydrationWarning 
      >
        {children}
      </body>
    </html>
  );
}
