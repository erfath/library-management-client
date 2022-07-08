import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner';
import User from './User';

const Users = () => {
    const { data: users, isLoading, refetch } = useQuery('users', () => fetch('http://localhost:5000/user', {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }).then(res => res.json()));
    if (isLoading) {
        return <Spinner></Spinner>
    }

    return (
        <div>
            <h2>All Users Are Here {users.length}</h2>
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
                                                User Email
                                            </th>
                                            <th scope="col" class="lg:text-xl font-serif text-gray-900 px-6 py-4 text-center">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            users.map((user, index) => <User
                                                key={user._id}
                                                user={user}
                                                index={index}
                                                refetch={refetch}
                                            ></User>)
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Users;