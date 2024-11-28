import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'MusikStreaming',
    short_name: 'MusikStreaming',
    description: 'A music streaming app using Material Design',
    start_url: '/',
    display: 'standalone',
    // background_color: '#ffffff',
    // theme_color: '#000000',
    icons: [
      {
        src: '/icon/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icon/icon-1024x1024.png',
        sizes: '1024x1024',
        type: 'image/png',
      }
    ],
  }
}