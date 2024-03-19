import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { UserContext } from '../../context/userContext';

const Dashboard = () => {
    const { userId, setUserId, userData, setUserData } =
        useContext(UserContext);
    let [name, setName] = useState('');
    let [refresh, setRefresh] = useState(false);
    let [dueAmount, setDueAmount] = useState('Calculating...');
    let [paidAmount, setPaidAmount] = useState('Calculating...');
    let [amount, setAmount] = useState(0);
    const [invoices, setInvoices] = useState(null);

    useEffect(() => {
        const getData = async () => {
            // console.log(userId);
            await axios
                .get(`http://localhost:9000/i/invoices/${userId}`)
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
        };
        getData();
    }, [refresh]);

    const handleAddInvoice = async () => {
        try {
            // console.log('data1');
            await axios.post('http://localhost:9000/i/new', {
                name,
                amount,
                userId,
            });
            setRefresh(!refresh);
            // console.log('data2');
        } catch (error) {
            console.log(error);
            toast.error(error);
        }
    };

    const handlePayInvoice = async (invoice) => {
        try {
            // console.log('E: ' + JSON.stringify(invoice));
            toast('Processing Payment...');
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
                    } else {
                        toast('Payment Failed');
                    }
                    setRefresh(!refresh);
                })
                .catch((err) => {
                    console.log(err);
                });
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='flex flex-col justify-center items-center gap-3 bg-black text-white font-[Manrope] min-h-screen max-h-screen'>
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

            <div className='grid grid-flow-row grid-cols-3 gap-3'>
                <div className='border p-4 rounded-xl'>
                    <span>Total Due Amount:</span>
                    <br />
                    <span className='text-xl font-medium'>₹ {dueAmount}</span>
                </div>
                <div className='border p-4 rounded-xl'>
                    <span>Total Amount Paid:</span>
                    <br />
                    <span className='text-xl font-medium'>₹ {paidAmount}</span>
                </div>
                {/* <div className=''>Hello2</div> */}
                {/* <div className=''>Hello3</div> */}
            </div>
        </div>
    );
};

export default Dashboard;
