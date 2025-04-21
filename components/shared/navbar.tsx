'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Video, Menu } from 'lucide-react';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const isDashboard = pathname === '/dashboard';

  return (
    <nav className="bg-white/95 dark:bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60 sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex h-20 md:h-24 items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer shrink-0" onClick={() => router.push('/')}>
            <Video className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <span className="font-semibold text-lg bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent whitespace-nowrap">Hook Analyzer AI</span>
          </div>
          {!isDashboard && (
            <>
              <div className="hidden md:flex flex-wrap items-center gap-2 justify-end">
                <Button variant="ghost" onClick={() => router.push('/#features')} className="hover:text-indigo-600 dark:hover:text-indigo-400 h-9 px-2">Features</Button>
                <Button variant="ghost" onClick={() => router.push('/#pricing')} className="hover:text-indigo-600 dark:hover:text-indigo-400 h-9 px-2">Pricing</Button>
                <Button variant="ghost" onClick={() => router.push('/#testimonials')} className="hover:text-indigo-600 dark:hover:text-indigo-400 h-9 px-2">Testimonials</Button>
                <Button variant="ghost" onClick={() => router.push('/#faq')} className="hover:text-indigo-600 dark:hover:text-indigo-400 h-9 px-2">FAQ</Button>
                <Button onClick={() => router.push('/#try-it')} className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 h-9 px-3">Get Started</Button>
                <Button variant="outline" onClick={() => router.push('/login')} className="border-indigo-200 hover:border-indigo-300 hover:bg-indigo-50 dark:border-indigo-800 dark:hover:border-indigo-700 dark:hover:bg-indigo-900/50 h-9 px-3">Login</Button>
              </div>
              <div className="md:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Menu className="h-6 w-6" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                    <nav className="flex flex-col gap-4">
                      <Button variant="ghost" className="w-full justify-start hover:text-indigo-600 dark:hover:text-indigo-400" onClick={() => {
                        router.push('/#features');
                        document.querySelector('[data-radix-collection-item]')?.click();
                      }}>
                        Features
                      </Button>
                      <Button variant="ghost" className="w-full justify-start hover:text-indigo-600 dark:hover:text-indigo-400" onClick={() => {
                        router.push('/#pricing');
                        document.querySelector('[data-radix-collection-item]')?.click();
                      }}>
                        Pricing
                      </Button>
                      <Button variant="ghost" className="w-full justify-start hover:text-indigo-600 dark:hover:text-indigo-400" onClick={() => {
                        router.push('/#testimonials');
                        document.querySelector('[data-radix-collection-item]')?.click();
                      }}>
                        Testimonials
                      </Button>
                      <Button variant="ghost" className="w-full justify-start hover:text-indigo-600 dark:hover:text-indigo-400" onClick={() => {
                        router.push('/#faq');
                        document.querySelector('[data-radix-collection-item]')?.click();
                      }}>
                        FAQ
                      </Button>
                      <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600" onClick={() => {
                        router.push('/#try-it');
                        document.querySelector('[data-radix-collection-item]')?.click();
                      }}>
                        Get Started
                      </Button>
                      <Button variant="outline" className="w-full border-indigo-200 hover:border-indigo-300 hover:bg-indigo-50 dark:border-indigo-800 dark:hover:border-indigo-700 dark:hover:bg-indigo-900/50" onClick={() => {
                        router.push('/login');
                        document.querySelector('[data-radix-collection-item]')?.click();
                      }}>
                        Login
                      </Button>
                    </nav>
                  </SheetContent>
                </Sheet>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}