import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useLogin } from '@/app/hooks/useLogin';
import { useAppDispatch } from '@/lib/hooks';
import React, { useEffect } from 'react';
import { setUser } from '@/lib/features/auth/authSlice';

async function middleware(){

    const { data:sessionData,status } = useSession();
    const router = useRouter();
  const { handleLogin, handleShowSignupPage } = useLogin();
  const dispatch=useAppDispatch()

  useEffect(() => {
    if (status === 'authenticated' && sessionData?.user) {  
      dispatch(setUser(sessionData.user))
      console.log("in middleware",sessionData)
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  }, [status, sessionData,  router]);


}