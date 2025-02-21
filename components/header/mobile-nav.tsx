'use client';

import { useState } from 'react';
import { TextAlignRightIcon } from '@radix-ui/react-icons';

import Logo from '@/components/header/logo';
import { Button } from '@/components/ui/button';
import SanityLink from '@/components/ui/sanity-link';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

type MobileNavProps = {
  navItems?: Sanity.Navigation;
  logo?: Sanity.Logo;
};

export default function MobileNav({ navItems, logo }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          aria-label="Open Menu"
          variant="ghost"
          className="w-[1.75rem] p-5 focus-visible:ring-1 focus-visible:ring-offset-1"
        >
          <TextAlignRightIcon className="dark:text-white" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <div className="mr-6 ml-auto">
            <Logo logo={logo} />
          </div>
          <div className="sr-only">
            <SheetTitle>Main Navigation</SheetTitle>
            <SheetDescription>Navigate to the website pages</SheetDescription>
          </div>
        </SheetHeader>
        <div className="pt-10 pb-20">
          <div className="container">
            <ul className="list-none text-right space-y-3">
              {navItems?.items?.map((item, key) => (
                <li key={key}>
                  {item._type === 'link' && (
                    <SanityLink
                      onClick={() => setOpen(false)}
                      link={item}
                      className="hover:text-decoration-none hover:opacity-50 text-lg"
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
