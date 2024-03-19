import { Link } from 'react-router-dom';
import React from 'react';
import { useContext, useState, useEffect, useCallback } from 'react';
import { AuthContext } from '../../context/authContext';

const Navbar = () => {
    const auth = useContext(AuthContext);

    return (
        <div className='flex flex-row justify-around items-center bg-black text-[#989999] border-b-[1px] border-[#4e4e4e70] py-4 md:text-lg z-10 fixed w-full'>
            {auth.isLoggedIn && (
                <div className='flex items-center justify-center'>
                    <img src='logo.png' className='w-64' />
                </div>
            )}
            {auth.isLoggedIn && (
                <div className='flex gap-5'>
                    <Link
                        to='/dashboard'
                        className='hover:text-white font-bold'
                    >
                        Dashboard
                    </Link>
                    <Link
                        to='/readytopay'
                        className='hover:text-white font-bold'
                    >
                        Ready To Pay
                    </Link>
                    <Link to='/paid' className='hover:text-white font-bold'>
                        Paid
                    </Link>
                    <Link to='/history' className='hover:text-white font-bold'>
                        Transaction History
                    </Link>
                    <Link to='/audit' className='hover:text-white font-bold'>
                        Audit Trails
                    </Link>
                </div>
            )}

            {!auth.isLoggedIn && (
                <div className='flex items-center justify-center'>
                    <img src='logo.png' className='w-64' />
                </div>
            )}
            {!auth.isLoggedIn && (
                // <div className='flex '>

                <div className='flex gap-3'>
                    <Link to='/register' className='hover:text-white font-bold'>
                        Register
                    </Link>
                    <Link to='/login' className='hover:text-white font-bold'>
                        Login
                    </Link>
                </div>
                // </div>
            )}
            {auth.isLoggedIn && (
                <div className='flex gap-3'>
                    <p className='hover:text-white font-bold'>
                        <button onClick={auth.logout}>Logout</button>
                    </p>
                </div>
            )}
        </div>
    );
};

export default Navbar;
