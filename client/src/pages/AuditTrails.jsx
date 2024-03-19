import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
// import { UserContext } from '../../context/userContext';
import { AuthContext } from '../../context/authContext';

const AuditTrails = () => {
    // const { userId, setUserId, userId, setUserData } =
    //     useContext(UserContext);
    const [userName, setUserName] = useState('');
    const auth = useContext(AuthContext);
    const [invoices, setInvoices] = useState(null);
    let [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const getData = async () => {
            await axios
                .get(
                    `${import.meta.env.VITE_API_URL}/i/invoices/${auth.userId}`
                )
                .then((res) => {
                    let filteredInvoices = res.data;
                    setInvoices(filteredInvoices);
                })
                .catch((err) => console.log(err));

            await axios
                .post(`${import.meta.env.VITE_API_URL}/u/profile`, {
                    id: auth.userId,
                })
                .then((res) => {
                    console.log('res ' + JSON.stringify(res.data));
                    console.log(res.data);
                    setUserName(res.data.name);
                })
                .catch((err) => console.log(err));
        };
        getData();
    }, [refresh]);

    const getDate = (timestamp) => {
        let date = new Date(timestamp);

        // Extracting components
        let day = date.getUTCDate();
        let month = date.getUTCMonth() + 1; // Adding 1 because months are zero-indexed
        let year = date.getUTCFullYear();
        let hours = date.getUTCHours();
        let minutes = date.getUTCMinutes();
        let seconds = date.getUTCSeconds();

        // Formatting into dd/mm/yyyy hh:mm:ss format
        let normalDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
        return normalDate;
    };

    return (
        <div className='flex flex-col justify-center items-center gap-3'>
            <h1 className='text-3xl font-semibold mt-5'>Audit Trails</h1>
            {invoices == null ||
                (invoices.length == 0 && <div>No audit trail</div>)}
            <div className='flex flex-col gap-4 items-center justify-center w-full mt-3 mb-6'>
                {invoices &&
                    invoices.map((invoice, index) => {
                        return (
                            <div className='bg-[#1c1c1c] rounded-md w-3/4'>
                                <div
                                    className='w-full items-center px-3 py-2 gap-2 font-medium grid grid-flow-row grid-cols-9'
                                    key={index}
                                >
                                    <p className='col-span-2 uppercase'>
                                        <span className='text-[#989999]'>
                                            Invoice ID: <br />
                                        </span>{' '}
                                        {invoice.shortId
                                            ? invoice.shortId
                                            : invoice._id}
                                    </p>
                                    <p>
                                        <span className='text-[#989999] col-span-2'>
                                            Vendor Name: <br />
                                        </span>{' '}
                                        {invoice.name}
                                    </p>
                                    <p
                                        className={`shrink justify-self-center items-center flex ${
                                            invoice.status == 'success'
                                                ? 'bg-green-500'
                                                : invoice.status == 'pending'
                                                ? 'bg-amber-300'
                                                : 'bg-red-400'
                                        }  text-black uppercase text-sm px-1 py-1 rounded-md cursor-pointer max-w-fit font-bold`}
                                    >
                                        {invoice.status}
                                    </p>
                                    <p>
                                        <span className='text-[#989999]'>
                                            {' '}
                                            Amount: <br />
                                        </span>{' '}
                                        ₹{' '}
                                        {invoice.amount.toLocaleString(
                                            'en-IN'
                                        )}{' '}
                                        /-
                                    </p>
                                    <p className='col-span-2'>
                                        <span className='text-[#989999]'>
                                            Invoice Creation Date/Time: <br />
                                        </span>
                                        {getDate(
                                            invoice.visitHistory[0].timestamp
                                        )}
                                    </p>
                                    <p className='col-span-2'>
                                        <span className='text-[#989999]'>
                                            Created By: <br />
                                        </span>{' '}
                                        {userName}
                                    </p>
                                </div>
                                <div className='px-3 py-2'>
                                    {invoice.visitHistory.map((item, index) => {
                                        let length =
                                            invoice.visitHistory.length;
                                        return (
                                            <div>
                                                <div className='text-white'>
                                                    <div className='flex gap-x-3'>
                                                        <div className='relative last:after:hidden after:absolute after:top-7 after:bottom-0 after:start-3.5 after:w-px after:-translate-x-[0.5px] after:bg-gray-200 dark:after:bg-gray-700'>
                                                            <div className='relative z-10 size-7 flex justify-center items-center'>
                                                                <div className='size-2 rounded-full bg-gray-400 dark:bg-gray-600'></div>
                                                            </div>
                                                        </div>
                                                        <div className='grow pt-0.5'>
                                                            <h3 className='flex gap-x-1.5 font-semibold'>
                                                                {index == 0
                                                                    ? 'Invoice Created Successfully'
                                                                    : index ==
                                                                          invoice
                                                                              .visitHistory
                                                                              .length -
                                                                              1 &&
                                                                      invoice.status ==
                                                                          'success'
                                                                    ? 'Payment Successful'
                                                                    : 'Payment Failed'}
                                                            </h3>
                                                            <p className='mt-1 text-sm'>
                                                                {item.code
                                                                    ? item.code ==
                                                                      'ER_001'
                                                                        ? 'ERR_01 Retry after 30 Seconds'
                                                                        : 'ERR_02 Permanent error, Initiate new Payment'
                                                                    : getDate(
                                                                          item.timestamp
                                                                      )}
                                                            </p>
                                                            <button
                                                                type='button'
                                                                className='mt-1 -ms-1 p-1 inline-flex items-center gap-x-2 text-xs rounded-lg border border-transparent text-gray-500 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                                                            >
                                                                <img
                                                                    className='flex-shrink-0 size-4 rounded-full'
                                                                    // src='https://images.unsplash.com/photo-1659482633369-9fe69af50bfb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8auto=format&fit=facearea&facepad=3&w=320&h=320&q=80'
                                                                    src='avatar.jpg'
                                                                    alt='Image Description'
                                                                />
                                                                {userName}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

{
    /* <div className='bg-gray-200 w-3/4 p-3 rounded-md'>
   TOP: 
        InvoiceID, 
        Created Time, 
        Status, 
        Created By
   LIST:
        Time of Action,
        Action Details (payment initiated, retry attempt, payment successful/failed),
        Error message (if applicable),
        Initiated by
</div>; */
}
export default AuditTrails;
