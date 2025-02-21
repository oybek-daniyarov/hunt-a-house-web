import { SanityImage } from '@/components/ui/sanity-image';

type LogoProps = {
  logo?: Sanity.Logo;
};

const Logo = ({ logo }: LogoProps) => {
  return (
    <div>
      {logo?.image?.light && (
        <SanityImage
          width={140}
          image={logo.image.light}
          className="hidden dark:block"
          alt={logo.name}
        />
      )}
      {logo?.image?.dark && (
        <SanityImage
          width={140}
          image={logo.image.dark}
          className="dark:hidden"
          alt={logo.name}
        />
      )}
    </div>
  );
};

export default Logo;
