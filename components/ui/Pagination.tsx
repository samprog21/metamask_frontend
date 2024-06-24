"use client";
import React from 'react';
import { BottomGradient } from './BottomGradient';

interface PaginationProps {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

export function Pagination({ totalItems, itemsPerPage, currentPage, onPageChange }: PaginationProps) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= totalPages) {
            onPageChange(newPage);
        }
    };

    return (
        <div className="py-2 w-full my-10 rounded-md flex items-center justify-between border-t border-gray-700 bg-black-300 sm:px-6 gap-2">
            <div className="flex justify-between w-full sm:w-auto items-center space-x-1">
                <button
                    type="button"
                    className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 text-white rounded-md  font-medium shadow-sm  items-center justify-center space-x-2 h-[50px] w-[100px]"
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    <span className="flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M11.293 16.707a1 1 0 0 1-1.414 0L4.586 12.5a1 1 0 0 1 0-1.414l5.293-5.293a1 1 0 1 1 1.414 1.414L7.414 11H16a1 1 0 1 1 0 2H7.414l3.293 3.293a1 1 0 0 1 0 1.414z" />
                        </svg>
                    </span>
                    Previous
                    <BottomGradient />
                </button>
                <div style={{ width: '200px' }}></div> {/* Placeholder for 200px distance */}
                <button
                    type="button"
                    className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 text-white rounded-md  font-medium shadow-sm items-center justify-center space-x-2 h-[50px] w-[100px]"
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    Next
                    <span className="flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white transform rotate-180" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M11.293 16.707a1 1 0 0 1-1.414 0L4.586 12.5a1 1 0 0 1 0-1.414l5.293-5.293a1 1 0 1 1 1.414 1.414L7.414 11H16a1 1 0 1 1 0 2H7.414l3.293 3.293a1 1 0 0 1 0 1.414z" />
                        </svg>
                    </span>
                    <BottomGradient />
                </button>
            </div>
            <div className="sm:flex sm:flex-1 sm:items-center sm:justify-center justify-center mt-4 sm:mt-0">
                <div className="text-sm text-gray-300">
                    Showing
                    <span className="font-medium"> {Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)} </span>
                    to
                    <span className="font-medium"> {Math.min(currentPage * itemsPerPage, totalItems)} </span>
                    of
                    <span className="font-medium"> {totalItems} </span>
                    results
                </div>
                <nav className="flex space-x-2 mt-4 sm:mt-0">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            type="button"
                            className={`bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 text-white rounded-md h-10 font-medium shadow-sm ${currentPage === i + 1 ? 'bg-gray-800' : ''} text-2xl mx-4 h-[50px] w-[50px]`}
                            key={i}
                            onClick={() => handlePageChange(i + 1)}
                        >
                            {i + 1}
                            <BottomGradient />
                        </button>
                    ))}
                </nav>
            </div>
        </div>
    );
}
