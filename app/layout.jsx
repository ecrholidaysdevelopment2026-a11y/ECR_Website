import "./globals.css";
import ReduxProvider from "./provider/ReduxProvider";
import Footer from "./components/Common/Footer/Footer";
import ConditionalHeader from "./common/ConditionalHeader";

export const metadata = {
  title: "ESR Holiday 2025",
  description: "Discover the best ESR Holiday",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <ReduxProvider>
          <ConditionalHeader />
          <main>{children}</main>
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
