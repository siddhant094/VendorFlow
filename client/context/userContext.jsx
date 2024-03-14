// import axios from 'axios';
import { createContext, useState, useEffect } from 'react';

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
    const [userId, setUserId] = useState(null);
    const [userData, setUserData] = useState(null);

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
        <UserContext.Provider value={{ userId, setUserId, userData, setUserData }}>
            {children}
        </UserContext.Provider>
    );
}
