"use client"

import { useState, useEffect } from 'react';
import UserForm from '@/components/Userform';




const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('https://63c57732f80fabd877e93ed1.mockapi.io/api/v1/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleUserAdded = () => {
    fetchUsers();
  };

  const toggleUserSelection = (userId) => {
    setSelectedUsers((prevSelectedUsers) => {
      if (prevSelectedUsers.includes(userId)) {
        return prevSelectedUsers.filter((id) => id !== userId);
      } else {
        return [...prevSelectedUsers, userId];
      }
    });
  };

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map((user) => user.id));
    }
    setSelectAll((prevSelectAll) => !prevSelectAll);
  };

  const deleteSelectedUsers = async () => {
    try {
      await Promise.all(
        selectedUsers.map(async (userId) => {
          await fetch(`https://63c57732f80fabd877e93ed1.mockapi.io/api/v1/users/${userId}`, {
            method: 'DELETE',
          });
        })
      );
      fetchUsers();
      setSelectedUsers([]);
      setSelectAll(false);
    } catch (error) {
      console.error('Error deleting users:', error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Users</h1>
      <UserForm onUserAdded={handleUserAdded} />
      <div className="flex items-center space-x-4 mt-2">
        <button
          onClick={deleteSelectedUsers}
          className={`${
            selectedUsers.length > 0 ? 'bg-red-500 text-white' : 'bg-gray-300 text-gray-500'
          } py-2 px-4 rounded-md`}
          disabled={selectedUsers.length === 0}
        >
          Delete Selected
        </button>
        <input
          type="checkbox"
          checked={selectAll}
          onChange={toggleSelectAll}
          className="form-checkbox h-5 w-5 text-blue-500"
        />
        <span className="font-bold text-lg">Select All</span>
      </div>
      {users.map((user) => (
        <div
          key={user.id}
          className={`flex items-center space-x-4 mt-2 ${
            selectedUsers.includes(user.id) ? 'bg-blue-100' : ''
          }`}
        >
          <input
            type="checkbox"
            checked={selectedUsers.includes(user.id)}
            onChange={() => toggleUserSelection(user.id)}
            className="form-checkbox h-5 w-5 text-blue-500"
          />
          <img src={user.avatar} alt="User Avatar" className="w-12 h-12 rounded-full" />
          <div>
            <p className="font-bold">{user.name}</p>
            <p>{user.email}</p>
            <p>{user.job}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Users;


