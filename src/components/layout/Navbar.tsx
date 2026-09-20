'use client';

import Link from 'next/link';
import { ShoppingCart, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center md:hidden">
          <Button variant="ghost" size="icon" aria-label="Open mobile menu">
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        <div className="flex justify-center md:justify-start w-full md:w-auto">
          <Link href="/" className="flex items-center space-x-2" aria-label="Go to Homepage">
            <span className="text-xl font-bold tracking-tighter font-plus-jakarta">ENDEW.</span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <Link href="/catalog" className="transition-colors hover:text-foreground/80">
            Catalog
          </Link>
          <Link href="/custom" className="transition-colors hover:text-foreground/80">
            Made to Order
          </Link>
          <Link href="/about" className="transition-colors hover:text-foreground/80">
            About
          </Link>
        </nav>

        <div className="flex items-center justify-end space-x-4 w-full md:w-auto">
          <Link href="/login" aria-label="My Account">
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
            </Button>
          </Link>
          <Link href="/cart" aria-label="Shopping Cart">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
