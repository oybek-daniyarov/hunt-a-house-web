import { cn } from '@/lib/utils';

type Props = {
  title: string;
  value: React.ReactNode;
  column?: boolean;
};

const Row = ({ title, value, column = true }: Props) => {
  return (
    <div
      className={cn(
        'flex gap-1',
        column ? 'flex-row items-center gap-2' : 'flex-col'
      )}
    >
      <dt className="font-medium">{title}</dt>
      <dd className="text-muted-foreground text-sm">{value}</dd>
    </div>
  );
};

type PreviewProps = {
  children: React.ReactNode;
  column?: boolean;
};

const Preview = ({ children, column = true }: PreviewProps) => {
  return (
    <dl
      className={cn(
        'flex flex-col gap-4',
        column ? 'grid-cols-2' : 'grid-cols-1'
      )}
    >
      {children}
    </dl>
  );
};

Preview.Row = Row;

export default Preview;
