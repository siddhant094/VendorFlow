import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../context/authContext';

const CompletedPayments = () => {
    const [invoices, setInvoices] = useState(null);
    let [paidAmount, setPaidAmount] = useState('Calculating...');
    const auth = useContext(AuthContext);

    useEffect(() => {
        const getData = async () => {
            // console.log(userId);
            await axios
                .get(
                    `${import.meta.env.VITE_API_URL}/i/invoices/${auth.userId}`
                )
                .then((invoices) => {
                    let filteredInvoices = invoices.data.filter(
                        (item) => item.status == 'success'
                    );
                    let count = 0;
                    filteredInvoices.map((item) => {
                        count += item.amount;
                    });
                    setPaidAmount(count.toLocaleString('en-IN'));
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
            <div className='grid grid-flow-row grid-cols-2 gap-3 w-2/3 mt-4'>
                <div className='p-4 rounded-xl bg-[#1c1c1c] w-full'>
                    <span className='text-[#989999]'>Total Amount Paid:</span>
                    <br />
                    <span className='text-xl font-medium'>₹ {paidAmount}</span>
                </div>
                <div className='p-4 rounded-xl bg-[#1c1c1c] w-full'>
                    <span className='text-[#989999]'>
                        Total Number of Invoices:
                    </span>
                    <br />
                    <span className='text-xl font-medium'>
                        {(invoices && invoices.length) || 0}
                    </span>
                </div>
            </div>
            {invoices == null ||
                (invoices.length == 0 && <div>No invoices paid</div>)}
            <div className='flex flex-col gap-4 items-center justify-center w-2/3 mt-3 mb-8'>
                {invoices &&
                    invoices.map((invoice, index) => {
                        // console.log(invoice);
                        return (
                            <div
                                className='bg-[#1c1c1c] items-center w-full px-3 py-2  rounded-md gap-2 font-medium grid grid-flow-row grid-cols-4'
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
