import { Montserrat } from 'next/font/google';
import localFont from 'next/font/local';

export const montserrat = Montserrat({ subsets: ['latin'], weight: '500' });

export const merchant = localFont({
  src: [
    {
      path: './fonts/merchant-regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
});
