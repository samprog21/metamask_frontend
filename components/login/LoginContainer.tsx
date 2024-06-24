// components/LoginContainer.tsx
'use client';

import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { useLogin } from '@/app/hooks/useLogin';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/lib/hooks';
import { setUser } from '@/lib/features/auth/authSlice';
import AuthHOC from '@/hoc/AuthHOC';
import Loader from '../ui/Loader';

// Lazy load the LoginForm component correctly
const LazyLoginForm = dynamic(() => import("@/components/login/LoginForm").then(mod => mod.default), {
  suspense: true,
});

const LoginContainer: React.FC = () => {
  const { data:sessionData,status } = useSession();
  const router = useRouter();
  const { handleLogin, handleShowSignupPage } = useLogin();
  const dispatch=useAppDispatch()

  useEffect(() => {
    if (status === 'authenticated' && sessionData?.user) {  
      dispatch(setUser(sessionData.user))
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  }, [status, sessionData,  router]);
  
  return (
    <React.Suspense fallback={<Loader/>}>
      <LazyLoginForm handleLogin={handleLogin} handleShowSignupPage={handleShowSignupPage} />
    </React.Suspense>
  );
};

export default AuthHOC(LoginContainer);

