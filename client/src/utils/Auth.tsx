import {useDispatch } from 'react-redux';
import { setUserDet, clearUserDet } from '../redux/slice/userSlice';

const baseurl = import.meta.env.VITE_BASE_URL;

// eslint-disable-next-line react-hooks/rules-of-hooks

// Function to fetch and set the current user
export const setUser = async () => {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const dispatch = useDispatch();
    if (!token) {
        console.error('No token found');
        return;
    }

    try {
        const response = await fetch(`${baseurl}/api/user/current`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Include token in Authorization header
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        dispatch(setUserDet({ name: data.name, _id: data._id, email: data.email }));
        console.log('User Found:', data);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error fetching user:', error.message);
        } else {
            console.error('Error fetching user:', error);
        }
    }
};

// Function to log out the user
export const signout = async () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const dispatch = useDispatch();
    const token = localStorage.getItem('token'); // Retrieve token from localStorage

    if (!token) {
        console.error('No token found');
        return;
    }

    try {
        const response = await fetch(`${baseurl}/api/user/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // Include token in Authorization header
            },
        });

        if (!response.ok) {
            throw new Error('Failed to log out');
        }

        localStorage.removeItem('token'); // Clear the token from localStorage
        dispatch(clearUserDet()); // Clear user state in Redux
        console.log('Logged out successfully');
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error logging out:', error.message);
        } else {
            console.error('Error logging out:', error);
        }
    }
};
