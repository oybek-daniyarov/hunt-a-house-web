import Link from 'next/link';

import DesktopNav from '@/components/header/desktop-nav';
import MobileNav from '@/components/header/mobile-nav';
import Logo from '@/components/logo';
import { ModeToggle } from '@/components/menu-toggle';
import AuthButton from './auth-button';

const navItems = [
  {
    label: 'Home',
    href: '/',
    target: false,
  },
  {
    label: 'For Agents',
    href: '/agent',
    target: false,
  },
  {
    label: 'For Clients',
    href: '/client',
    target: false,
  },
  {
    label: 'Property Listings',
    href: '/property-listings',
    target: false,
  },
  {
    label: 'About',
    href: '/about',
    target: false,
  },
];

export default function Header() {
  return (
    <header className="sticky top-0 w-full border-border/40 bg-background/95 z-50">
      <div className="container flex items-center justify-between h-14">
        <Link href="/" aria-label="Home page">
          <Logo />
        </Link>
        <div className="hidden xl:flex gap-7 items-center justify-between">
          <DesktopNav navItems={navItems} />
          <div className="flex items-center gap-4">
            <AuthButton />
            <ModeToggle />
          </div>
        </div>
        <div className="flex items-center xl:hidden">
          <ModeToggle />
          <MobileNav
            navItems={[
              ...navItems,
              { label: 'Login', href: '/auth/login', target: false },
            ]}
          />
        </div>
      </div>
    </header>
  );
}
