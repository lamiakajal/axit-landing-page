import { Raleway } from 'next/font/google';
import './globals.css';

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-raleway',
  display: 'swap',
});

export const metadata = {
  title: 'AXIT - Modern Landing Page',
  description: 'Modern template for beautiful prototypes',
  icons: {
    icon: '/icon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`scroll-smooth ${raleway.variable}`}>
      <body className="font-raleway bg-white text-dark-700 antialiased selection:bg-primary selection:text-white">
        {children}
      </body>
    </html>
  );
}
