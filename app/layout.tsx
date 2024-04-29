import Providers from '@/providers';
import '../styles/globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '@/components/Header';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import GlobalPlayer from '@/components/GlobalPlayer';
import { Analytics } from '@vercel/analytics/react';
import { ReactNode } from 'react';
import MadeBySweets from '@/components/MadeBySweets';

export const viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={cn(
          'font-helvetica',
          inter.variable,
          'flex flex-col min-h-screen w-screen overflow-x-hidden',
        )}
      >
        <Providers>
          <Header />
          {children}
          <MadeBySweets />
          <ToastContainer />
          <GlobalPlayer />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
