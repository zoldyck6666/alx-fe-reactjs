import React, { useContext } from 'react';
import UserContext from '../UserContext'; // adjust path if needed

const UserProfile = () => {
  const userData = useContext(UserContext);

  return (
    <div>
      <h2>{userData.name}</h2>
      {/* You can add other fields if you add them in userData */}
      <p>Email: {userData.email}</p>
    </div>
  );
};

export default UserProfile;
