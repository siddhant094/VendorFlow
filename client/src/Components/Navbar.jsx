import { Link } from 'react-router-dom';
import React from 'react';

const Navbar = () => {
    return (
        <div className='flex flex-row justify-around items-center bg-black text-[#989999] border-b-[1px] border-[#4e4e4e70] py-4 md:text-lg'>
            {/* <div className='flex justify-between px-3 '> */}
            {/* // <Link to='/' className='p-2 font-semibold text-xl'></Link> */}
            {/* {user && user.isLoggedIn ? ( */}
            {/* <div className='flex justify-center items-center gap-3'> */}
            <div className='flex gap-5'>
                <Link to='/dashboard' className='hover:text-white font-bold'>
                    Dashboard
                </Link>
                <Link to='/readytopay' className='hover:text-white font-bold'>
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
            <div className='flex gap-3'>
                <Link to='/register' className='hover:text-white font-bold'>
                    Register
                </Link>
                <Link to='/login' className='hover:text-white font-bold'>
                    Login
                </Link>
            </div>
            {/* </div> */}
        </div>
    );
};

export default Navbar;
