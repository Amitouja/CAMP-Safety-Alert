import Link from 'next/link';
import { ShieldAlert } from 'lucide-react';
import { PanicButton } from '@/components/panic-button';
import { Nav } from '@/components/nav';

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur-sm">
      <div className="container flex h-14 items-center">
        <div className="mr-6 flex items-center space-x-2">
          <Link href="/" className="flex items-center space-x-2">
            <ShieldAlert className="h-6 w-6 text-primary" />
            <span className="font-bold inline-block font-headline">Campus Safety</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Nav />
          </div>
          <nav className="flex items-center">
            <PanicButton />
          </nav>
        </div>
      </div>
    </header>
  );
}
