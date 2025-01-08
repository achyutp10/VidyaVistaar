// src/components/GoogleLoginButton.jsx

import React from 'react';
import GoogleButton from 'react-google-button';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuth } from '../store/auth-slice/authSlice';  // Assuming you have an action to set auth data
import Toast from '../utils/Toast';

function GoogleLoginButton() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSuccess = async (codeResponse) => {
    const authorizationCode = codeResponse.code;

    if (!authorizationCode) {
      console.error("Authorization code is missing!");
      Toast().fire({
        icon: "error",
        title: "Authorization code missing.",
      });
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/login-with-google/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: authorizationCode }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Server error");
      }

      const data = await response.json();

      if (data.access_token && data.username && data.role) {
        localStorage.setItem("access_token", data.access_token);
        localStorage.setItem("refresh_token", data.refresh_token);
        // localStorage.setItem("username", data.username);
        // localStorage.setItem("role", data.role);

        // Optionally, dispatch to Redux store
        dispatch(setAuth({
          accessToken: data.access_token,
          refreshToken: data.refresh_token,
          username: data.username,
          role: data.role,
        }));

        // Redirect based on role
        switch (data.role.toUpperCase()) {
          case 'STUDENT':
            navigate('/student-dashboard');
            break;
          case 'TEACHER':
            navigate('/teacher-dashboard');
            break;
          default:
            navigate('/');
            break;
        }

        window.location.reload();
      } else {
        console.error("Invalid response from the server:", data);
        Toast().fire({
          icon: "error",
          title: "Invalid response from the server.",
        });
      }
    } catch (error) {
      console.error("Error exchanging authorization code:", error);
      Toast().fire({
        icon: "error",
        title: error.message || "Error during Google login.",
      });
    }
  };

  const login = useGoogleLogin({
    onSuccess: handleSuccess,
    flow: "auth-code",
    // Optional: You might need to specify additional parameters
    // to ensure you receive the authorization code
    // e.g., accessType: 'offline', prompt: 'consent'
  });

  return (
    <div className='mx-16 mt-2 rounded-full'>
      <GoogleButton className='rounded-lg' onClick={() => login()} label="Sign Up With Google" />
    </div>
  )
}

export default GoogleLoginButton;
