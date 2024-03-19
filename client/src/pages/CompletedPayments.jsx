import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { UserContext } from '../../context/userContext';

const CompletedPayments = () => {
    const [invoices, setInvoices] = useState(null);
    const { userId, setUserId, userData, setUserData } =
        useContext(UserContext);

    useEffect(() => {
        const getData = async () => {
            // console.log(userId);
            await axios
                .get(`http://localhost:9000/i/invoices/${userId}`)
                .then((invoices) => {
                    let filteredInvoices = invoices.data.filter(
                        (item) => item.status == 'success'
                    );
                    setInvoices(filteredInvoices);
                    console.log(filteredInvoices);
                })
                .catch((err) => console.log(err));
        };
        getData();
    }, []);
    return (
        <div className='flex flex-col justify-center items-center gap-3'>
            {/* <div className='flex justify-start w-full'> */}
            <h1 className='text-3xl font-semibold mt-5'>Paid Invoices are: </h1>
            {/* </div> */}
            <div className='flex flex-col gap-4 items-center justify-center w-3/4 mt-3 mb-8'>
                {invoices &&
                    invoices.map((invoice, index) => {
                        // console.log(invoice);
                        return (
                            <div
                                className='bg-[#1c1c1c] items-center w-3/4 px-3 py-2  rounded-md gap-2 font-medium grid grid-flow-row grid-cols-4'
                                key={index}
                            >
                                <p>
                                    <span className='text-[#989999]'>
                                        Vendor Name: <br />
                                    </span>{' '}
                                    {invoice.name}
                                </p>
                                <p className='justify-self-center items-center flex  bg-green-500 text-black uppercase text-sm px-1 py-1 rounded-md cursor-pointer max-w-fit font-bold'>
                                    {invoice.status}
                                </p>
                                <p>
                                    <span className='text-[#989999]'>
                                        {' '}
                                        Amount:{' '}
                                    </span>{' '}
                                    ₹ {invoice.amount.toLocaleString(
                                        'en-IN'
                                    )}{' '}
                                    /-
                                </p>
                                <p>
                                    <span className='text-[#989999]'>
                                        UTR Number: <br />
                                    </span>{' '}
                                    {invoice.utrNumber}
                                </p>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default CompletedPayments;
