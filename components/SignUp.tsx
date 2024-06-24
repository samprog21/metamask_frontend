"use client"
import React, { useState } from 'react';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { userTypesResolver } from '@/schema/userTypesResolver';
import { BottomGradient } from '@/components/ui/BottomGradient';
import { LabelInputContainer } from '@/components/ui/LabelInputContainer';
import Image from 'next/image';
import { UserRegisterForm } from '@/interfaces/UserInterface';
import { toast } from 'react-toastify';
import { useAddUserMutation } from '@/lib/features/user/userAPISlice';
import Anime from './ui/Anime';

export default function SignUp() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<UserRegisterForm>({
    resolver: userTypesResolver,
  });

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [addUser] = useAddUserMutation();

  const handleShowLoginPage = () => {
    router.push('/login');
  };

  const onUserDataSubmit: SubmitHandler<UserRegisterForm> = async (formData) => {
    const formPayload = new FormData();
    formPayload.append("firstName", formData.firstName);
    formPayload.append("lastName", formData.lastName);
    formPayload.append("dob", formData.dob);
    formPayload.append("email", formData.email);
    formPayload.append("password", formData.password);
    if (profileImage) {
      formPayload.append("profilePicture", profileImage); 
    }

    try {
      const response = await addUser(formPayload).unwrap();
      toast.success('User registered successfully');
      router.push('/dashboard');
    } catch (error) {
      toast.error(`Failed to register: ${error}`);
    }
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-[80vh] h-[80vh] my-20 mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <div className="flex justify-between">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Welcome to &nbsp; <span className='flex flex-row font-gs text-2xl text-orange-400'> metamask <Anime/></span> 
        </h2>
        <button className="text-blue-500 mt-4" onClick={handleShowLoginPage}>
          Already Register? Login
        </button>
      </div>
      <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
        Enter Details to register
      </p>
      <form className="my-8" onSubmit={handleSubmit(onUserDataSubmit)}>
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
          <LabelInputContainer>
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" {...register('firstName')} placeholder="First Name" type="text" />
            {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" {...register('lastName')} placeholder="Last Name" type="text" />
            {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
          </LabelInputContainer>
        </div>
        <LabelInputContainer>
          <Label htmlFor="dob">DOB</Label>
          <Input id="dob" {...register('dob')} placeholder="Date of Birth" type="date" />
          {errors.dob && <p className="text-red-500">{errors.dob.message}</p>}
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email</Label>
          <Input id="email" {...register('email')} placeholder="Email" type="email" />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <Input id="password" {...register('password')} placeholder="Password" type="password" />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="profilePicture">Profile Picture</Label>
          <div className="flex items-center justify-start">
            <Input
              id="profilePicture"
              type="file"
              accept="image/*"
              {...register('profilePicture', {
                onChange: handleProfileImageChange
              })}
            />
          </div>
        </LabelInputContainer>
        {imageUrl && <Image src={imageUrl} alt="Profile Picture" width={200} height={200} />}
        <div className="flex justify-between">
          <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Register &rarr;
            <BottomGradient />
          </button>
        </div>
      </form>
    </div>
  );
}
