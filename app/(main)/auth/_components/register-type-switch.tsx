import Link from 'next/link';

interface RegisterTypeSwitchProps {
  currentType: 'agent' | 'user';
}

export function RegisterTypeSwitch({ currentType }: RegisterTypeSwitchProps) {
  return (
    <div className="text-center text-sm">
      Register as {currentType === 'agent' ? 'user' : 'agent'}?{' '}
      <Link
        href={`/auth/register/${currentType === 'agent' ? 'user' : 'agent'}`}
        className="underline underline-offset-4 hover:text-primary"
      >
        Switch type
      </Link>
    </div>
  );
}
