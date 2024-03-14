import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { UserContext } from '../../context/userContext';


const Dashboard = () => {
    const { userId, setUserId, userData, setUserData } = useContext(UserContext);
    let [name, setName] = useState('');
    let [amount, setAmount] = useState(0);
    const [invoices, setInvoices] = useState();

    useEffect(() => {

    }, [])



    const handleAddInvoice = async () => {
        try {
            console.log("data1");
            await axios.post('http://localhost:9000/i/new', {
                name,
                amount,
                userId,
            });
            console.log("data2");
        } catch (error) {
            console.log(error);
            toast.error(error)
        }
    }

    return <div className='flex flex-col justify-center items-center gap-3'>
        <h1 className='text-2xl font-semibold'>Add New Pending Invoice</h1>
        <input type="text" placeholder='Enter Name of Company' className='border px-2 py-1 rounded-md' value={name} onChange={(e) => setName(e.target.value)} />
        <input type="number" placeholder='Enter Amount to be paid' className='border px-2 py-1 rounded-md' value={amount} onChange={(e) => setAmount(e.target.value)} />
        {/* <input type="text" placeholder='Enter Amount to be Paid' /> */}
        <button className='px-3 py-1 bg-green-500 text-white rounded-lg' onClick={handleAddInvoice}>ADD</button>
        <h1 className='text-2xl font-semibold'>Pending Invoices are: </h1>
        {
            invoices.map((invoice) => {
                console.log(invoice);
            })
        }
    </div>;
};

export default Dashboard;
