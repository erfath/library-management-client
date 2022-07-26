import React, { useState } from 'react';
import Spinner from '../Spinner';
import { useQuery } from 'react-query';
import IssueBookList from './IssueBookList';

const IssueBook = () => {
    const { data: issueBooks, isLoading, refetch } = useQuery('issueBooks', () => fetch('http://localhost:5000/issue', {
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
            <h2 className='text-red-800'>Total Issued Books: {issueBooks.length}</h2>
            <div class="flex w-52 lg:w-full flex-col">
                <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div class="overflow-hidden">
                            <table class="min-w-full">
                                <thead class="border-b">
                                    <tr className='bg-gray-600'>
                                        <th scope="col" class="lg:text-xl font-serif text-white px-6 py-4 text-left">
                                            SL.
                                        </th>
                                        <th scope="col" class="lg:text-xl font-serif text-white px-6 py-4 text-left">
                                            Book Name
                                        </th>
                                        <th scope="col" class="lg:text-xl font-serif text-white px-6 py-4 text-center">
                                            Issued To
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        issueBooks.map((issueBook, index) => <IssueBookList
                                            key={issueBook._id}
                                            issueBook={issueBook}
                                            index={index}
                                            refetch={refetch}
                                        ></IssueBookList>)
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

export default IssueBook;