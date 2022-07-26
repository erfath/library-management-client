import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import logoSoft from '../../images/locker.PNG'
import { useForm } from "react-hook-form";
import { useSignInWithEmailAndPassword, useSignInWithGithub } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import Spinner from '../Spinner';
import useToken from '../../Hooks/useToken';
import gitLogo from '../../images/github.png'

const Login = () => {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);
  const [signInWithGithub, gUser, gLoading, gError] = useSignInWithGithub(auth);
  const navigate = useNavigate();
  const location = useLocation();
  const [token] = useToken(user)

  let from = location.state?.from?.pathname || "/";
  let signInError;

  useEffect(() => {
    if (token || gUser) {
      navigate(from, { replace: true });
    }
  }, [token, gUser, from, navigate])

  if (loading || gLoading) {
    return <Spinner></Spinner>
  }

  if (error || gError) {
    signInError = <p className='text-red-500'>{error?.message}</p>
  }

  const onSubmit = data => {
    console.log(data)
    signInWithEmailAndPassword(data.email, data.password)
  };

  return (
    <div>
      <section className="h-fit">
        <div className="container px-6 py-12 h-full">
          <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
            <div className="md:w-8/12 lg:w-6/12 mb-12 md:mb-0">
              <img
                src={logoSoft} className="w-full" alt="Phone" />
            </div>
            <div className="md:w-8/12 lg:w-5/12 lg:ml-20">
              <h2 className='text-center text-4xl mb-7 font-bold text-blue-600'>Sign In Here</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-6">
                  <input {...register("email", {
                    required: {
                      value: true,
                      message: 'Email Required'
                    }
                  })}
                    type="text"
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    placeholder="Email"
                  />
                  {errors.email?.type === 'required' && <span className='text-red-500'>{errors.email.message}</span>}
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

                <div className="flex justify-around items-center mb-2">
                  <div className="form-group form-check">
                    <input
                      type="checkbox"
                      className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                      id="exampleCheck3"

                    />
                    <label className="form-check-label inline-block text-gray-800" for="exampleCheck2"
                    >Remember me</label>
                  </div>
                  <a
                    href="#!"
                    className="text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out"
                  >Forgot password?</a>

                </div>

                {signInError}
                <button
                  type="submit"
                  className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="light"
                >
                  Sign in
                </button>
                <div className="flex justify-center items-center mt-2">
                  <p>Don't have an account?</p>
                  <Link to='/register' className="text-blue-600 hover:text-blue-700 focus:text-blue-700 active:text-blue-800 duration-200 transition ease-in-out ml-3">Register Here</Link>
                </div>

                <div
                  className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                  <p className="text-center font-semibold mx-4 mb-0">OR</p>
                </div>
                <div className='flex justify-center items-center'>
                  <button onClick={() => signInWithGithub()} class="flex justify-center items-center px-6 py-1 bg-purple-500 text-white font-medium text-sm uppercase rounded-full shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out">Continue with Github<span><img style={{ width: '35px' }} src={gitLogo} alt="" /> </span></button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;