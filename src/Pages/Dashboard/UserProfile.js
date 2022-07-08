import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const UserProfile = () => {
    const [user] = useAuthState(auth)
    return (
        <div>
            <h2>Hello, dear {user.displayName}</h2>
        </div>
    );
};

export default UserProfile;