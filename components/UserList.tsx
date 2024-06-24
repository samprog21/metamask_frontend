import React, { useState, useEffect, useMemo } from 'react';
import { Tableview } from "@/components/Tableview";
import FilterForm from '@/components/FilterForm';
import { useGetFilteredUsersQuery } from "@/lib/features/user/userAPISlice";
import { UserGetApi, userQuery } from "@/interfaces/UserInterface";
import Loader from './ui/Loader';

export default function UserList() {
  const [filters, setFilters] = useState<userQuery>({});
  const { data: userList, error, isLoading, refetch } = useGetFilteredUsersQuery(filters);

  
  const filteredUsers = useMemo(() => {
    if (!userList) return [];

    let filtered: UserGetApi[] = [...userList];

    
    if (filters.firstName) {
      const searchTerm = filters.firstName.toLowerCase();
      filtered = filtered.filter(user =>
        user.firstName.toLowerCase().includes(searchTerm) ||
        user.lastName.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.lastName) {
      const searchTerm = filters.lastName.toLowerCase();
      filtered = filtered.filter(user =>
        user.lastName.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.email) {
      const searchTerm = filters.email.toLowerCase();
      filtered = filtered.filter(user =>
        user.email.toLowerCase().includes(searchTerm)
      );
    }

    return filtered;
  }, [userList, filters]);

  
  useEffect(() => {
    refetch();
  }, [filters, refetch]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    console.error("Error fetching user list:", error);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-black-100 text-white">
      <div className="bg-black-100 drop-shadow-card-glow sm:rounded-lg p-6">
        <FilterForm onFilterChange={setFilters} />
        <Tableview className="mt-4 drop-shadow-card-glow" userList={filteredUsers} />
      </div>
    </div>
  );
}
