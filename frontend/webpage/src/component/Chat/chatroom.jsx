import styles from './styles.module.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from "../Navbar.jsx";
import ChatWindow from './ChatWindow';

const chatroom = () => {
  useEffect(() => {
    validateToken();
  }, []);
  
  const validateToken = async () => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
    };
  
    try {
      const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/validateToken`, requestOptions);
  
      if (!response.ok) {
        // If the server responds with a status code outside of the 200 range
        localStorage.removeItem('token');
        window.location.href = '/login'; // Redirects to the login page
        return null;
      }
      
      return true; // If we reach this point, the token is valid
    } catch (error) {
      console.error(`An error occurred: ${error}`);
      return null;
    }
  };

  return (
    <>
      <NavBar />
      <div className='flex w-screen h-screen'>
      
      <div className="flex w-full bg-purp relative mt-14">
        <div className="w-3/4">
          <ChatWindow />
        </div>
      </div>
      </div>
    </>
  );
};

export default chatroom;