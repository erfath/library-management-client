import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const UserProfile = () => {
    const [user] = useAuthState(auth)
    return (
        <div className='h-screen'>
            <h2 className='text-xl'>Hello, dear <span className='text-red-800 text-2xl'>{user.displayName}</span></h2>
        </div>
    );
};

export default UserProfile;