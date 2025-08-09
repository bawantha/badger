'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart, Crosshair, Home, Shield, Swords, User, LogOut, RadioTower } from 'lucide-react';
import type { ReactNode } from 'react';

import { Logo } from '@/components/icons/logo';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '/missions', label: 'Missions', icon: Crosshair },
  { href: '/battle', label: 'Battles', icon: Swords },
  { href: '/leaderboard', label: 'Leaderboard', icon: BarChart },
  { href: '#', label: 'Live', icon: RadioTower },
];

export default function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center px-4 md:px-6">
                <Link href="/missions" className="mr-6 flex items-center space-x-2">
                    <Logo className="h-8 w-8 text-primary" />
                    <span className="font-bold text-lg font-headline">BADGER <span className="text-xs text-primary">v2.1</span></span>
                </Link>
                
                <nav className="hidden flex-1 items-center justify-center lg:flex">
                    <div className="flex items-center gap-6 text-sm font-medium">
                        {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex items-center gap-2 transition-colors hover:text-primary ${pathname.startsWith(item.href) ? 'text-primary' : 'text-muted-foreground'}`}
                        >
                            <item.icon className="h-4 w-4" />
                            {item.label}
                        </Link>
                        ))}
                    </div>
                </nav>

                <div className="flex items-center justify-end space-x-4 ml-auto">
                   <Button variant="outline" size="sm">Sign In</Button>
                   <Button size="sm">Join Force</Button>
                </div>
            </div>
        </header>
        <main className="flex-1 p-4 md:p-6">
            {children}
        </main>
    </div>
  );
}
