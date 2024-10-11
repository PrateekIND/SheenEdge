// src/Login.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../redux/Slice/login.js';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook to programmatically navigate
  const {loading ,error}=useSelector((state)=>state.user);
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault();
    const user = {email, password}
    console.log(user);
    // Replace with your API URL
    
    const apiUrl = 'http://localhost:5800/api/user/login';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        throw new Error('Login failed'); // Throwing an error if response is not ok
      }

      const data = await response.json();
      console.log('Login successful:', data);
      navigate('/'); // Redirect to the home page
    
    } catch (error) {
      setError(error.message); // Display the error message
    }
    let userCredentials={
      email,password
    }

    dispatch(loginUser(userCredentials)).then((result)=>{
      if(result.payload){
        setEmail('');
        setPassword('');
        navigate('/');
      }
    })
  };



  return (
    <div className="flex items-center justify-center h-screen bg-gray-800 w-full">
      <div className='w-[50%] bg-slate-900 h-[70%] rounded-bl-3xl'>
        <img src="" alt="" />
      </div>
      <div className="bg-gray-900 p-8 rounded-lg flex flex-col justify-center shadow-lg w-[35%] h-[70%] rounded-tr-3xl">
        <h2 className="text-4xl font-bold text-center text-white mb-[15%]">Login</h2>
        
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-1" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="w-full p-2 rounded border border-gray-600 bg-gray-800 text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-1" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-2 rounded border border-gray-600 bg-gray-800 text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 rounded hover:bg-blue-500 transition"
          >
            {loading?'Loading...':'Signin'}
          </button>
          {error&&(
            <div className='alert alert-danger' role='alest'>{error}</div>
          )}
        </form>

        <div className='flex justify-center items-center mt-[4%]'>
        <hr className='bg-gray-800  w-[45%]'/> <p className='mb-[1%] mx-[2%] text-white'>or</p> <hr className='bg-gray-800 w-[45%]'/>
        </div>

        <p className="text-center text-gray-300 mt-4">
          Don't have an account? 
          <Link to="/signup" className="text-blue-500 hover:underline ml-1">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
