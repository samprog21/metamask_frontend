import { userQuery } from '@/interfaces/UserInterface';
import React, { useState } from 'react';
import { BottomGradient } from './ui/BottomGradient';
import { Input } from './ui/Input';


interface FilterFormProps {
  onFilterChange: (filters: userQuery) => void;
}

const FilterForm: React.FC<FilterFormProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState<userQuery>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    onFilterChange(filters);
  };

  return (
    <div className="p-4 bg-black-100 rounded-md mb-4">
      <div className="flex space-x-4">
        <Input
          type="text"
          name="firstName"
          value={filters.firstName}
          onChange={handleChange}
          placeholder="First Name"
          className="px-4 py-2 border border-black-200 rounded-md bg-gray-900 text-white"
        />
        <Input
          type="text"
          name="lastName"
          value={filters.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          className="px-4 py-2 border border-gray-700 rounded-md bg-gray-900 text-white"
        />
        <Input
          type="text"
          name="email"
          value={filters.email}
          onChange={handleChange}
          placeholder="Email"
          className="px-4 py-2 border border-gray-700 rounded-md bg-gray-900 text-white"
        />
        <div className='w-[200px] flex justify-around'>
        
         <button
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
            onClick={handleSearch}
          >
            Search
           
            <BottomGradient />
          </button>
          </div>
      </div>
    </div>
  );
};

export default FilterForm;
