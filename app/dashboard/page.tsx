"use client";

import React from "react";
import { BentoGrid } from "@/components/ui/bento-grid";
import { useAppSelector } from "@/lib/hooks";
import { selectCurrentUser, selectIsAuthenticated } from "@/lib/features/auth/authSlice"
import { ProfileGrid } from "@/components/ui/ProfileGrid"
import { UsersCard } from "@/components/ui/user-list";
import { useRouter } from "next/navigation";
import AuthHOC from "@/hoc/AuthHOC";


const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);

const Dashboard: React.FC = () => {
  const router = useRouter()
  const handleShowUsers = () => {
    router.push('/users')
  };

  const userData = useAppSelector(selectCurrentUser);
  return userData ? (
    <BentoGrid className="max-w-4xl mx-auto my-[150px]">
      <ProfileGrid
        userProfile={userData}
        className="md:col-span-6 row-span-1"
        header={<Skeleton />}
      />
      <UsersCard
        title="Show Users"
        buttonText="Show Users"
        onClick={handleShowUsers}

      />
    </BentoGrid>
  ) : null;
};





export default AuthHOC(Dashboard);
