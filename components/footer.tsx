import Link from 'next/link';

const navItems = [
  {
    label: 'Home',
    href: '/',
    target: false,
  },
  {
    label: 'Blog',
    href: '/blog',
    target: false,
  },
  {
    label: 'About',
    href: '/about',
    target: false,
  },
];

export default function Footer() {
  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  return (
    <footer>
      <div className="conrtainer dark:bg-background pb-5 xl:pb-5 dark:text-gray-300">
        <div className="mt-8 flex flex-wrap items-center justify-center gap-7 text-primary">
          {navItems.map((navItem) => (
            <Link
              key={navItem.label}
              href={navItem.href}
              target={navItem.target ? '_blank' : undefined}
              rel={navItem.target ? 'noopener noreferrer' : undefined}
              className="transition-colors hover:text-foreground/80 text-foreground/60 text-sm"
            >
              {navItem.label}
            </Link>
          ))}
        </div>
        <div className="mt-8 flex flex-col lg:flex-row gap-6 justify-center text-center lg:mt-5 text-xs border-t pt-8">
          <p className="text-foreground/60">
            &copy; {getCurrentYear()} Hunt a house - All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
