"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import {
  Moon, 
  Sun, 
  Headphones,
  Hexagon,
  Globe,
  MessageCircle,
  Video,
  Camera,
  Users,
  Code
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const { theme, setTheme } = useTheme();

  return (
    <footer className="w-full bg-background border-t mt-20 relative font-plus-jakarta">
      <div className="container mx-auto px-4 md:px-8 py-16 max-w-7xl">
        {/* Top Section: Logo */}
        <div className="mb-12">
          <Link href="/" className="inline-flex items-center gap-2">
            <Hexagon className="h-8 w-8 fill-primary text-primary" />
            <span className="font-bold text-2xl tracking-tighter uppercase">ENDEW</span>
          </Link>
        </div>

        {/* Middle Section: Links and Theme/Social */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-8">
          
          {/* Navigation Columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16">
            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-sm uppercase">About</h3>
              <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition-colors">Our Story</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Brand Guidelines</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Network</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Contact Us</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Wallpapers</Link></li>
              </ul>
            </div>
            
            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-sm uppercase">Shop</h3>
              <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition-colors">Help</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Downloads</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Shipping</Link></li>
                <li><Link href="#" className="hover:text-foreground transition-colors">Returns</Link></li>
              </ul>
            </div>
            
            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-sm uppercase">Terms and Policies</h3>
              <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground transition-colors">All Terms and Policies</Link></li>
              </ul>
            </div>
          </div>

          {/* Right Section: Theme & Socials */}
          <div className="flex flex-col lg:items-end justify-between gap-8">
            {/* Theme Toggle */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium">
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </span>
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="h-10 w-10 flex items-center justify-center rounded-md border border-border bg-card hover:bg-accent transition-colors"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* Social Icons */}
            <div className="flex flex-wrap gap-2">
              {[MessageCircle, Video, Camera, Headphones, Users, Code, Globe].map((Icon, idx) => (
                <Link 
                  key={idx} 
                  href="#" 
                  className="h-10 w-10 flex items-center justify-center rounded-md border border-border bg-card hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="mt-16 pt-8 border-t text-sm text-muted-foreground flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} ENDEW Fashion. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-foreground">Privacy</Link>
            <Link href="#" className="hover:text-foreground">Cookies</Link>
          </div>
        </div>
      </div>

      {/* Floating Sticky Banner */}
      <div className="fixed bottom-6 right-6 z-50 bg-orange-500 text-white rounded-xl p-6 overflow-hidden flex flex-col sm:flex-row items-center gap-6 justify-between max-w-[480px] shadow-2xl transition-transform hover:-translate-y-1">
        {/* Mascot/Graphic element */}
        <div className="absolute -top-4 -left-4 w-20 h-20 bg-white/20 rounded-full blur-2xl"></div>
        <div className="z-10 text-center sm:text-left">
          <h4 className="font-black text-2xl uppercase italic leading-tight">Wanna Get<br/>Exclusive Discounts?</h4>
        </div>
        <Button variant="secondary" className="z-10 font-bold uppercase rounded-md text-orange-600 hover:text-orange-700">
          Check Out ENDEW VIP
        </Button>
      </div>
    </footer>
  );
}
