import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "react-datepicker/dist/react-datepicker.css";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RelayIt",
  description: "A video conferencing app built with Next.js and Stream",
  icons: {
    icon: "/icons/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <ClerkProvider
        appearance={{
          cssLayerName: "clerk",
          layout: {
            logoImageUrl: "/icons/logo.svg",
            socialButtonsVariant: "iconButton",
          },
          variables: {
            colorPrimary: "#0e78f9",
            colorText: "#fff",
            colorBackground: "#1c1f2e",
            colorInputBackground: "#252a41",
            colorInputText: "#fff",
          },
        }}
      >
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-dark-2`}
        >
          <Toaster position="top-center" />
          {children}
        </body>
      </ClerkProvider>
    </html>
  );
}
