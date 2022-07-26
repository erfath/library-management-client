import React from 'react';
import { Link } from 'react-router-dom';
import error from '../images/error.jpg'

const Error = () => {
    return (
        <div className='flex justify-center items-center h-screen'>
            <div>
                <h2 className='text-2xl text-red-500'>Opppps!</h2>
                <img src={error} alt='' />
                <p>The Page you are looking for is not available here.</p>
                <Link className="inline-block px-6 py-2 border-2 border-blue-500 text-blue-500 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out mt-5" to='/'>Back to Home Page <i class="fas fa-undo"></i></Link></div>
        </div>
    );
};

export default Error;