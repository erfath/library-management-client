import React from 'react';
import BackToTop from '../BackToTop/BackToTop';
import Footer from '../Footer/Footer';
import Banner from './Banner';
import Books from './Books';
import GetInTouch from './GetInTouch';

const Home = () => {
    return (
        <div className='bg-slate-50'>
            <Banner></Banner>
            <Books></Books>
            <GetInTouch></GetInTouch>
            <BackToTop></BackToTop>
        </div>
    );
};

export default Home;