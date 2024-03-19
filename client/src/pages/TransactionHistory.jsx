import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { UserContext } from '../../context/userContext';

const TransactionHistory = () => {
    const { userId, setUserId, userData, setUserData } =
        useContext(UserContext);
    const [invoices, setInvoices] = useState(null);
    let [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const getData = async () => {
            await axios
                .get(`http://localhost:9000/i/invoices/${userId}`)
                .then((res) => {
                    // console.log('res.data: ' + res.data);
                    let filteredInvoices = res.data.filter(
                        (item) => item.visitHistory.length > 1
                    );
                    setInvoices(filteredInvoices);
                    // console.log('invoices:: ' + invoices);
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
        <div className='flex flex-col justify-center items-center gap-3 pb-6'>
            <h1 className='text-3xl font-semibold mt-5'>
                Transaction History{' '}
            </h1>
            <div className='flex flex-col gap-4 items-center justify-center w-full mt-3'>
                {invoices &&
                    invoices.map((invoice, index) => {
                        if (
                            invoice &&
                            invoice.visitHistory &&
                            invoice.visitHistory.length > 2
                        ) {
                            console.log('inside 2 ' + JSON.stringify(invoice));
                            return invoice.visitHistory.map((item, index) => {
                                // index == 0 ? null :
                                if (index === 0) {
                                    return null;
                                }
                                return (
                                    <div
                                        className='bg-[#1c1c1c] items-center w-3/4 px-3 py-2  rounded-md gap-2 font-medium grid grid-flow-row grid-cols-9'
                                        key={index}
                                    >
                                        <p className='uppercase'>
                                            <span className='text-[#989999]'>
                                                Invoice ID: <br />
                                            </span>{' '}
                                            {invoice.shortId
                                                ? invoice.shortId
                                                : invoice._id}
                                        </p>
                                        <p className='col-span-2'>
                                            <span className='text-[#989999]'>
                                                Vendor Name: <br />
                                            </span>{' '}
                                            {invoice.name}
                                        </p>
                                        <p
                                            className={`shrink justify-self-center items-center flex ${
                                                invoice.status == 'success' &&
                                                index ==
                                                    invoice.visitHistory
                                                        .length -
                                                        1
                                                    ? 'bg-green-500'
                                                    : 'bg-red-400'
                                            }  text-black uppercase text-sm px-1 py-1 rounded-md cursor-pointer max-w-fit font-bold`}
                                        >
                                            {invoice.status == 'success' &&
                                            index ==
                                                invoice.visitHistory.length - 1
                                                ? 'success'
                                                : 'Failed'}
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
                                                Payment Date/Time: <br />
                                            </span>
                                            {getDate(item.timestamp)}
                                        </p>
                                        {invoice.status == 'success' &&
                                            index ==
                                                invoice.visitHistory.length -
                                                    1 && (
                                                <p className='col-span-2'>
                                                    <span className='text-[#989999]'>
                                                        UTR Number: <br />
                                                    </span>{' '}
                                                    {invoice.utrNumber}
                                                </p>
                                            )}
                                    </div>
                                );
                            });
                        } else {
                            // console.log(invoice);
                            return (
                                <div
                                    className='bg-[#1c1c1c] items-center w-3/4 px-3 py-2  rounded-md gap-2 font-medium grid grid-flow-row grid-cols-9'
                                    key={index}
                                >
                                    <p className='uppercase'>
                                        <span className='text-[#989999]'>
                                            Invoice ID: <br />
                                        </span>{' '}
                                        {invoice.shortId
                                            ? invoice.shortId
                                            : invoice._id}
                                    </p>
                                    <p className='col-span-2'>
                                        <span className='text-[#989999]'>
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
                                            Payment Date/Time: <br />
                                        </span>
                                        {invoice.visitHistory.length <= 1
                                            ? 'Payment not attempted'
                                            : `${getDate(
                                                  invoice.visitHistory[
                                                      invoice.visitHistory
                                                          .length - 1
                                                  ].timestamp
                                              )}`}
                                    </p>
                                    {invoice.status == 'success' && (
                                        <p className='col-span-2'>
                                            <span className='text-[#989999]'>
                                                UTR Number: <br />
                                            </span>{' '}
                                            {invoice.utrNumber}
                                        </p>
                                    )}
                                </div>
                            );
                        }
                    })}
            </div>
        </div>
    );
};

{
    /* <div className='bg-gray-200 w-3/4 p-3 rounded-md'>
    <p>Invoice ID: {invoice._id}</p>
    <p>Vendor Name: {invoice.name}</p>
    <p>Amount: {invoice.amount}</p>
    <p>Payment Date/Time: {invoice.amount}</p>
    <p>Status: {invoice.status}</p>
    {invoice.utrNumber && <p>UTR Number: {invoice.utrNumber}</p>}
</div>; */
}
export default TransactionHistory;
