import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const registerUser = async (e) => {
        e.preventDefault();
        const { name, email, password } = data;
        try {
            const { data } = await axios.post(
                `${import.meta.env.VITE_API_URL}/u/register`,
                {
                    name,
                    email,
                    password,
                }
            );
            console.log('DATA ' + data);
            if (data.error) toast.error(data.error);
            else {
                setData({});
                toast.success('Login Successful welcome');
                navigate('/login');
            }
        } catch (err) {
            console.log(err);
            toast.error(err);
        }
    };

    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
    });

    return (
        <div className='flex justify-center items-center h-screen'>
            <form
                action=''
                onSubmit={registerUser}
                className='flex flex-col md:w-1/3 gap-2'
            >
                <label htmlFor=''>Name</label>
                <input
                    type='text'
                    placeholder='Enter Name...'
                    className='border-none bg-zinc-900 hover:bg-zinc-800 text-white px-3 py-3 rounded-md mb-2 mt-4 focus:outline-none'
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                    required
                    value={data.name}
                />
                <label htmlFor=''>Email</label>
                <input
                    required
                    type='email'
                    placeholder='Enter Email...'
                    className='bg-zinc-900 hover:bg-zinc-800 text-white px-3 py-3 rounded-md mb-2 mt-4 grow focus:outline-none'
                    onChange={(e) =>
                        setData({ ...data, email: e.target.value })
                    }
                    value={data.email}
                />
                <label htmlFor=''>Password</label>
                <input
                    required
                    type='password'
                    placeholder='Enter Password...'
                    className='bg-zinc-900 hover:bg-zinc-800 text-white px-3 py-3 rounded-md mb-2 mt-4 grow focus:outline-none'
                    onChange={(e) =>
                        setData({ ...data, password: e.target.value })
                    }
                    value={data.password}
                />
                <button
                    type='submit'
                    className='mt-2 flex items-center bg-white hover:bg-gray-300 text-black px-3 py-1.5 rounded-md cursor-pointer max-w-fit mb-4 md:mr-4 font-bold'
                >
                    REGISTER
                </button>
            </form>
        </div>
    );
};

export default Register;
