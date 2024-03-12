// import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className='p-2 flex flex-col gap-3 justify-center items-center'>
            <span>
                Welcome to Vendor Flow! A revolutionary app for simplifying
                Vendor payments!
            </span>
            <Link to='/register' className='p-2 underline text-blue-500'>
                Register
            </Link>
            <Link to='/login' className='p-2 underline text-blue-500'>
                Login
            </Link>
        </div>
    );
};

export default Home;
