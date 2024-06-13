import { Montserrat } from 'next/font/google';
import localFont from 'next/font/local';

export const montserrat = Montserrat({ subsets: ['latin'], weight: ['500', '600'] });

export const merchant = localFont({
  src: [
    {
      path: '../assets/fonts/merchant-regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
});

export const enigma = localFont({
  src: [
    {
      path: '../assets/fonts/enigma-regular.woff',
      weight: '400',
      style: 'normal',
    },
  ],
});
