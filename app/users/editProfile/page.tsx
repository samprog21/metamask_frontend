"use client"
import React, { useEffect, useState } from 'react';
import { Label } from '@/components/ui/Label';
import { Input } from '@/components/ui/Input';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { userTypesResolver } from '@/schema/userTypesResolver';
import { BottomGradient } from '@/components/ui/BottomGradient';
import Image from 'next/image';
import { UserRegisterForm } from '@/interfaces/UserInterface';
import { toast } from 'react-toastify';
import { useUpdateUserMutation } from '@/lib/features/user/userAPISlice';
import { useSession } from 'next-auth/react';
import { selectCurrentUser } from '@/lib/features/auth/authSlice';
import { useAppSelector } from '@/lib/hooks';
import AuthHOC from '@/hoc/AuthHOC';
import { formatDate } from '@/utils/formateDate';
import { IoIosLock, IoMdImage, IoMdPerson, IoMdCalendar, IoMdMail } from 'react-icons/io';
import { LabelInputContainer } from '@/components/ui/LabelInputContainer';

const UserEdit = () => {
  const router = useRouter();
  const { status } = useSession();
  const userData = useAppSelector(selectCurrentUser);
  const [updateUser] = useUpdateUserMutation();
  
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<UserRegisterForm>({
    resolver: userTypesResolver,
  });

  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [viewPassword, setViewPassword] = useState<boolean>(false);
  const [viewImageEdit, setViewImageEdit] = useState<boolean>(false);

  useEffect(() => {
    if (status === 'authenticated' && userData) {
      setValue('firstName', userData.firstName);
      setValue('lastName', userData.lastName);
      setValue('dob', formatDate(userData.dob));
      setValue('email', userData.email);
      if (userData.profilePicture) {
        setImageUrl(userData.profilePicture);
      }
    }
  }, [userData, status, setValue]);
  
  const onUserDataSubmit: SubmitHandler<UserRegisterForm> = async (formData) => {
    const formPayload = new FormData();
    formPayload.append("firstName", formData.firstName || '');
    formPayload.append("lastName", formData.lastName || '');
    formPayload.append("dob", formatDate(formData.dob) || '');
    formPayload.append("email", formData.email || '');
    if (formData.password) {
      formPayload.append("password", formData.password);
    }
    if (profileImage) {
      formPayload.append("profilePicture", profileImage);
    }

    try {
      const id = userData?.id; 
      if (!id) {
        throw new Error('User ID not found');
      }
      const response = await updateUser({ id, formData: formPayload }).unwrap();
      toast.success('Profile updated successfully');
      router.push('/dashboard');
    } catch (error) {
      toast.error(`Failed to update profile: ${error}`);
    }
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileImage(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const handleChangePassword = () => {
    setViewPassword(!viewPassword);
  };

  const handleImageEdit = () => {
    setViewImageEdit(!viewImageEdit);
  };

  return (
    <div className="max-w-[80vh] h-[80vh] my-20 mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-2xl text-neutral-800 dark:text-neutral-200">
          Edit Profile
        </h2>
      </div>
      <p className="text-neutral-600 text-sm mb-4 dark:text-neutral-300">
        Edit your profile details
      </p>
      <form className="space-y-4" onSubmit={handleSubmit(onUserDataSubmit)}>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <LabelInputContainer>
            <Label htmlFor="firstName">First Name</Label>
            <div className="flex items-center">
              <IoMdPerson className="text-2xl text-neutral-500 dark:text-neutral-300 mr-2" />
              <Input id="firstName" {...register('firstName')} placeholder="First Name" type="text" />
            </div>
            {errors.firstName && <p className="text-red-500">{errors.firstName.message}</p>}
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="lastName">Last Name</Label>
            <div className="flex items-center">
              <IoMdPerson className="text-2xl text-neutral-500 dark:text-neutral-300 mr-2" />
              <Input id="lastName" {...register('lastName')} placeholder="Last Name" type="text" />
            </div>
            {errors.lastName && <p className="text-red-500">{errors.lastName.message}</p>}
          </LabelInputContainer>
        </div>
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <LabelInputContainer>
          <Label htmlFor="dob">Date of Birth</Label>
          <div className="flex items-center">
            <IoMdCalendar className="text-2xl text-neutral-500 dark:text-neutral-300 mr-2" />
            <Input id="dob" {...register('dob')} type="date" />
          </div>
          {errors.dob && <p className="text-red-500">{errors.dob.message}</p>}
        </LabelInputContainer>
        <LabelInputContainer>
          <Label htmlFor="email">Email</Label>
          <div className="flex items-center">
            <IoMdMail className="text-2xl text-neutral-500 dark:text-neutral-300 mr-2" />
            <Input id="email" {...register('email')} placeholder="Email" type="email" />
          </div>
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        </LabelInputContainer>
        </div>
       
        
        <LabelInputContainer>
          <Label htmlFor="profilePicture">Profile Picture</Label>
          <div className="flex items-center">
            <div className="relative w-24 h-24 rounded-full overflow-hidden mr-4">
              {imageUrl ? (
                <Image src={imageUrl} alt="Profile Picture" layout="fill" objectFit="cover" />
              ) : (
                <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex justify-center items-center">
                  <IoMdImage className="text-4xl text-neutral-500 dark:text-neutral-300" />
                </div>
              )}
            </div>
            <button
              type="button"
              className="bg-gradient-to-br from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 text-white rounded-md h-10 px-4 font-medium shadow-sm flex items-center"
              onClick={handleImageEdit}
            >
              <IoMdImage className="text-2xl text-neutral-500 dark:text-neutral-300 mr-2" /> {viewImageEdit ? "Cancel" : "Change Image"}
            </button>
          </div>
          {viewImageEdit && (
            <Input
              id="profilePicture"
              type="file"
              accept="image/*"
              onChange={handleProfileImageChange}
              className="hidden"
              style={{ display: viewImageEdit ? "block" : "hidden" }}
            />
          )}
        </LabelInputContainer>
        <div className="flex justify-start space-x-4">
          <button
            type="button"
            
            onClick={handleChangePassword}
          >
            <IoIosLock className="text-2xl text-neutral-500 dark:text-neutral-300 mr-2" /> {viewPassword ? "Cancel" : "Change Password"}
            <BottomGradient />
          </button>
          {viewPassword && (
            <LabelInputContainer className='w-[300px]'>
              <Label htmlFor="password">New Password</Label>
              <Input id="password" {...register('password')} placeholder="New Password" type="password" />
              {errors.password && <p className="text-red-500">{errors.password.message}</p>}
            </LabelInputContainer>
          )}
        </div>
        <div className="flex justify-center ">
          <button
           className="bg-gradient-to-br from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 text-white rounded-md h-10 px-4 font-medium shadow-sm  items-center border-2 border-b-blue-600 mt-[100px]"
            type="submit"
          >
            Update Profile
            <BottomGradient />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthHOC(UserEdit);
