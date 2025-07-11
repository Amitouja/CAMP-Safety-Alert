'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ClipboardEdit, Map, Phone, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/report', label: 'Report', icon: ClipboardEdit },
  { href: '/map', label: 'Map', icon: Map },
  { href: '/resources', label: 'Resources', icon: FileText },
  { href: '/contact', label: 'Contact', icon: Phone },
];

export function Nav() {
  const pathname = usePathname();
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur-sm">
        <div className="flex h-16 justify-around">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href} className={cn(
              "flex flex-col items-center justify-center gap-1 p-2 text-xs w-full transition-colors",
              pathname === href ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
            )}>
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </Link>
          ))}
        </div>
      </nav>
    );
  }

  return (
    <div className="hidden items-center gap-6 text-sm md:flex">
      {navItems.map(({ href, label }) => (
        <Link key={href} href={href} className={cn(
          "transition-colors hover:text-foreground/80",
          pathname === href ? "text-foreground font-semibold" : "text-foreground/60"
        )}>
          {label}
        </Link>
      ))}
    </div>
  );
}
