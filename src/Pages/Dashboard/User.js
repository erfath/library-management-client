import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const User = ({ user, index, refetch }) => {
    const { email, role } = user;
    const makeAdmin = () => {
        fetch(`http://localhost:5000/user/admin/${email}`, {
            method: 'PUT',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
               if(data.modifiedCount===1){
                refetch();
                toast.success('Successfully Added As An Admin')
               }
            
            })

    }

    return (

        <tr class="border-b">
            <td class="px-6 py-4 whitespace-nowrap lg:text-xl font-medium text-gray-900">{index + 1}</td>
            <td class="lg:text-xl text-gray-900 px-6 py-4 whitespace-nowrap">
                {email}
            </td>
            <td class="lg:text-sm text-gray-900 px-6 py-4 whitespace-nowrap">
                {role !== 'admin' ?
                    <Link onClick={makeAdmin} className='inline-block px-2 py-1 border-2 border-green-200 text-green-500 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 hover:border-green-600 hover:text-green-600 focus:outline-none focus:ring-0 transition duration-150 ease-in-out' to='/'>Make Admin  <i class="fas fa-check-circle"></i></Link> : <span className='text-black font-serif font-semibold'>Already an Admin</span>}
                <Link className='inline-block ml-2 px-2 py-1 border-2 border-red-200 text-red-500 font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 hover:border-red-600 hover:text-red-600 focus:outline-none focus:ring-0 transition duration-150 ease-in-out' to='/'>Remove  <i class="fas fa-ban"></i></Link>
            </td>
        </tr>

    );
};

export default User;