import Link from "next/link";
import Logo from "@/components/logo";
import MobileNav from "@/components/header/mobile-nav";
import DesktopNav from "@/components/header/desktop-nav";
import { ModeToggle } from "@/components/menu-toggle";
import { Button } from "@/components/ui/button";

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
            <Button variant="outline" size="sm" asChild>
              <Link href="/auth/login">Login</Link>
            </Button>
            <ModeToggle />
          </div>
        </div>
        <div className="flex items-center xl:hidden">
          <ModeToggle />
          <MobileNav navItems={[...navItems, { label: "Login", href: "/auth/login", target: false }]} />
        </div>
      </div>
    </header>
  );
}
