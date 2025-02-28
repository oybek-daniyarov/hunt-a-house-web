import PortableTextRenderer from '@/components/portable-text-renderer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Marquee } from '@/components/ui/marquee';
import SectionContainer from '@/components/ui/section-container';
import { StarRating } from '@/components/ui/star-rating';
import { urlFor } from '@/sanity/lib/image';

interface Carousel3Props {
  padding: {
    top: boolean;
    bottom: boolean;
  };
  colorVariant:
    | 'primary'
    | 'secondary'
    | 'card'
    | 'accent'
    | 'destructive'
    | 'background'
    | 'transparent';
  speed: number;
  pauseOnHover: boolean;
  rows?: {
    testimonials: {
      _id: string;
      name: string;
      title: string;
      image: Sanity.Image;
      body: any;
      rating: number;
    }[];
  }[];
}

export default function Carousel3({
  padding,
  speed = 50,
  rows,
  pauseOnHover = true,
}: Partial<Carousel3Props>) {
  const speedStyle = {
    '--duration': `${speed}s`,
  } as React.CSSProperties;

  return (
    <SectionContainer padding={padding}>
      {rows && rows.length > 0 && (
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          {rows.map((row, index) => (
            <Marquee
              key={index}
              pauseOnHover={pauseOnHover}
              style={speedStyle}
              reverse={index % 2 === 0}
            >
              {row.testimonials.map((item) => (
                <Card className="h-full w-80" key={item._id}>
                  <CardContent className="flex flex-col justify-between p-4 h-full">
                    <div>
                      <div className="flex items-center mb-2">
                        <Avatar className="w-10 h-10 mr-3">
                          {item.image && (
                            <AvatarImage
                              src={urlFor(item.image)?.url()}
                              alt={item.name}
                            />
                          )}
                          <AvatarFallback>
                            {item.name.slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-sm font-semibold">{item.name}</h3>
                          <p className="text-xs text-muted-foreground">
                            {item.title}
                          </p>
                        </div>
                      </div>
                      <StarRating rating={item.rating} />
                      {item.body && (
                        <div className="text-sm mt-2 line-clamp-4">
                          <PortableTextRenderer value={item.body} />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </Marquee>
          ))}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background"></div>
        </div>
      )}
    </SectionContainer>
  );
}
