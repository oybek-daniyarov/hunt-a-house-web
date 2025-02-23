import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaPinterest,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from 'react-icons/fa';

import { fetchSanitySite } from '@/app/(main)/actions';
import SanityLink from '@/components/ui/sanity-link';
import { cn } from '@/lib/utils';

const socialIcons = {
  facebook: FaFacebook,
  twitter: FaTwitter,
  instagram: FaInstagram,
  linkedin: FaLinkedin,
  youtube: FaYoutube,
  tiktok: FaTiktok,
  pinterest: FaPinterest,
  github: FaGithub,
};

export default async function Footer() {
  const data = await fetchSanitySite();
  const getCurrentYear = () => new Date().getFullYear();

  const getSocialIcon = (url: string) => {
    const domain = url.toLowerCase();
    const iconKey = Object.keys(socialIcons).find((key) =>
      domain.includes(key)
    );
    return iconKey ? socialIcons[iconKey as keyof typeof socialIcons] : null;
  };

  return (
    <footer className="border-t">
      <div className="container py-8 xl:py-12">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
          {/* Footer Navigation */}
          <nav className="flex flex-wrap items-center gap-7 text-primary">
            {data.footerMenu?.items?.map((item, key) => {
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

          {/* Social Links */}
          <div className="flex items-center gap-6">
            {data.social?.items?.map((item, key) => {
              switch (item._type) {
                case 'link':
                  if (item.type === 'external' && item.external) {
                    const Icon = getSocialIcon(item.external);
                    return (
                      <SanityLink
                        className={cn(
                          'transition-colors hover:text-foreground/80 text-foreground/60',
                          'flex items-center gap-2'
                        )}
                        link={item}
                        key={key}
                      >
                        {Icon && <Icon className="w-5 h-5" />}
                        <span className="sr-only">{item.label}</span>
                      </SanityLink>
                    );
                  }
                  return (
                    <SanityLink
                      className={cn(
                        'transition-colors hover:text-foreground/80 text-foreground/60',
                        'text-sm'
                      )}
                      link={item}
                      key={key}
                    />
                  );
                default:
                  return null;
              }
            })}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 flex justify-center text-center text-xs">
          <p className="text-foreground/60">
            {data.copyright ? (
              <span>{data.copyright}</span>
            ) : (
              <span>
                &copy; {getCurrentYear()} Hunt a house - All rights reserved
              </span>
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}
