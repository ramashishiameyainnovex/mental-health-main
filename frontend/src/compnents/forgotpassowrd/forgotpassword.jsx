import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
    // State for form inputs
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Handle email submission
    const handleEmailSubmit = async(e) => {
        e.preventDefault();
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }
        setError('');
        try {
           const response = await axios.put('http://localhost:8000/forgotpassword', { email });
            if(response.status==200){
                console.log('OTP sent to:', email);
                setStep(2);
                setError('')
            }else{
                setError('Please enter a valid email!.');
  
            }
            
        } catch (error) {
            setError(error.response?.data?.message || 'Error sending OTP');
        }
    };

    // Handle OTP submission
    const handleOtpSubmit = async(e) => {
        e.preventDefault();
        if (!otp || otp.length !== 6) {
            setError('Please enter a valid 6-digit OTP.');
            return;
        }
        setError('');
        try {
           const response= await axios.patch('http://localhost:8000/forgotpassword', { email, otp });
            if(response.status===200){
                console.log('OTP verified:', otp);
                setStep(3);
                setError('')
            }else{
                setError("Enter Valid otp!")
            }
            
        } catch (error) {
            setError(error.response?.data?.message || 'Invalid OTP');
        }
    };

    // Handle new password submission
    const handleNewPasswordSubmit = async(e) => {
        e.preventDefault();
        if (!newPassword || newPassword.length < 8) {
            setError('Password must be at least 8 characters long.');
            return;
        }
        setError('');
        try {
           const response= await axios.put('http://localhost:8000/updatepassword', { email, newPassword });
           if(response.status===200){
            console.log('Password reset successful for:', email);
            alert('Password reset successful!');
            setEmail('');
            setOtp('');
            setNewPassword('');
            setStep(1);
            setError('')
            navigate('/login');
        }
        } catch (error) {
            setError(error.response?.data?.message || 'Error resetting password');
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white border border-gray-200 rounded-lg shadow-md my-24">
            <h2 className="text-2xl font-bold mb-4 text-center">Forgot Password</h2>
            {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}

            {/* Step 1: Enter Email */}
            {step === 1 && (
                <form onSubmit={handleEmailSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        Send OTP
                    </button>
                </form>
            )}

            {/* Step 2: Enter OTP */}
            {step === 2 && (
                <form onSubmit={handleOtpSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">OTP</label>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter 6-digit OTP"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        Verify OTP
                    </button>
                </form>
            )}

            {/* Step 3: Enter New Password */}
            {step === 3 && (
                <form onSubmit={handleNewPasswordSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">New Password</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter new password"
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        Reset Password
                    </button>
                </form>
            )}
        </div>
    );
}
