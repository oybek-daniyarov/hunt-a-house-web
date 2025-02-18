import { useState } from 'react';

import { ForgotPasswordForm } from '@/app/(main)/auth/_components/forgot-password-form';
import { LoginForm } from '@/app/(main)/auth/_components/login-form';
import { RegisterForm } from '@/app/(main)/auth/_components/register-form';
import LeadContactForm from '@/components/forms/lead/lead-contact-form/lead-contact-form';
import { useAuth } from '@/components/providers/auth-provider';

type FormTypes = 'login' | 'register' | 'forgotPassword';

type RenderFormProps = {
  currentForm: FormTypes;
  onSuccess: () => void;
  setForm: (form: FormTypes) => void;
};

const RenderForm = ({ currentForm, onSuccess, setForm }: RenderFormProps) => {
  switch (currentForm) {
    case 'register':
      return <RegisterForm userType="user" onSuccess={onSuccess} />;
    case 'forgotPassword':
      return (
        <ForgotPasswordForm
          onLogin={() => setForm('login')}
          onSuccess={onSuccess}
        />
      );
    default:
      return (
        <LoginForm
          onRegister={() => setForm('register')}
          onSuccess={onSuccess}
        />
      );
  }
};

const UserInformationStep = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuth();
  const [form, setForm] = useState<FormTypes>('login');
  const handleSuccess = () => {
    setIsAuthenticated(true);
  };

  if (isAuthenticated) {
    return <LeadContactForm />;
  }

  return (
    <div>
      <RenderForm
        currentForm={form}
        onSuccess={handleSuccess}
        setForm={setForm}
      />
    </div>
  );
};

export default UserInformationStep;
