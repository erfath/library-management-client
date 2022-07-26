import React, { useEffect, useState } from 'react';
import useBooks from '../../Hooks/useBooks';
import Book from './Book';

const Books = () => {
    const [books, setBooks] = useBooks();
    const [searchBook, setSearchBook] = useState("");

    return (
        <div>
            <div className='lg:flex justify-between'>
                <h2 className='m-10 text-4xl border-b-4  font-semibold lg:w-96'>   Popular Book's Now</h2>
                <div>
                    <input onChange={(event) => {
                        setSearchBook(event.target.value)
                    }} type="text" className="form-control block w-72 p-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none m-10" placeholder='Search...' />
                </div>
            </div>
            <div className='flex justify-center'>
                <div className='grid lg:grid-cols-3 gap-20 grid-cols-1'>
                    {
                        books.filter((book) => {
                            if (searchBook === "") {
                                return book
                            }
                            else if (book.name.toLowerCase().includes(searchBook.toLowerCase())) {
                                return book
                            }
                            else if (book.author.toLowerCase().includes(searchBook.toLowerCase())) {
                                return book
                            }
                        }).map((book) => <Book
                            book={book}
                            key={book._id}></Book>)
                    }
                </div>
            </div>
            <div className='flex flex-row lg:justify-end justify-center p-5'>
                <button type="button" class="inline-block px-6 py-2 border-2 border-blue-600 text-blue-600 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out">Explore More <i class="fas fa-arrow-right"></i></button>
            </div>
        </div>
    );
};

export default Books;