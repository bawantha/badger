'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart, Crosshair, Home, Shield, Swords, User, LogOut } from 'lucide-react';
import type { ReactNode } from 'react';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Logo } from '@/components/icons/logo';
import { Separator } from '@/components/ui/separator';

const navItems = [
  { href: '/missions', label: 'Missions', icon: Crosshair },
  { href: '/battle', label: 'Battle', icon: Swords },
  { href: '/leaderboard', label: 'Leaderboard', icon: BarChart },
  { href: '/dashboard', label: 'Dashboard', icon: Shield },
];

export default function AppLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Logo className="size-8 text-primary" />
            <span className="text-lg font-semibold font-headline">BADGER</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith(item.href)}
                  tooltip={item.label}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <Separator className="my-2" />
          <SidebarMenu>
             <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Profile">
                    <Link href="/profile/ghost">
                         <Avatar className="size-7">
                            <AvatarImage src="/avatars/01.png" alt="User Avatar" />
                            <AvatarFallback>G</AvatarFallback>
                        </Avatar>
                        <span>Profile</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Logout">
                    <Link href="/">
                        <LogOut />
                        <span>Logout</span>
                    </Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-12 items-center justify-between border-b px-4 lg:hidden">
            <Link href="/missions" className="flex items-center gap-2 font-bold">
                <Logo className="size-6 text-primary" />
                <span>BADGER</span>
            </Link>
            <SidebarTrigger />
        </header>
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
            {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
