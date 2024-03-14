import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { UserContextProvider } from '../context/userContext';
import Navbar from './Components/Navbar';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
    return (
        <UserContextProvider>
            <BrowserRouter>
                <Navbar />
                {/* <h1 className='text-3xl font-bold underline'>Hello world!</h1> */}
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/dashboard' element={<Dashboard />} />
                </Routes>
            </BrowserRouter>
        </UserContextProvider>
    );
}

export default App;
