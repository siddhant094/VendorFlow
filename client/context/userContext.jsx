// import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [userId, setUserId] = useState(null);
    const [userData, setUserData] = useState(null);
    const [token, setToken] = useState(false);
    const [timeoutDate, setTimeoutDate] = useState();
    // const [userId, setUserId] = useState(false);

    // useEffect(() => {
    //     const test = async () => {
    //         if (!user) {
    //             // await axios.get('/profile').then(({ data }) => {
    //             //     setUser(data);
    //             // });
    //         }
    //     };
    //     test();
    // }, []);

    return (
        <UserContext.Provider
            value={{
                userId,
                setUserId,
                userData,
                setUserData,
                token,
                setToken,
                timeoutDate,
                setTimeoutDate,
            }}
        >
            {children}
        </UserContext.Provider>
    );
}
