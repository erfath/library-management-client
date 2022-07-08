import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import locker from '../../images/logo_software.png'
import { useForm } from "react-hook-form";
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Spinner from '../Spinner';
import useToken from '../../Hooks/useToken';


const Register = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    const navigate = useNavigate()
    const [token] = useToken(user);

    let signInError;

    if (loading || updating) {
        return <Spinner></Spinner>
    }

    if (error || updateError) {
        signInError = <p className='text-red-500'>{error?.message}</p>
    }

    if (token) {
        navigate('/')
    }
    const onSubmit = async data => {
        console.log(data)
        await createUserWithEmailAndPassword(data.email, data.password)
        await updateProfile({ displayName: data.name });

    };
    return (
        <div>
            <section className="h-fit">
                <div className="container px-6 py-12 h-full">
                    <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
                        <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
                            <img
                                src={locker} className="w-full" alt="Phone image" />
                        </div>
                        <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
                            <h2 className='text-center text-4xl mb-7 font-bold text-blue-600'>Register Here</h2>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="mb-6">
                                    <input  {...register("name", {
                                        required: {
                                            value: true,
                                            message: 'Name Required'
                                        }
                                    })}
                                        type="text"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        placeholder="Your Name"
                                    />
                                    {errors.name?.type === 'required' && <span className='text-red-500'>{errors.name.message}</span>}
                                </div>
                                <div className="mb-6">
                                    <input {...register("email", {
                                        required: {
                                            value: true,
                                            message: 'Email Required'
                                        }
                                    })}
                                        type="text"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        placeholder="Email address"
                                    />
                                    {errors.email?.type === 'required' && <span className='text-red-500'>{errors.email.message}</span>}
                                </div>
                                <div className="mb-6">
                                    <input {...register("userid", {
                                        required: {
                                            value: true,
                                            message: 'ID Number Required'
                                        }, maxLength: {
                                            value: 20,
                                            message: 'Maximum 20 character or smaller'
                                        }
                                    })}
                                        type="text"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        placeholder="Your ID Number"
                                    />
                                    {errors.userid?.type === 'required' && <span className='text-red-500'>{errors.userid.message}</span>}
                                    {errors.userid?.type === 'maxLength' && <span className='text-red-500'>{errors.userid.message}</span>}
                                </div>


                                <div className="mb-6">
                                    <input {...register("password", {
                                        required: {
                                            value: true,
                                            message: 'Password Required'
                                        },
                                        minLength: {
                                            value: 6,
                                            message: 'Must be 6 character or longer'
                                        }
                                    })}
                                        type="password"
                                        className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        placeholder="Password"
                                    />
                                    {errors.password?.type === 'required' && <span className='text-red-500'>{errors.password.message}</span>}
                                    {errors.password?.type === 'minLength' && <span className='text-red-500'>{errors.password.message}</span>}
                                </div>
                                {signInError}
                                <button
                                    type="submit"
                                    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                                    data-mdb-ripple="true"
                                    data-mdb-ripple-color="light"
                                >
                                    Register
                                </button>
                                <div className="flex justify-center items-center mt-2">
                                    <p>Already have an account?</p>
                                    <Link to='/login' className="text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out ml-3">Sign in Here</Link>
                                </div>

                                <div
                                    className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5"
                                >
                                    <p className="text-center font-semibold mx-4 mb-0">OR</p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Register;