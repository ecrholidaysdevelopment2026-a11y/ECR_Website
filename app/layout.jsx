import ReduxProvider from "./provider/ReduxProvider";
import ConditionalHeader from "./common/ConditionalHeader";
import Script from "next/script";
import SmoothScrollProvider from "./common/SmoothScrollProvider";
import ConditionalFooter from "./common/ConditionalFooter";
import ToastProvider from "./common/ToastProvider";
import PopupManager from "./common/PopupManager";
import "leaflet/dist/leaflet.css";
import "./globals.css";
import AuthBootstrap from "./AuthBootstrap";

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL),
  title: "ESR Holiday 2025",
  description: "Discover the best ESR Holiday",
  openGraph: {
    title: "ESR Holiday 2025",
    description: "Discover the best ESR Holiday",
    images: ["/og-image.jpg"],
  },
};

const schemaData = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "ESR Holiday",
  url: process.env.NEXT_PUBLIC_SITE_URL,
  logo: `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
  description: "Discover the best ESR Holiday travel packages",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91-XXXXXXXXXX",
    contactType: "customer service",
    availableLanguage: ["English", "Tamil"],
  },
  sameAs: [
    "https://www.facebook.com/yourpage",
    "https://www.instagram.com/yourpage",
  ],
};


export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <head>
        <Script
          id="schema-org"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaData),
          }}
        />
      </head>
      <body suppressHydrationWarning={true}>
        <ReduxProvider>
          <AuthBootstrap />
          <SmoothScrollProvider>
            <ConditionalHeader />
            <PopupManager />
            <main>{children}</main>
            <ConditionalFooter />
            <ToastProvider />
          </SmoothScrollProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
