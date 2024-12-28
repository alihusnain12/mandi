"use client";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addName, removeName, setNames, setSelectedName } from '../store/nameSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdDelete } from 'react-icons/md';
import { useRouter } from 'next/navigation';

const SearchPage = () => {
  const [name, setName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isClient, setIsClient] = useState(false);
  const dispatch = useDispatch();
  const names = useSelector((state) => state.names.list);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);
      const storedNames = JSON.parse(localStorage.getItem('names')) || [];
      dispatch(setNames(storedNames));
    }
  }, [dispatch]);

  const handleAddName = () => {
    if (name) {
      dispatch(addName(name));
      toast.success("Name added successfully!");
      setName('');
    }
  };

  const handleDeleteName = (nameToDelete) => {
    dispatch(removeName(nameToDelete));
    toast.info(`${nameToDelete} removed.`);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleNameClick = (selectedName) => {
    dispatch(setSelectedName(selectedName));
    router.push(`/details`);
  };

  const filteredNames = names.filter((n) =>
    n.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isClient) {
    return null; // Render nothing on the server
  }

  return (
    <div className="p-4">
      <div className="w-full bg-gray-800 p-4 flex flex-col md:flex-row justify-between items-center rounded-md">
        {/* Search Field */}
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search name..."
          className="border border-gray-300 rounded-md p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 mb-2 md:mb-0"
        />
        <div className="flex items-center space-x-4">
          {/* Enter Name Field */}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name..."
            className="border border-gray-300 rounded-md p-2 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
          <button
            onClick={handleAddName}
            className="bg-blue-500 text-white rounded-md px-4 py-2 ml-2 hover:bg-blue-600 transition-colors duration-200"
          >
            Add Name
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center bg-gray-100 mt-8">
        <div className="w-full max-w-md">
          <h3 className="text-2xl font-bold mb-4">Names List:</h3>
          <ul className="space-y-2">
            {filteredNames.map((nameItem, index) => (
              <li
                key={index}
                className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center hover:bg-gray-50 transition-colors duration-200"
              >
                <span
                  onClick={() => handleNameClick(nameItem)}
                  className="cursor-pointer text-blue-500 hover:underline"
                >
                  {nameItem}
                </span>
                <MdDelete
                  onClick={() => handleDeleteName(nameItem)}
                  className="cursor-pointer text-red-500 hover:text-red-700 transition-colors duration-200"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default SearchPage;
