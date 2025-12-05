import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Trauma In A Can™ - Bottled Traumatic Experiences',
  description: 'Experience the finest traumatic memories, carefully bottled for your convenience',
  keywords: ['trauma', 'scents', 'experiences', 'dental office', 'public restroom'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs">
      <body className="antialiased min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
        <header className="bg-black/50 backdrop-blur-md border-b border-red-900/50 sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="text-4xl">🥫</div>
                <div>
                  <h1 className="text-2xl font-bold text-red-500">
                    Trauma In A Can™
                  </h1>
                  <p className="text-xs text-gray-400">
                    Bottled Traumatic Experiences Since 2025
                  </p>
                </div>
              </div>
              
              <nav className="hidden md:flex items-center space-x-6">
                <a href="/" className="text-gray-300 hover:text-red-400 transition-colors">
                  Products
                </a>
                <a href="#about" className="text-gray-300 hover:text-red-400 transition-colors">
                  About
                </a>
                <a href="#admin" className="text-gray-300 hover:text-red-400 transition-colors">
                  Admin
                </a>
              </nav>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          {children}
        </main>

        <footer className="bg-black/30 border-t border-gray-800 mt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-red-500 font-bold mb-3">Trauma In A Can™</h3>
                <p className="text-sm text-gray-400">
                  Premium bottled traumatic experiences for discerning customers.
                  Warning: May cause flashbacks.
                </p>
              </div>
              
              <div>
                <h3 className="text-red-500 font-bold mb-3">Popular Traumas</h3>
                <ul className="text-sm text-gray-400 space-y-1">
                  <li>• Dental Office Waiting Room</li>
                  <li>• Public Restroom Experience</li>
                  <li>• DMV Queue Simulation</li>
                  <li>• Monday Morning Essence</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-red-500 font-bold mb-3">Tech Stack</h3>
                <p className="text-sm text-gray-400">
                  Powered by Next.js, NestJS, PostgreSQL & Redis Cache
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Cache-optimized for maximum trauma delivery speed
                </p>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-6 pt-6 text-center text-sm text-gray-500">
              <p>© 2025 Trauma In A Can™. All traumas reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
