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
      // Login the user
      const loginResponse = await dispatch(loginUser(formData)).unwrap();

      if (loginResponse && loginResponse.role) {
        // Get the role from the login response
        const userRole = loginResponse.role;

        // console.log("User role for navigation:", userRole);

        // Navigate based on role
        if (userRole === 'STUDENT') {
          navigate('/student-dashboard');
          Toast().fire({
            icon: "success",
            title: "Login Successfull!",
          });
        } else if (userRole === 'TEACHER') {
          navigate('/teacher-dashboard');
          Toast().fire({
            icon: "success",
            title: "Login Successfull!",
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
    } catch (error) {
      console.error('Login failed:', error);
      Toast().fire({
        icon: "error",
        title: "Login failed",
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
      <Navbar />
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
          {error && <p className="text-red-500">{error}</p>} {/* Display error */}
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
      </div>
    </>
  );
};

export default Login;
