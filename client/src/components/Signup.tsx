// src/SignUp.js
import{ useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [name, setname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const baseurl = import.meta.env.VITE_BASE_URL;
  console.log(baseurl);
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleSignUp = async (e : any) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    console.log(email);
    try {
      const response = await fetch(`${baseurl}/api/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        throw new Error('Sign Up failed');
      }

      const data = await response.json();
      setSuccess('Sign Up successful!'); // Show success message
      console.log('Sign Up successful:', data);
      navigate('/');
    } catch (error : any) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen w-full bg-gray-800">
      
      <div className="bg-gray-900 p-8 rounded-tl-3xl rounded-lg shadow-lg w-[35%] h-[70%]">
        <h2 className="text-4xl font-bold text-center text-white mb-[11%]">Sign Up</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-center mb-4">{success}</p>}
        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-1" htmlFor="fullname">Full Name</label>
            <input
              type="text"
              id="fullname"
              className="w-full p-2 rounded border border-gray-600 bg-gray-800 text-white"
              value={name}
              onChange={(e) => setname(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-1" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="w-full p-2 rounded border border-gray-600 bg-gray-800 text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value.toLowerCase())}
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
          <div className="mb-4">
            <label className="block text-gray-300 mb-1" htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full p-2 rounded border border-gray-600 bg-gray-800 text-white"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-blue-600 rounded hover:bg-blue-500 transition"
          >
            Sign Up
          </button>
          
        </form>
      </div>
      <div className='w-[50%] bg-slate-900 h-[70%] rounded-br-3xl'>
        <img src="" alt="" />
      </div>
    </div>
  );
};

export default SignUp;
