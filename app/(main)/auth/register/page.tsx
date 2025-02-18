import { redirect } from 'next/navigation';

export default function DefaultRegisterPage() {
  redirect('/auth/register/user');
}
