import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';


const BorrowedBookList = () => {
    const [borrowBooks, setBorrowBooks] = useState([]);
    const [user] = useAuthState(auth);
    const navigate = useNavigate()
    useEffect(() => {
        if (user) {
            fetch(`http://localhost:5000/borrow?userEmail=${user.email}`, {
                method: 'GET',
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(res => {
                    if (res.status === 401 || res.status === 403) {
                        signOut(auth);
                        localStorage.removeItem('token');
                        navigate('/')
                    }
                    return res.json()
                })
                .then(data => {
                    console.log(data)
                    setBorrowBooks(data)
                })
        }
    }, [user])


    return (
        <div>
            <div class="flex w-52 lg:w-full flex-col">
                <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div class="overflow-hidden">
                            <table class="min-w-full">
                                <thead class="border-b">
                                    <tr>
                                        <th scope="col" class="lg:text-xl font-serif text-gray-900 px-6 py-4 text-left">
                                            SL.
                                        </th>
                                        <th scope="col" class="lg:text-xl font-serif text-gray-900 px-6 py-4 text-left">
                                            Book Name
                                        </th>
                                        <th scope="col" class="lg:text-xl font-serif text-gray-900 px-6 py-4 text-left">
                                            Borrow Status
                                        </th>
                                        <th scope="col" class="lg:text-xl font-serif text-gray-900 px-6 py-4 text-left">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        borrowBooks.map((borrowBook, index) => <tr class="border-b">
                                            <td class="px-6 py-4 whitespace-nowrap lg:text-xl font-medium text-gray-900">{index + 1}</td>
                                            <td class="lg:text-xl text-gray-900 px-6 py-4 whitespace-nowrap">
                                                {borrowBook.book}
                                            </td>
                                            <td class="lg:text-xl text-gray-900 px-6 py-4 whitespace-nowrap">
                                                Request Placed
                                            </td>
                                            <td class="lg:text-sm text-gray-900  px-6 py-4 whitespace-nowrap">
                                                <Link className='inline-block px-2 py-1 border-2 border-red-600 text-red-600 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out' to='/'>Return  <i class="fas fa-undo"></i></Link>
                                            </td>
                                        </tr>)
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BorrowedBookList;