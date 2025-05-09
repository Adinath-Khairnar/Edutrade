/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Verify = () => {
  const { token } = useParams();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/auth/verify/${token}`);
        const data = await response.text();
        alert(data); // Show success message
      } catch (error) {
        console.error('Error verifying email:', error);
        alert('Email verification failed');
      }
    };

    if (token) {
      verifyEmail();
    }
  }, [token]);

  return (
    <div className="flex items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">Email Verified Please Login </h1>
    </div>
  );
};

export default Verify;