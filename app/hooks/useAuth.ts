// hooks/useAuth.ts
import { useSession, signIn, signOut } from 'next-auth/react';
import { useDispatch } from 'react-redux';
import { setUser, clearUser } from '@/lib/features/auth/authSlice';
import { useEffect } from 'react';
import { UserGetApi } from '@/interfaces/UserInterface';

interface AuthHook {
  login: () => void;
  logout: () => void;
  isAuthenticated: boolean;
  user: UserGetApi | null;
}

const useAuth = (): AuthHook => {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      dispatch(setUser(session.user as UserGetApi));
    } else if (status === 'unauthenticated') {
      dispatch(clearUser());
    }
  }, [status, session, dispatch]);

  const login = () => signIn('credentials');
  const logout = () => signOut();

  return {
    login,
    logout,
    isAuthenticated: status === 'authenticated',
    user: session?.user as UserGetApi | null,
  };
};

export default useAuth;
