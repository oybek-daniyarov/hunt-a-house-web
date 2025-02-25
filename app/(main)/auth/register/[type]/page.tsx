import { redirect } from 'next/navigation';

import { RegisterForm } from '@/app/(main)/auth/_components/register-form';
import { RegisterTypeSwitch } from '@/app/(main)/auth/_components/register-type-switch';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface RegisterPageProps {
  params: Promise<{ type: string }>;
}

type RegisterType = 'agent' | 'user';

export default async function RegisterPage({ params }: RegisterPageProps) {
  const { type } = await params;

  // Validate and redirect if type is not valid
  if (!['agent', 'user'].includes(type)) {
    redirect('/auth/register/user');
  }

  return (
    <Card>
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Create an account</CardTitle>
        <CardDescription>
          Sign up as a {type === 'agent' ? 'real estate agent' : 'home seeker'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <RegisterForm userType={type as RegisterType} />
          <RegisterTypeSwitch currentType={type as RegisterType} />
        </div>
      </CardContent>
    </Card>
  );
}
