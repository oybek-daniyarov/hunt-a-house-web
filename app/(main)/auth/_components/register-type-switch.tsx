import Link from 'next/link';

interface RegisterTypeSwitchProps {
  currentType: 'agent' | 'client';
}

export function RegisterTypeSwitch({ currentType }: RegisterTypeSwitchProps) {
  return (
    <div className="text-center text-sm">
      Register as {currentType === 'agent' ? 'client' : 'agent'}?{' '}
      <Link
        href={`/auth/register/${currentType === 'agent' ? 'client' : 'agent'}`}
        className="underline underline-offset-4 hover:text-primary"
      >
        Switch type
      </Link>
    </div>
  );
}
