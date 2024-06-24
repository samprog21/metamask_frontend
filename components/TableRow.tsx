"use client"
import React from 'react';

interface TableRowProps {
  firstName: string;
  lastName: string;
  email: string;
  img: string;
  dob: string;
  id: number;
}

const TableRow: React.FC<TableRowProps> = ({ firstName, lastName, email, img, dob, id }) => {
  return (
    <tr>
      <td className="px-16 py-3 text-center">{id}</td>
      <td className="px-16 py-3 text-center">{firstName}</td>
      <td className="px-16 py-3 text-center">{lastName}</td>
      <td className="px-6 py-3 text-center">{email}</td>
      <td className="px-6 py-3 text-center">
        <img src={img} alt={firstName} className="w-16 h-16 rounded-full" />
      </td>
      <td className="px-6 py-3 text-center">{dob}</td>
    </tr>
  );
};

export default TableRow;
