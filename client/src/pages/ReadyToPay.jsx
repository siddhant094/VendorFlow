import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { UserContext } from '../../context/userContext';

const ReadyToPay = () => {
    const { userId, setUserId, userData, setUserData } =
        useContext(UserContext);
    let [refresh, setRefresh] = useState(false);
    const [invoices, setInvoices] = useState(null);

    useEffect(() => {
        const getData = async () => {
            // console.log(userId);
            await axios
                .get(`http://localhost:9000/i/invoices/${userId}`)
                .then((res) => {
                    let filteredInvoices = res.data.filter(
                        (item) => item.status != 'success'
                    );
                    const newArr = filteredInvoices.map((v) => ({
                        disabled: false,
                        text: 'PAY',
                        ...v,
                    }));

                    setInvoices(newArr);
                    // console.log('NEW ARR: ' + JSON.stringify(newArr));
                })
                .catch((err) => console.log(err));
        };
        getData();
    }, [refresh]);

    // console.log('invoices: ', invoices);

    const handlePayInvoice = async (invoice, indexOfInvoiceToUpdate) => {
        try {
            // console.log('E: ' + JSON.stringify(invoice));
            // toast('Processing Payment...');
            const data = {
                vendor_name: invoice.name,
                vendor_id: invoice._id,
                amount: invoice.amount,
            };
            await axios
                .post('http://localhost:9000/i/pay', data)
                .then((res) => {
                    // console.log('sent data: ' + JSON.stringify(data));
                    // console.log(res.data);
                    if (res.data.status == 'success') {
                        toast('Payment Successful');
                        setRefresh(!refresh);
                    } else if (res.data.error == 'ER_001') {
                        toast('Payment Failed.  Retry after 30 Seconds');
                        setInvoices(function (prev) {
                            console.log('when setting true, ', prev);
                            let newArr = prev.map((item, index) =>
                                index === indexOfInvoiceToUpdate
                                    ? {
                                          ...item,
                                          disabled: true,
                                          text: 'Wait 30s',
                                      }
                                    : item
                            );
                            return newArr;
                        });
                        // toast('Button Disabled');
                        // console.log(invoices);

                        setTimeout(function () {
                            toast('Button Enabled');
                            const updateInvoice = () => {
                                setInvoices((prev) =>
                                    prev.map((item, index) =>
                                        index === indexOfInvoiceToUpdate
                                            ? {
                                                  ...item,
                                                  disabled: false,
                                                  text: 'RETRY PAYMENT',
                                              }
                                            : item
                                    )
                                );
                            };
                            updateInvoice();
                        }, 30000);
                    } else {
                        toast('Payment failed with ERR_02.');
                        console.log(res.data);
                    }
                    // setRefresh(!refresh);
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        // <div>
        <div className='flex flex-col justify-center items-center gap-3'>
            <h1 className='text-3xl font-semibold mt-5'>
                Ready to Pay Invoices are:{' '}
            </h1>
            <div className='flex flex-col gap-4 items-center justify-center w-3/4 mt-3'>
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
                                <p
                                    className={`justify-self-center items-center flex ${
                                        invoice.status == 'pending'
                                            ? 'bg-amber-300'
                                            : 'bg-red-400'
                                    } text-black uppercase text-sm px-1 py-1 rounded-md cursor-pointer max-w-fit font-bold`}
                                >
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
                                <button
                                    disabled={invoice.disabled}
                                    className={`justify-self-end flex items-center ${
                                        invoice.disabled
                                            ? 'bg-gray-400 cursor-wait'
                                            : 'bg-green-500 hover:bg-gray-300'
                                    }   text-black px-3 py-1.5 rounded-md cursor-pointer max-w-fit font-bold`}
                                    onClick={() =>
                                        handlePayInvoice(invoice, index)
                                    }
                                >
                                    {invoice.text}
                                </button>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default ReadyToPay;
