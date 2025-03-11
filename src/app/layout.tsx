import { ThemeProvider } from "@/context/ThemeProvider";
import "./globals.css";
import { Metadata } from 'next';
import localFont from 'next/font/local';
import { QueryProvider } from "@/context/QueryProvider";
import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from 'react-hot-toast'
import { FavoritesProvider } from "@/context/FavoriteContext";

// Define the local Poppins font
const poppins = localFont({
  src: [
    {
      path: '../../public/fonts/Poppins-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Poppins-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
});

// Default metadata for SankofaFlix
export const metadata: Metadata = {
  title: {
    template: '%s | SankofaFlix',
    default: 'SankofaFlix | African & Diaspora Movie Recommendations',
  },
  description: "Discover and explore African and diaspora cinema with personalized movie recommendations from SankofaFlix",
  openGraph: {
    type: 'website',
    url: 'https://sankofaflix.com',
    siteName: 'SankofaFlix',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.className}>
        <ThemeProvider>
          <QueryProvider>
            <AuthProvider>
              <FavoritesProvider>
                <Navbar />
                <main>
                  <Toaster />
                  {children}
                </main>
                <Footer />
              </FavoritesProvider>
            </AuthProvider>
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}