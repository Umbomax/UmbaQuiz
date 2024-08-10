import React, { useState } from "react";
import axios from 'axios';
import classes from "./AllUsers.module.css";

function AllUsers({ users, setUsers }) {
  const [editingUser, setEditingUser] = useState(null);
  const [editedUser, setEditedUser] = useState({});
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleEdit = (user) => {
    setEditingUser(user._id);
    setEditedUser(user);
  };

  const handleSave = async (userId) => {
    try {
      await axios.put(`${apiUrl}/users/${userId}`, editedUser);
      setUsers(users.map(user => user._id === userId ? editedUser : user));
      setEditingUser(null);
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`${apiUrl}/users/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className={classes.allUsers}>
      {users.map((user) => (
        <div key={user._id} className={classes.userInfo}>
          {editingUser === user._id ? (
            <>
              <input
                type="text"
                value={editedUser.username}
                onChange={(e) => setEditedUser({ ...editedUser, username: e.target.value })}
              />
              <input
                type="email"
                value={editedUser.email}
                onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
              />
              <select
                value={editedUser.role}
                onChange={(e) => setEditedUser({ ...editedUser, role: e.target.value })}
              >
                <option value="User">User</option>
                <option value="Admin">Admin</option>
                <option value="SuperAdmin">SuperAdmin</option>
              </select>
              <button onClick={() => handleSave(user._id)}>Save</button>
              <button onClick={() => setEditingUser(null)}>Cancel</button>
            </>
          ) : (
            <>
              <div>{user.username}</div>
              <div>{user.email}</div>
              <div>{user.role}</div>
              <button onClick={() => handleEdit(user)}>Edit</button>
              <button onClick={() => handleDelete(user._id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default AllUsers;
