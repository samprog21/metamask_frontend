"use client";
import React, { useState,  } from "react";
import TableRow from "./TableRow";
import { Pagination } from "@/components/ui/Pagination";
import { UserGetApi } from "@/interfaces/UserInterface";

interface CardProps {
  className: string;
  userList: UserGetApi[];
}

export const Tableview = ({ className, userList }: CardProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = userList
    ? userList.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  return (
    <div id="tableView" className={`${className} py-20`}>
      <table className="table-auto border-separate border-2 border-gray-700 w-full text-white drop-shadow-card-glow">
        <thead className="border border-black-300 bg-black-100">
          <tr className="table-row">
            <th scope="col" className="px-16 py-3 text-center w-auto h-fit">No</th>
            <th scope="col" className="px-16 py-3 text-center w-auto h-fit">First Name</th>
            <th scope="col" className="px-16 py-3 text-center">Last Name</th>
            <th scope="col" className="px-6 py-3 text-center">Email</th>
            <th scope="col" className="px-6 py-3 text-center">Profile Picture</th>
            <th scope="col" className="px-6 py-3 text-center">DOB</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item: UserGetApi, index: number) => (
            <TableRow
              firstName={item.firstName}
              lastName={item.lastName}
              email={item.email}
              img={item.profilePicture}
              dob={item.dob}
              key={item.id}
              id={index + 1}
            />
          ))}
        </tbody>
      </table>
      <Pagination
        totalItems={userList?.length || 0}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
