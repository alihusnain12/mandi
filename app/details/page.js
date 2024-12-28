"use client";
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addRow, setRows } from '../../store/detailSlice';

const DetailsPage = () => {
  const selectedName = useSelector((state) => state.names.selectedName);
  const rows = useSelector((state) => state.rows[selectedName] || []);
  const dispatch = useDispatch();
  const [moneyReceived, setMoneyReceived] = useState(0);
  const [moneyGiven, setMoneyGiven] = useState(0);
  const [receivedType, setReceivedType] = useState('cash');

  const totalLeft = moneyReceived - moneyGiven;

  useEffect(() => {
    if (selectedName && typeof window !== 'undefined') {
      const storedRows = JSON.parse(localStorage.getItem('rows')) || {};
      dispatch(setRows({ name: selectedName, rows: storedRows[selectedName] || [] }));
    }
  }, [dispatch, selectedName]);

  const handleCreate = () => {
    const newRow = {
      date: new Date().toLocaleDateString(),
      moneyReceived,
      moneyGiven,
      totalLeft,
      receivedType
    };
    dispatch(addRow({ name: selectedName, row: newRow }));
    // Clear the inputs after creating the row
    setMoneyReceived(0);
    setMoneyGiven(0);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-4">Details Page</h1>
      <p className="text-xl">Name: {selectedName}</p>

      {/* Create Button */}
      <button
        onClick={handleCreate}
        className="bg-blue-500 text-white rounded-md px-4 py-2 mt-4 hover:bg-blue-600 transition-colors duration-200"
      >
        Create
      </button>

      {/* Money Given Field */}
      <div className="mt-4">
        <label className="block text-gray-700 font-semibold mb-2">Money Given</label>
        <input
          type="number"
          value={moneyGiven}
          onChange={(e) => setMoneyGiven(Number(e.target.value))}
          placeholder="Enter amount"
          className="border p-2 border-black w-full rounded-md"
        />
      </div>

      {/* Money Received Field */}
      <div className="mt-4">
        <label className="block text-gray-700 font-semibold mb-2">Money Received</label>
        <div className="flex items-center space-x-4">
          <input
            type="number"
            value={moneyReceived}
            onChange={(e) => setMoneyReceived(Number(e.target.value))}
            placeholder="Enter amount"
            className="border p-2 border-black rounded-md w-full"
          />
          <select
            value={receivedType}
            onChange={(e) => setReceivedType(e.target.value)}
            className="border p-2 border-black rounded-md"
          >
            <option value="cash">Cash</option>
            <option value="check">Check</option>
          </select>
        </div>
      </div>

      {/* Total Left Field */}
      <div className="mt-4">
        <label className="block text-gray-700 font-semibold mb-2">Total Left</label>
        <input
          type="number"
          value={totalLeft}
          readOnly
          className="border p-2 border-black w-full rounded-md bg-gray-100"
        />
      </div>

      {/* Table to Display Rows */}
      <div className="mt-8 overflow-x-auto">
        <table className="min-w-full bg-white border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border border-gray-300">Date</th>
              <th className="py-2 px-4 border border-gray-300">Money Given</th>
              <th className="py-2 px-4 border border-gray-300">Money Received</th>
              <th className="py-2 px-4 border border-gray-300">Type</th>
              <th className="py-2 px-4 border border-gray-300">Total Left</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border border-gray-300">{row.date}</td>
                <td className="py-2 px-4 border border-gray-300">{row.moneyGiven}</td>
                <td className="py-2 px-4 border border-gray-300">{row.moneyReceived}</td>
                <td className="py-2 px-4 border border-gray-300">{row.receivedType}</td>
                <td className="py-2 px-4 border border-gray-300">{row.totalLeft}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DetailsPage;
