import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { UserContextProvider } from '../context/userContext';
import toast, { Toaster } from 'react-hot-toast';
import Navbar from './Components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import CompletedPayments from './pages/CompletedPayments';
import TransactionHistory from './pages/TransactionHistory';
import ReadyToPay from './pages/ReadyToPay';
import AuditTrails from './pages/AuditTrails';

function App() {
    return (
        <div className='bg-black min-h-screen font-[Manrope] text-white'>
            <UserContextProvider>
                <BrowserRouter>
                    <Navbar />
                    {/* <h1 className='text-3xl font-bold underline'>Hello world!</h1> */}
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/dashboard' element={<Dashboard />} />
                        <Route path='/readytopay' element={<ReadyToPay />} />
                        <Route path='/paid' element={<CompletedPayments />} />
                        <Route
                            path='/history'
                            element={<TransactionHistory />}
                        />
                        <Route path='/audit' element={<AuditTrails />} />
                    </Routes>
                    <Toaster />
                </BrowserRouter>
            </UserContextProvider>
        </div>
    );
}

export default App;
