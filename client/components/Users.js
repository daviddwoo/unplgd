import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Users = () => {
  const users = useSelector((state) =>
    state.users.filter((user) => user.isAdmin === false)
  );

  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>
          <Link to={`/admin/users/${user.id}`}>{user.username} </Link>
        </div>
      ))}
    </div>
  );
};

export default Users;
