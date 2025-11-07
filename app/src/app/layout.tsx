import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Star Wars Character Search',
  description: 'Search and explore Star Wars characters from SWAPI',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
