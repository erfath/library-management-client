import { async } from '@firebase/util';
import React from 'react';
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';



const AddBook = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    const imgStorageKey = "852f1ded9ccf96152fa8763828b39cff";


    const onSubmit = async data => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imgStorageKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                if (result.success) {
                    const img = result.data.url;
                    const book = {
                        name: data.book,
                        author: data.author,
                        isbn: data.isbn,
                        category: data.category,
                        quantity: data.quantity,
                        rack: data.rack,
                        img: img
                    }
                    fetch('http://localhost:5000/book', {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            'authorization': `Bearer ${localStorage.getItem('token')}`
                        },
                        body: JSON.stringify(book)
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data.acknowledged === true) {
                                toast.success('Book added to list Successfully')
                                reset();
                            }
                            else {
                                toast.error('Failed to Add a Book')
                            }
                        })
                }
            })
    };


    return (
        <div className='h-screen'>
            <h2 className='border-b-4 text-red-800 w-32 text-2xl font-semibold font-serif'>Book Info</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='lg:grid grid-cols-3 gap-5'>
                    <div>
                        <label for="book" class="form-label inline-block lg:m-2 mt-2 text-gray-700">Book's Name</label>
                        <input  {...register("book", {
                            required: {
                                value: true,
                                message: "Book's Name Required"
                            }
                        })}
                            type="text"
                            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            placeholder="Book's Name"
                        />
                        {errors.book?.type === 'required' && <span className='text-red-500'>{errors.book.message}</span>}
                    </div>

                    <div>
                        <label for="Author" class="form-label inline-block lg:m-2 mt-2  text-gray-700">Writer's Name</label>
                        <input  {...register("author", {
                            required: {
                                value: true,
                                message: "Author's Name Required"
                            }
                        })}
                            type="text"
                            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            placeholder="Author's Name"
                        />
                        {errors.author?.type === 'required' && <span className='text-red-500'>{errors.author.message}</span>}
                    </div>

                    <div>
                        <label for="categories" class="form-label inline-block lg:m-2 mt-2  text-gray-700">Categories</label>
                        <select className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" {...register("category")}>
                            <option value="Adventure">Adventure</option>
                            <option value="Horror">Horror</option>
                            <option value="Thriller">Thriller</option>
                            <option value="Romance">Romance</option>
                            <option value="Fantasy">Fantasy</option>
                            <option value="History">History</option>
                            <option value="Mystery">Mystery</option>
                            <option value="Computers and Tech">Computers and Tech</option>
                        </select>
                    </div>

                    <div>
                        <label for="isbn" class="form-label inline-block lg:m-2 mt-2 text-gray-700">ISBN</label>
                        <input {...register("isbn", {
                            required: {
                                value: true,
                                message: 'ISBN Required'
                            }, maxLength: {
                                value: 13,
                                message: 'Maximum 13 character'
                            }
                        })}
                            type="text"
                            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            placeholder="ISBN"
                        />
                        {errors.isbn?.type === 'required' && <span className='text-red-500'>{errors.isbn.message}</span>}
                        {errors.isbn?.type === 'maxLength' && <span className='text-red-500'>{errors.isbn.message}</span>}
                    </div>

                    <div>
                        <label for="quantity" class="form-label inline-block lg:m-2 mt-2  text-gray-700">Quantity</label>
                        <input {...register("quantity", {
                            required: {
                                value: true,
                                message: 'Quantity Required'
                            }
                        })}
                            type="text"
                            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            placeholder="Quantity"
                        />
                        {errors.quantity?.type === 'required' && <span className='text-red-500'>{errors.quantity.message}</span>}
                    </div>

                    <div>
                        <label for="rack" class="form-label inline-block lg:m-2 mt-2  text-gray-700">Rack No.</label>
                        <select className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" {...register("rack")}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                        </select>
                    </div>


                    <div class="mb-3 lg:w-96">
                        <label for="formFile" class="form-label inline-block lg:m-2 mt-2  text-gray-700">Photo</label>
                        <input {...register("image")} class="form-control  block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file" id="formFile" />
                    </div>

                </div>
                <div>
                    <input class="inline-block mt-10 px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" type="submit" value="Add" />
                </div>
            </form>
        </div>
    );
};

export default AddBook;