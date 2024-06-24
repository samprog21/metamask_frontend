import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { signIn } from 'next-auth/react';
import { SubmitHandler } from 'react-hook-form';
import { UserLoginForm } from '@/interfaces/UserInterface';

export const useLogin = () => {
  const router = useRouter();

  const handleLogin: SubmitHandler<UserLoginForm> = async (formData) => {
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (res?.error) {
        toast.error(`Failed to login: ${res.error}`);
      } else {
        toast.success('Login successful');
        router.push('/dashboard');
      }
    } catch (error) {
      toast.error(`Failed to login: ${error}`);
    }
  };

  const handleShowSignupPage = () => {
    router.push('/signup');
  };

  return {
    handleLogin,
    handleShowSignupPage,
  };
};
