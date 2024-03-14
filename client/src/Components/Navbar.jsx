import { Link } from 'react-router-dom';
import React from 'react';

const Navbar = () => {
    return (
        <div className='flex justify-between px-3 bg-slate-100'>
            <Link to='/' className='p-2 font-semibold text-xl'>
            </Link>
            {/* {user && user.isLoggedIn ? ( */}
            <div className='flex justify-center items-center'>
                <Link to='/register' className='p-2'>
                    Register
                </Link>
                <Link to='/login' className='p-2'>
                    Login
                </Link>
            </div>
            {/* ) : (
                <div>
                    <button
                        className='p-2'
                        onClick={() => {
                            setUser({ isLoggedIn: false });
                        }}
                    >
                        Logout
                    </button>
                </div>
            )} */}
        </div>
    );
};

export default Navbar;
