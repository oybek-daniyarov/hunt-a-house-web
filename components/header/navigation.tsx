import SanityLink from '@/components/ui/sanity-link';

type MenuProps = {
  navItems?: Sanity.Navigation;
};

export default async function DesktopNavigation({ navItems }: MenuProps) {
  if (!navItems) return null;

  return (
    <nav
      className="hidden xl:flex items-center gap-7 text-primary"
      role="navigation"
    >
      {navItems?.items?.map((item, key) => {
        switch (item._type) {
          case 'link':
            return (
              <SanityLink
                className="transition-colors hover:text-foreground/80 text-foreground/60 text-sm"
                link={item}
                key={key}
              />
            );
          default:
            return null;
        }
      })}
    </nav>
  );
}
