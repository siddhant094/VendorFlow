import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useContext, useState, useEffect, useCallback } from 'react';
// import { UserContext } from '../../context/userContext';
import { AuthContext } from '../../context/authContext';

const Login = () => {
    // const {
    //     userId,
    //     setUserId,
    //     userData,
    //     setUserData,
    //     token,
    //     setToken,
    //     timeoutDate,
    //     setTimeoutDate,
    // } = useContext(UserContext);
    const auth = useContext(AuthContext);

    const navigate = useNavigate();

    const loginUser = async (e) => {
        e.preventDefault();
        const { email, password } = data;
        try {
            const { data } = await axios.post(
                `${import.meta.env.VITE_API_URL}/u/login`,
                {
                    email,
                    password,
                }
            );
            console.log(data);

            if (data.error) {
                toast.error(data.error);
            } else {
                // setUserData(data);
                // setUserId(data.userId);
                auth.login(data.userId, data.token);
                navigate('/dashboard');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const [data, setData] = useState({
        email: '',
        password: '',
    });

    return (
        <div className='flex justify-center items-center h-screen'>
            <form
                action=''
                onSubmit={loginUser}
                className='flex flex-col max-sm:w-10/12 md:w-1/3 gap-2'
            >
                <label htmlFor=''>Email</label>
                <input
                    type='email'
                    placeholder='Enter Email...'
                    required
                    className='border-none bg-zinc-900 hover:bg-zinc-800 text-white px-3 py-3 rounded-md mb-2 mt-4 focus:outline-none'
                    onChange={(e) =>
                        setData({ ...data, email: e.target.value })
                    }
                    value={data.email}
                />
                <label htmlFor=''>Password</label>
                <input
                    type='password'
                    required
                    className='border-none bg-zinc-900 hover:bg-zinc-800 text-white px-3 py-3 rounded-md mb-2 mt-4 focus:outline-none'
                    onChange={(e) =>
                        setData({ ...data, password: e.target.value })
                    }
                    value={data.password}
                    placeholder='Enter Password...'
                />
                <button
                    type='submit'
                    className='mt-2 flex items-center bg-white hover:bg-gray-300 text-black px-6 py-1.5 rounded-md cursor-pointer max-w-fit mb-4 md:mr-4 font-bold'
                >
                    LOGIN
                </button>
            </form>
        </div>
    );
};

export default Login;
