import Link from "next/link";
import Logo from "@/components/logo";
import MobileNav from "@/components/header/mobile-nav";
import DesktopNav from "@/components/header/desktop-nav";
import { ModeToggle } from "@/components/menu-toggle";
import { Button } from "@/components/ui/button";
import { isAuthenticated } from "@/lib/client/laravel/cookies";
import { cookies } from 'next/headers';
import { env } from "@/lib/env";

const navItems = [
  {
    label: "Home",
    href: "/",
    target: false,
  },
  {
    label: "For Agents",
    href: "/agent",
    target: false,
  },
  {
    label: "For Clients",
    href: "/client",
    target: false,
  },
  {
    label: "Property Listings",
    href: "/property-listings",
    target: false,
  },
  {
    label: "About",
    href: "/about",
    target: false,
  },
];

export default async function Header() {
  const hasToken = await isAuthenticated();
  
  // Debug information
  if (process.env.NODE_ENV === 'development') {
    const cookieStore = await cookies();
    const token = cookieStore.get(env.AUTH_COOKIE_NAME);
    console.log('Auth Debug:', {
      hasToken,
      tokenExists: !!token,
      tokenValue: token?.value ? 'exists' : 'missing',
      cookieName: env.AUTH_COOKIE_NAME
    });
  }

  const authButton = hasToken ? (
    <Button variant="outline" size="sm" asChild>
      <Link href="/dashboard">Dashboard</Link>
    </Button>
  ) : (
    <Button variant="outline" size="sm" asChild>
      <Link href="/auth/login">Login</Link>
    </Button>
  );

  const mobileNavItems = [
    ...navItems,
    { 
      label: hasToken ? "Dashboard" : "Login",
      href: hasToken ? "/dashboard" : "/auth/login",
      target: false 
    }
  ];

  return (
    <header className="sticky top-0 w-full border-border/40 bg-background/95 z-50">
      <div className="container flex items-center justify-between h-14">
        <Link href="/" aria-label="Home page">
          <Logo />
        </Link>
        <div className="hidden xl:flex gap-7 items-center justify-between">
          <DesktopNav navItems={navItems} />
          <div className="flex items-center gap-4">
            {authButton}
            <ModeToggle />
          </div>
        </div>
        <div className="flex items-center xl:hidden">
          <ModeToggle />
          <MobileNav navItems={mobileNavItems} />
        </div>
      </div>
    </header>
  );
}
