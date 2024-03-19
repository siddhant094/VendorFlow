import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
// import { UserContext } from '../../context/userContext';
import { AuthContext } from '../../context/authContext';

const Dashboard = () => {
    const auth = useContext(AuthContext);
    let [name, setName] = useState('');
    let [refresh, setRefresh] = useState(false);
    let [dueAmount, setDueAmount] = useState('Calculating...');
    let [paidAmount, setPaidAmount] = useState('Calculating...');
    let [amount, setAmount] = useState(0);
    const [userName, setUserName] = useState('');
    const [invoices, setInvoices] = useState(null);

    // useEffect(() => {
    //     // get from llocal storage and check if its valid value
    //     // if valid call login
    // }, []);

    useEffect(() => {
        const getData = async () => {
            console.log('auth.userId ' + auth.userId);
            await axios
                .get(
                    `${import.meta.env.VITE_API_URL}/i/invoices/${auth.userId}`
                )
                .then((invoices) => {
                    let filteredInvoices = invoices.data.filter(
                        (item) =>
                            item.status == 'pending' || item.status == 'failed'
                    );
                    let paidInvoices = invoices.data.filter(
                        (item) => item.status == 'success'
                    );
                    let count2 = 0;
                    paidInvoices.map((item) => {
                        count2 += item.amount;
                    });
                    let count = 0;
                    filteredInvoices.map((item) => {
                        count += item.amount;
                    });
                    setPaidAmount(count2.toLocaleString('en-IN'));
                    setDueAmount(count.toLocaleString('en-IN'));
                    setInvoices(filteredInvoices);
                    // console.log(filteredInvoices);
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

    const handleAddInvoice = async () => {
        if (!name || name == '') {
            toast('Name field is Required');
            return;
        }
        if (!amount || amount == 0) {
            toast('Amount field is Required');
            return;
        }
        try {
            // console.log('data1');
            await axios.post(`${import.meta.env.VITE_API_URL}/i/new`, {
                name,
                amount,
                userId: auth.userId,
            });
            setRefresh(!refresh);
            toast('Invoice Added Successfully');
            setName('');
            setAmount(0);
            // console.log('data2');
        } catch (error) {
            console.log(error);
            toast.error(error);
        }
    };

    // const handlePayInvoice = async (invoice) => {
    //     try {
    //         // console.log('E: ' + JSON.stringify(invoice));
    //         toast('import.metaing Payment...');
    //         const data = {
    //             vendor_name: invoice.name,
    //             vendor_id: invoice._id,
    //             amount: invoice.amount,
    //         };
    //         await axios
    //             .post('http://localhost:9000/i/pay', data)
    //             .then((res) => {
    //                 // console.log('sent data: ' + JSON.stringify(data));
    //                 // console.log(res.data);
    //                 if (res.data.status == 'success') {
    //                     toast('Payment Successful');
    //                 } else {
    //                     toast('Payment Failed');
    //                 }
    //                 setRefresh(!refresh);
    //             })
    //             .catch((err) => {
    //                 console.log(err);
    //             });
    //     } catch (err) {
    //         console.log(err);
    //     }
    // };

    return (
        <div className='w-screen pt-20'>
            <div className='flex flex-col justify-center items-center gap-3 bg-black text-white font-[Manrope]'>
                <div className='w-3/4 text-3xl font-bold my-3 text-[#989999]'>
                    Welcome <span className='text-white'>{userName}</span>!
                </div>
                <div className='border-[1px] rounded-lg p-4 border-[#4e4e4e70] w-3/4'>
                    <div className='text-white text-2xl font-semibold my-6'>
                        Add Pending Invoices
                    </div>
                    <div>
                        <div className='flex flex-col'>
                            <input
                                type='text'
                                name='name'
                                placeholder='Enter Name of Vendor'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className=' bg-zinc-900 hover:bg-zinc-800 text-white px-3 py-3 rounded-md mb-2 mt-4 md:mr-4 grow focus:outline-none'
                            />
                            <input
                                type='number'
                                name='email'
                                placeholder='Enter Amount'
                                required
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className='bg-zinc-900 hover:bg-zinc-800 text-white px-3 py-3 rounded-md mb-2 mt-4 md:mr-4 grow focus:outline-none'
                            />
                        </div>
                        <button
                            onClick={handleAddInvoice}
                            className='mt-2 flex items-center bg-white hover:bg-gray-300 text-black px-3 py-1.5 rounded-md cursor-pointer max-w-fit mb-4 md:mr-4 font-bold'
                        >
                            ADD INVOICE
                        </button>
                    </div>
                </div>

                <div className='grid grid-flow-row grid-cols-2 gap-3 w-3/4 mt-4'>
                    <div className='p-4 rounded-xl bg-[#1c1c1c]'>
                        <span className='text-[#989999]'>
                            Total Due Amount:
                        </span>
                        <br />
                        <span className='text-xl font-medium'>
                            ₹ {dueAmount}
                        </span>
                    </div>
                    <div className='p-4 rounded-xl bg-[#1c1c1c]'>
                        <span className='text-[#989999]'>
                            Total Amount Paid:
                        </span>
                        <br />
                        <span className='text-xl font-medium'>
                            ₹ {paidAmount}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
