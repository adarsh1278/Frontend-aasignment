import { useState } from 'react';

const UserForm = ({ onUserAdded }) => {
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserAvatar, setNewUserAvatar] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await fetch('https://63c57732f80fabd877e93ed1.mockapi.io/api/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: newUserEmail,
          avatar: newUserAvatar,
        }),
      });
      onUserAdded();
      setNewUserEmail('');
      setNewUserAvatar('');
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <label className="block mb-2">Email:</label>
      <input
        type="email"
        value={newUserEmail}
        onChange={(e) => setNewUserEmail(e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2 w-full mb-4"
        required
      />
      <label className="block mb-2">Avatar URL:</label>
      <input
        type="text"
        value={newUserAvatar}
        onChange={(e) => setNewUserAvatar(e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2 w-full mb-4"
        required
      />
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md">
        Add User
      </button>
    </form>
  );
};

export default UserForm;
