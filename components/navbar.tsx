'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, TreePalm as PalmTree } from 'lucide-react';
import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <PalmTree className="h-6 w-6 text-primary" />
          <span className="font-bold text-lg hidden sm:inline-block">Thailand Travel</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            href="/" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Home
          </Link>
          <Link 
            href="/itineraries" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Itineraries
          </Link>
          {/* <Link 
            href="/destinations" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Destinations
          </Link> */}
          <Link 
            href="/create" 
            className="text-sm font-medium transition-colors hover:text-primary"
          >
            Create Itinerary
          </Link>
        </nav>
        
        <div className="flex items-center gap-2">
          <ModeToggle />
          <Button 
            variant="ghost" 
            className="md:hidden" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={cn(
        "md:hidden overflow-hidden transition-all",
        isOpen ? "max-h-[300px] border-b" : "max-h-0"
      )}>
        <div className="container py-4 flex flex-col space-y-4">
          <Link 
            href="/" 
            className="text-sm font-medium transition-colors hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link 
            href="/itineraries" 
            className="text-sm font-medium transition-colors hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            Itineraries
          </Link>
          <Link 
            href="/destinations" 
            className="text-sm font-medium transition-colors hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            Destinations
          </Link>
          <Link 
            href="/create" 
            className="text-sm font-medium transition-colors hover:text-primary"
            onClick={() => setIsOpen(false)}
          >
            Create Itinerary
          </Link>
        </div>
      </div>
    </header>
  );
}