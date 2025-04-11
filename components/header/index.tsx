import Link from 'next/link';

import { fetchSanitySite } from '@/app/(main)/actions';
import Logo from '@/components/header/logo';
import MobileNav from '@/components/header/mobile-nav';
import DesktopNavigation from '@/components/header/navigation';
import { ModeToggle } from '@/components/menu-toggle';
import AuthButton from './auth-button';

const HeaderActions = () => (
  <div className="flex items-center gap-2">
    <AuthButton />
    <ModeToggle />
  </div>
);

export default async function Header() {
  const data = await fetchSanitySite();

  return (
    <header className="sticky top-0 w-full border-border/40 bg-background/95 z-50">
      <div className="container flex items-center justify-between h-14">
        <Link href="/" aria-label="Home page">
          <Logo logo={data.logo} />
        </Link>
        <div className="hidden xl:flex gap-7 items-center justify-between">
          <DesktopNavigation navItems={data.headerMenu} />
          <HeaderActions />
        </div>
        <div className="flex items-center xl:hidden">
          <HeaderActions />
          <MobileNav navItems={data.headerMenu} logo={data.logo} />
        </div>
      </div>
    </header>
  );
}
