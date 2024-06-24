"use client"

import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { UserLoginForm } from '@/interfaces/UserInterface';
import { LabelInputContainer } from '@/components/ui/LabelInputContainer';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { IoIosMail,IoIosLock,IoIosSend } from 'react-icons/io';
import { BottomGradient } from '@/components/ui/BottomGradient';
import { userLoginResolver } from '@/schema/userTypesResolver';
import Anime from '../ui/Anime';

interface LoginFormProps {
  handleLogin: SubmitHandler<UserLoginForm>;
  handleShowSignupPage: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ handleLogin, handleShowSignupPage }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<UserLoginForm>({
    resolver: userLoginResolver,
  });

  return (
    <div className="max-w-[80vh] h-[80vh] my-20 mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <div className="flex justify-between">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to &nbsp; <span className='flex flex-row font-gs text-2xl text-orange-400'> metamask <Anime/></span> 
        </h2>
        <button
          className="text-blue-500 mt-4 flex items-center"
          onClick={handleShowSignupPage}
        >
          Not a User Yet? Register
        </button>
      </div>

      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Enter Credentials to Login
      </p>
      <form className="my-8" onSubmit={handleSubmit(handleLogin)}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">
            <span className="sr-only">Email</span>
            <IoIosMail className="inline-block mr-2" />
            Email
          </Label>
          <Input id="email" {...register('email')} placeholder="Email" type="email" className="text-white" />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">
            <span className="sr-only">Password</span>
            <IoIosLock className="inline-block mr-2" />
            Password
          </Label>
          <Input id="password" {...register('password')} placeholder="Password" type="password" className="text-white" />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </LabelInputContainer>
        <div className="flex justify-between">
          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            <IoIosSend className="inline-block mr-2" />
            Login
            <BottomGradient />
          </button>
        </div>
      </form>
      
    </div>
  );
};

export default LoginForm;
