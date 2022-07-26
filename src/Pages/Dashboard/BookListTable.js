import React, { useState } from 'react';
import { toast } from 'react-toastify';


const BookListTable = ({ book, index }) => {
    const [books, setBooks] = useState([])
    const { _id, name, author, quantity } = book;

    const handleDelete = id => {
        const proceed = window.confirm('Are You Sure?')
        if (proceed) {
            const url = `http://localhost:5000/book/${id}`
            fetch(url, {
                method: "DELETE",
                headers: {
                    'authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    if (data.deletedCount) {
                        toast.success(`Successfully Deleted`)
                    }
                    else{
                        toast.error('Failed to Delete')
                    }
                    const remaining = books.filter(book => book._id !== id);                
                    setBooks(remaining);
                    console.log(remaining)
                })
        }
    }


    return (
        <tr class="border-b">
            <td class="px-6 py-4 whitespace-nowrap text-lg font-medium text-gray-900">{index + 1}</td>
            <td class="text-lg text-black font-semibold px-6 py-4 whitespace-nowrap">
                {name}
            </td>
            <td class="text-lg text-black font-semibold px-6 py-4 whitespace-nowrap">
                {author}
            </td>
            <td class="text-lg text-black font-semibold px-6 py-4 whitespace-nowrap">
                {quantity}
            </td>
            <td class="text-lg text-black font-light px-6 py-4 whitespace-nowrap">
                <button onClick={() => handleDelete(_id)} className='text-red-600 text-xl'><i class="fas fa-trash-alt"></i></button>
                <span className='p-2'>or</span>
                <button className='text-green-600 text-xl'><i class="far fa-edit"></i></button>
            </td>
        </tr>
    );
};

export default BookListTable;