/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../store/auth-slice/authSlice"; // Adjust the path to your slice
import Navbar from "../../components/Navbar";
import Toast from '../../utils/Toast';

const Register = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth); // Adjust the slice name if needed

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    phone_number: "",
    role: "",
    password: "",
    password2: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.password2) {
      Toast().fire({
        icon: "success",
        title: "Passwords do not match!",
      })

      return;
    }

    const {
      first_name,
      last_name,
      username,
      email,
      phone_number,
      role,
      password,
      password2,
    } = formData;

    // Dispatch the registerUser action
    dispatch(
      registerUser({
        first_name,
        last_name,
        username,
        email,
        phone_number,
        role,
        password,
        password2,
      })
    )
      .unwrap()
      .then(() => {
        Toast().fire({
          icon: "success",
          title: "Registration successful!",
        })

        // Reset form or navigate to login
        setFormData({
          first_name: "",
          last_name: "",
          username: "",
          email: "",
          phone_number: "",
          role: "",
          password: "",
          password2: "",
        });
      })
      .catch((err) => {
        console.error("Registration failed:", err);
      });
  };

  return (
    <>
      <Navbar />
      <div className="max-w-sm bg-white mx-auto p-3 mt-4 border-2 rounded">
        <h2 className="text-2xl font-semibold pt-3 text-center">
          Please Register
        </h2>
        <form
          className="space-y-5 max-w-sm mx-auto pt-5"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className="w-full px-5 py-3 border-2 rounded"
            placeholder="First Name"
            required
          />
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className="w-full px-5 py-3 border-2 rounded"
            placeholder="Last Name"
            required
          />
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-5 py-3 border-2 rounded"
            placeholder="Username"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-5 py-3 border-2 rounded"
            placeholder="Email"
            required
          />
          <input
            type="text"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            className="w-full px-5 py-3 border-2 rounded"
            placeholder="Phone Number"
            required
          />
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-5 py-3 border-2 rounded"
            required
          >
            <option value="" disabled>
              Select your role
            </option>
            <option value="STUDENT">Student</option>
            <option value="TEACHER">Teacher</option>
          </select>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-5 py-3 border-2 rounded"
            placeholder="Password"
            required
          />
          <input
            type="password"
            name="password2"
            value={formData.password2}
            onChange={handleChange}
            className="w-full px-5 py-3 border-2 rounded"
            placeholder="Confirm Password"
            required
          />

          {error && <p className="text-red-500">{error}</p>} {/* Display error */}

          <button
            type="submit"
            className="w-full mt-5 bg-indigo-500 text-white font-medium py-3 rounded-md"
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="my-5 text-center">
          Already have an account? Please
          <Link to="/login" className="text-red-700 italic">
            {" "}
            Login
          </Link>
        </p>
      </div>
    </>
  );
};

export default Register;
