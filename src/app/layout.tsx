'use client';
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header';
import { COLORS } from '@/lib/design';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname();
  const isLandingPage = pathname === '/';

  return (
    <html lang="en">
      <head>
        <title>Atly Quiz - Find Safe Gluten-Free Places</title>
        <meta name="description" content="Discover trusted gluten-free restaurants and foods with our personalized quiz" />
      </head>
      <body className={`${inter.className} ${COLORS.PRIMARY_GRADIENT} min-h-screen`}>
        <div className="min-h-screen flex flex-col">
          {/* Conditional Header - hidden on landing page for clean experience */}
          {!isLandingPage && <Header />}
          
          {/* Page Content */}
          <div className="flex-1">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}