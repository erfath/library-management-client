import React from 'react';
import useBooks from '../../Hooks/useBooks';
import BookListTable from './BookListTable';

const BookList = () => {
    const [books] = useBooks()

    return (
        <div>
            <h2 className='text-red-800'>All Books Are Here</h2>
            <div class="flex flex-col  w-52 lg:w-full">
                <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div class="overflow-x-auto">
                            <table class="min-w-full">
                                <thead class="border-b">
                                    <tr className='bg-gray-600'>
                                        <th scope="col" class="text-xl font-serif font-bold text-white px-6 py-4 text-left">
                                            SL.
                                        </th>
                                        <th scope="col" class="text-xl font-serif font-bold text-white px-6 py-4 text-left">
                                            Name
                                        </th>
                                        <th scope="col" class="text-xl font-serif font-bold text-white px-6 py-4 text-left">
                                            Author
                                        </th>
                                        <th scope="col" class="text-xl font-serif font-bold text-white px-6 py-4 text-left">
                                            Quantity
                                        </th>
                                        <th scope="col" class="text-xl font-serif font-bold text-white px-6 py-4 text-left">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        books.map((book, index) => <BookListTable
                                            book={book}
                                            index={index}
                                            key={book._id}></BookListTable>)
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

export default BookList;