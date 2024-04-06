import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Adrian Fahrbach',
    short_name: 'Adrian Fahrbach',
    icons: [
      {
        src: '/assets/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/assets/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    theme_color: '#fafafa',
    background_color: '#fafafa',
    display: 'standalone',
  };
}
