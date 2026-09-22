import type { Metadata } from "next";
import { Geist, Geist_Mono, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { NotificationToaster } from "@/components/ui/NotificationToaster";
import { LiveChatWidget } from "@/components/ui/LiveChatWidget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | ENDEW Fashion",
    default: "ENDEW Fashion | Made-to-Order Bespoke Tailoring",
  },
  description: "Experience the future of fashion with ENDEW's 3D Garment Configurator. Tailor-made, bespoke, and exclusively crafted for you.",
  keywords: ["bespoke fashion", "made to order", "3D garment configurator", "tailor", "custom suit", "ENDEW"],
  openGraph: {
    title: "ENDEW Fashion | Made to Order",
    description: "Experience the future of fashion with our interactive 3D Garment Configurator.",
    url: "https://endew-fashion.vercel.app",
    siteName: "ENDEW Fashion",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ENDEW 3D Fashion",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ENDEW Fashion",
    description: "Design your custom garment in fully interactive 3D.",
    images: ["/og-image.jpg"],
  }
};

import { ThemeProvider } from "@/components/theme-provider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${plusJakarta.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <NotificationToaster />
          <LiveChatWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}

