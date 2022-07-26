import React from 'react';
import { useNavigate } from "react-router-dom";
const Book = ({ book }) => {
   

    
    const {_id, name, author, img } = book;

    const navigate = useNavigate()

    const goToBookDetails = id =>{
        navigate(`/book/${_id}`)
    }
    return (
        <div className="flex justify-center book" style={{width: "300px"}} >
            <div className="rounded-lg shadow-lg bg-white max-w-sm">
                <a href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light">
                    <img className="rounded-t-lg" src={img} alt="" />
                </a>
                <div className="px-4 pt-4 flex flex-row gap-3 justify-between">
                    <div>
                        <h5 className="text-gray-900 text-xl font-medium mb-2">{name}</h5>
                        <h5 className="text-gray-900 text-sm font-medium mb-2">{author}</h5>
                    </div>

                    <div>
                        <button onClick={()=> goToBookDetails(_id)} type="button" className="inline-block px-3 py-3 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out">Details</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Book;