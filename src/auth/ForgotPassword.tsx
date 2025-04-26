import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = import.meta.env.VITE_API_URL;

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  /* const [error, setError] = useState(''); */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    /* setError(''); */

    try {
      const res = await axios.post<{ message: string }>(`${API_URL}/auth/forgot-password`, { email });
      setMessage(res.data.message);
    } catch {
      /* const errorMessage =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Invalid email address";
      setError(errorMessage); */
      toast.error("Invalid email address")
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Send Reset Link
          </button>
        </form>
        {message && <p className="text-green-600 mt-4">{message}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
