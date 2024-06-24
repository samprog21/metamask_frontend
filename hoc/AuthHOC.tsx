import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, ComponentType } from 'react';
import { useAppDispatch } from '@/lib/hooks';
import { setUser } from '@/lib/features/auth/authSlice';
import Loader from '@/components/ui/Loader';

const AuthHOC = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const WithAuth = (props: P) => {
    const { data: sessionData, status } = useSession();
    const router = useRouter();
    const dispatch = useAppDispatch();

    useEffect(() => {
      if (status === 'authenticated' && sessionData?.user) {
        dispatch(setUser(sessionData.user));
      } else if (status === 'unauthenticated') {
        router.push('/login');
      }
    }, [status, sessionData, dispatch, router]);

    if (status === 'loading') {
      return <Loader/>
    }

    return <WrappedComponent {...props} />;
  };

  return WithAuth;
};

export default AuthHOC;
