import React from 'react';
import logo from '../../images/gxuwz.png'
import { Link } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { signOut } from 'firebase/auth';

const Navbar = () => {
    const [user, loading, error] = useAuthState(auth);
    const logout = () => {
        signOut(auth);
        localStorage.removeItem('token');
    };
    return (
        <nav class="
       sticky top-0 z-50 w-full flex flex-wrap items-center justify-between py-4 bg-gray-100 text-gray-500 hover:text-gray-700 focus:text-gray-700 shadow-lg navbar navbar-expand-lg navbar-light">
            <div class="container-fluid w-full flex flex-wrap items-center justify-between px-6">
                <button class="navbar-toggler text-gray-500 border-0 hover:shadow-none hover:no-underline py-2 px-2.5 bg-transparent focus:outline-none focus:ring-0 focus:shadow-none focus:no-underline" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bars"
                        class="w-6" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path fill="currentColor"
                            d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z">
                        </path>
                    </svg>
                </button>
                <div class="collapse navbar-collapse flex-grow items-center" id="navbarSupportedContent">
                    <a class="flex items-center text-gray-900 hover:text-gray-900 focus:text-gray-900 mt-2 lg:mt-0 mr-1" href="/">
                        <img src={logo} style={{ height: "40px" }} alt=""
                            loading="lazy" />
                    </a>
                    {/* <!-- Left links --> */}
                    <ul class="navbar-nav flex flex-col pl-0 list-style-none mr-auto">
                        <li class="nav-item p-2">
                            <Link to='/' class="nav-link text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0">Home</Link>
                        </li>
                        {
                            user && <li class="nav-item p-2">
                                <Link to='/dashboard' class="nav-link text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0">Dashboard</Link>
                            </li>
                        }
                        <li class="nav-item p-2">
                            <Link to='/blogs' class="nav-link text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0" href="#">Blogs</Link>
                        </li>
                        <li class="nav-item p-2">
                            <Link to='/about' className="nav-link text-gray-500 hover:text-gray-700 focus:text-gray-700 p-0">About Me</Link>
                        </li>
                    </ul>
                    {/* <!-- Left links --> */}
                </div>
                {/* <!-- Collapsible wrapper -->

                <!-- Right elements --> */}
                <div class="flex items-center relative">
                    <ul class="navbar-nav flex flex-col pl-0 list-style-none mr-auto">
                        {user ? <button class="inline-block px-6 py-2 border-2  border-red-300 hover:border-red-500 font-semibold text-red-500 hover:text-red-500 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out" onClick={logout}>Logout</button> : <Link to='/login' class="inline-block px-6 py-2 border-2 border-green-500 text-green-500 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Login</Link>}
                    </ul>


                </div>
            </div>
        </nav>
    );
};

export default Navbar;