"use client"
import React from 'react';
import { cn } from "@/utils/cn";
import Image from 'next/image';
import { BottomGradient } from './BottomGradient';

interface UserCardProps {
  className?: string;
  title?: string | React.ReactNode;
  buttonText?: string;
  onClick?: () => void;
}

export const UsersCard: React.FC<UserCardProps> = ({ className, title, buttonText, onClick }) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4",
        className
      )}
    >
        <Image src="/users.jpeg" alt="userlist" height={200} width={200} />
      
     
    
        <button  className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]" onClick={onClick}>
        {buttonText}
          <BottomGradient />
        </button>
   
    </div>
  );
};
