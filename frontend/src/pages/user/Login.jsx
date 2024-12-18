import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { fetchCurrentUser, loginUser } from '../../store/auth-slice/authSlice';
import Toast from '../../utils/Toast';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, error, isAuthenticated, user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginResponse = await dispatch(loginUser(formData)).unwrap();

      if (loginResponse && loginResponse.user.role) {
        const userRole = loginResponse.user.role;

        if (userRole === 'STUDENT') {
          navigate('/student-dashboard');
          Toast().fire({
            icon: "success",
            title: "Login Successful!",
          });
        } else if (userRole === 'TEACHER') {
          navigate('/teacher-dashboard');
          Toast().fire({
            icon: "success",
            title: "Login Successful!",
          });
        } else {
          Toast().fire({
            icon: "warning",
            title: "Invalid Role!",
          });
        }
      } else {
        throw new Error("Login response did not contain valid data");
      }
    } catch (err) {
      console.error('Login failed:', err);
      Toast().fire({
        icon: "error",
        title: err?.detail || "Login failed",
      });
    }
  };





  // You can keep this for handling automatic navigation on page load if the user is already authenticated
  useEffect(() => {
    if (isAuthenticated && user) {
      if (user.role === 'STUDENT') {
        navigate('/student-dashboard');
      } else if (user.role === 'TEACHER') {
        navigate('/teacher-dashboard');
      }
    }
  }, [isAuthenticated, user, navigate]);

  return (
    <>
      <div className="max-w-sm bg-white mx-auto p-2 mt-6 border-2 rounded-lg">
        <h2 className="text-2xl font-semibold pt-3 text-center">Please login</h2>
        <form className="space-y-5 max-w-sm mx-auto pt-8" onSubmit={handleSubmit}>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-5 py-3 border-2 rounded-lg"
            placeholder="Email"
            required
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-5 py-3 border-2 rounded-lg"
            placeholder="Password"
            required
          />
          {error && <p className="text-red-500">{typeof error === 'object' ? error.detail || JSON.stringify(error) : error}</p>} {/* Display error */}
          <button
            type="submit"
            className="w-full mt-5 bg-indigo-500 text-white font-medium py-3 rounded-md"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="my-5 text-center">
          Don't have an account?
          <Link to="/register" className="text-red-700 italic">
            {' '}
            Register{' '}
          </Link>{' '}
          here.
        </p>
        <p className="my-5 text-center">
          <Link to="/forget-password" className="text-red-700 italic">
            {' '}
            Forget Password?{' '}
          </Link>{' '}

        </p>
      </div>
    </>
  );
};

export default Login;
