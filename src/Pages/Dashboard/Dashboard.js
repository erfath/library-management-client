import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, Outlet } from 'react-router-dom';
import auth from '../../firebase.init';
import useAdmin from '../../Hooks/useAdmin';

const Dashboard = () => {
    const [user] = useAuthState(auth);
    const [admin] = useAdmin(user);
    return (
        <div className='h-screen'>
            <h2 className='lg:text-4xl text-2xl font-bold p-2'>Welcome to Dashboard</h2>
            <div className='flex'>
                <div class="w-32 lg:w-64 h-full bg-white px-1">
                    <ul>
                        <li>
                            <Link to='/dashboard' class="flex p-2 items-center text-lg font-semibold  h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="dark">User Profile</Link>
                        </li>
                        <li>
                            <Link to='/dashboard/borrowedbook' class="flex p-2 items-center  h-12 text-lg font-semibold overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="dark">Borrowed <br />Books</Link>
                        </li>
                        <li>
                          {admin &&  <Link to='/dashboard/users' class="flex p-2 items-center  h-12 text-lg font-semibold overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="dark">All Users</Link>}
                        </li>
                    </ul>
                </div>
                <div>
                    <Outlet></Outlet>
                </div>
            </div>
            {/* className='flex flex-row-reverse lg:justify-around' */}

        </div>
    );
};

export default Dashboard;