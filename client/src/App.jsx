import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import {
    // BrowserRouter as Router,
    // Route, -> Navigate
    Navigate,
    // Redirect,
    // Switch, -> Routes
} from 'react-router-dom';
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
// import { useAuth } from './hooks/auth-hook';
import { AuthContext } from '../context/authContext';
import { useAuth } from './hooks/auth-hook';

function App() {
    const { token, login, logout, userId } = useAuth();
    let routes;
    if (token) {
        console.log('token is present');
        routes = (
            <Routes>
                {/* <Route path='/' element={<Home />} /> */}
                {/* <Route path='/register' element={<Register />} /> */}
                {/* <Route path='/login' element={<Login />} /> */}
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/readytopay' element={<ReadyToPay />} />
                <Route path='/paid' element={<CompletedPayments />} />
                <Route path='/history' element={<TransactionHistory />} />
                <Route path='/audit' element={<AuditTrails />} />
                <Route path='*' element={<Navigate to='/dashboard' />} />
            </Routes>
        );
    } else {
        console.log('token is not present');
        routes = (
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/register' element={<Register />} />
                <Route path='/login' element={<Login />} />
                <Route path='*' element={<Navigate to='/' />} />
            </Routes>
        );
    }

    return (
        <div className='bg-black min-h-screen font-[Manrope] text-white'>
            <AuthContext.Provider
                value={{
                    isLoggedIn: !!token,
                    token: token,
                    userId: userId,
                    login: login,
                    logout: logout,
                }}
            >
                <BrowserRouter>
                    <Navbar />
                    {/* <h1 className='text-3xl font-bold underline'>Hello world!</h1> */}
                    {/* <Routes>
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
                    </Routes> */}
                    {routes}
                    <Toaster />
                </BrowserRouter>
            </AuthContext.Provider>
        </div>
    );
}

export default App;
