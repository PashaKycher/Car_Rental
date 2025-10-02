import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-hot-toast'
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const navigate = useNavigate();
    const currency = import.meta.env.VITE_CURRENCY
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    const [showLogin, setShowLogin] = useState(false)
    const [pickupDate, setPickupDate] = useState('');
    const [returnDate, setReturnDate] = useState('');
    const [cars, setCars] = useState([]);

    // fetch user data
    const fetchUser = async () => {
        try {
            const { data } = await axios.get('api/user/data');
            if (data.success) {
                setUser(data.user);
                setIsOwner(data.user.role === 'owner');
            } else {
                navigate('/');
            }
        } catch (error) {
            toast.error(error.message);
            navigate('/');
        }
    };

    // logout user
    const logoutUser = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setIsOwner(false);
        navigate('/');
        axios.defaults.headers.common['authorization'] = '';
        toast.success('Logout successful');
    }

    // fetch cars
    const fetchCars = async () => {
        try {
            const { data } = await axios.get('api/user/cars');
            if (data.success) {
                setCars(data.cars);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    // retrieve tokin from local storage
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setToken(token);
        } else {
            navigate('/');
        }
    }, []);

    // fetch user data if token is available
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['authorization'] = `${token}`;
            fetchUser();
            fetchCars();
        }
    }, [token]);

    const value = {
        navigate, currency, axios, user, setUser, token, setToken, isOwner, setIsOwner, fetchUser, fetchCars,
        logoutUser, showLogin, setShowLogin, pickupDate, setPickupDate, returnDate, setReturnDate, cars, setCars
    };

    return (<AppContext.Provider value={value}>{children}</AppContext.Provider>);
};

export const useAppContext = () => {

    return useContext(AppContext);
};