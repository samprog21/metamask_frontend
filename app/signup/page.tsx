"use client"
import React, { Suspense,useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Loader from '@/components/ui/Loader';



const LazySignup = React.lazy(() => import('@/components/SignUp'));


const SignUp: React.FC = () => {

  
  const { data:sessionData,status } = useSession();
  const router = useRouter();
  

  useEffect(() => {
    if (status === 'authenticated' && sessionData?.user) {
      router.push('/dashboard');
    } 
  }, [status, sessionData,  router]);

  return (
    <Suspense fallback={<Loader/>}>
    <LazySignup />
  </Suspense>
  );
};

export default SignUp
