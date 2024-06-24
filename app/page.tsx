"use client"
import React from 'react';
import UserList from "@/app/users/page"
import Dashboard from '@/app/dashboard/page';
import Login from '@/app/login/page';
import SignUp from './signup/page';



const Home: React.FC = () => {
  
  return (
    <div>
      <UserList />
      <Dashboard />
      <Login />
      <SignUp />
    </div>

  );
};

export default Home
