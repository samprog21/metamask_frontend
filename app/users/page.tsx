"use client"
import Loader from '@/components/ui/Loader';
import AuthHOC from '@/hoc/AuthHOC';
import React from 'react';

const LazyUserList = React.lazy(() => import('@/components/UserList'));

const UserList: React.FC = () => {
  return (
    <React.Suspense fallback={<Loader/>}>
      <LazyUserList />
    </React.Suspense>
  );
};

export default AuthHOC(UserList);
