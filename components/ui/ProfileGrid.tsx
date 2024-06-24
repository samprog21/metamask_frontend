import React from 'react';
import { cn } from "@/utils/cn";
import { UserGetApi } from "@/interfaces/UserInterface";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { BottomGradient } from './BottomGradient';
import { ConnectButton } from '@rainbow-me/rainbowkit';

interface ProfileGridProps {
  className?: string;
  userProfile: UserGetApi;
  header?: React.ReactNode;
}

export const ProfileGrid: React.FC<ProfileGridProps> = ({ className, userProfile, header }) => {
  const { firstName, lastName, email, dob, profilePicture } = userProfile;
  const router = useRouter();

  const handleClick = () => {
    router.push('/users/editProfile');
  };

  return (
    <div className={cn(
      "rounded-xl bg-white dark:bg-black shadow-input dark:border-white/[0.2] border border-transparent p-6 transition duration-200 hover:shadow-xl",
      className
    )}>
      <div className="font-bold text-2xl text-neutral-600 dark:text-neutral-200 mb-4 mt-4">
        Welcome, <span className='text-4xl font-gs text-orange-400'>{`${firstName} ${lastName}`}</span>
      </div>

      <div className="flex items-center space-x-6">
        <div className="relative w-32 h-32 overflow-hidden rounded-full">
          <Image src={profilePicture} alt={`${firstName} ${lastName}`} height={128} width={128} className="rounded-full" />
        </div>
       

        <div className="flex flex-col justify-center">
          <div className="text-lg text-neutral-600 dark:text-neutral-300">
            <span className='text-xl font-g3'>{email}</span>
          </div>
          <div className="text-lg text-neutral-600 dark:text-neutral-300">
            BirthDate: {new Date(dob).toLocaleDateString()}
          </div>
        </div>

        <div className="flex-grow">
        {header}
       
        </div> 
      </div>
      <div className='flex'>
      <button  className="bg-gradient-to-br absolute group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
        onClick={handleClick}
      >
        Edit Profile
      
        <BottomGradient />
      </button>
      <ConnectButton/>
      </div>

     
      
    </div>
  );
};
