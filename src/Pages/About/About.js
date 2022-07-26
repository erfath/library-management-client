import React from 'react';
import img from '../../images/DSC_3172-removebg-preview (2).png'

const About = () => {
    return (
        <div className='h-screen flex justify-center  items-center'>
            <div class="flex justify-center">
                <div class="flex flex-col justify-center items-center md:flex-row md:max-w-xl rounded-lg bg-gray-600 shadow-lg">
                    <div class="p-6 flex flex-col justify-start">
                        <h5 class="text-white text-2xl font-serif font-medium mb-2">Hi! I am <br /> Erfath Parvez </h5>
                        <p class="text-white text-base mb-1">
                            <span className='border-b-2'>Student ID:</span> 201909526109
                        </p>
                        <p class="text-white text-base mb-1">
                            <span className='border-b-2'>Major:</span> CST
                        </p>
                        <p class="text-white text-base mb-1">
                            <span className='border-b-2'>Batch:</span> 2019
                        </p>
                        <p class="text-white text-base"><span className='border-b-2'>Contact:</span></p>
                        <p class="text-white text-base">erfathparvez1@gmail.com</p>
                        <p class="text-white text-base">+8801873-844252</p>
                    </div>
                    <img class=" w-full md:h-auto object-cover md:w-72 rounded-t-lg md:rounded-none md:rounded-l-lg" src={img} alt="" />
                </div>
            </div>
        </div>
    );
};

export default About;