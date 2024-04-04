import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import Header from '@/components/Header'
import { BarlowCondensed } from '@/fonts/fonts'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Secrettito',
  description: 'Recibe mensajes anónimos de tus amigos!',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`overflow-hidden ${inter.className}`}>
        <Providers>
          <main
            className={`${BarlowCondensed.className} bg-ig relative h-screen overflow-hidden`}
          >
            <Header />
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}
