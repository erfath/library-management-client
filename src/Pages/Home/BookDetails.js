import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate, useParams } from "react-router-dom";
import auth from '../../firebase.init';
import { toast } from 'react-toastify';
const BookDetail = () => {
    const { id } = useParams();
    const [user] = useAuthState(auth);
    const [book, setBook] = useState({});
    useEffect(() => {
        const url = `http://localhost:5000/book/${id}`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setBook(data)
            });
    }, [])

    const {_id, name, author, quantity, category} = book;
    const navigate = useNavigate();
    const handleBorrow = (event) => {
        event.preventDefault();
        const borrow = {
            bookId: _id,
            book: name,
            userName: user.displayName,
            userEmail: user.email,
        }

        fetch('http://localhost:5000/borrow', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(borrow)
        })
            .then(res => res.json())
        
            .then(data => {
                console.log(data) 
               toast('Request sent to Librarian') 
               navigate('/dashboard/borrowedbook')         
            })
    }

    return (
        <div className='lg:h-screen mt-10 flex justify-center items-center'>
            <div class="flex justify-center">
                <div class="flex flex-col justify-center items-center text-center md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg">
                    <img class="rounded-lg w-44" src={book.img} alt="" />
                    <div class="p-6 flex flex-col justify-start">
                        <h5 class="text-gray-900 text-2xl font-serif font-bold mb-2">{book.name}</h5>
                        <p class="text-gray-700 text-base mb-1">Author: <span className='font-semibold font-sans'>{author}</span></p>
                        <p>{user.displayName}</p>
                        <p class="text-gray-700 text-base mb-1">Category: <span className='font-semibold font-sans'>{category}</span></p>
                        <p class="text-gray-700 text-base mb-1">Available Quantity: <span className='font-semibold font-sans'>{quantity}</span></p>
                        <button onClick={handleBorrow} type="button" class="inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out">Borrow</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetail;