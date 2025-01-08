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
      });

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
          title: "Please activate your account! A activation link is sent to your email",
        });

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
      <div className="max-w-4xl bg-white mx-auto p-3 mt-2 border-2 rounded">
        <h2 className="text-2xl font-semibold text-center">Please Register</h2>
        <form className="pt-3 grid grid-cols-1 md:grid-cols-2 gap-2" onSubmit={handleSubmit}>
          {/* First Column */}
          <div>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full px-5 py-3 border-2 rounded"
              placeholder="First Name"
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full px-5 py-3 border-2 rounded"
              placeholder="Last Name"
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-5 py-3 border-2 rounded"
              placeholder="Username"
              required
            />
          </div>
          <div>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-5 py-3 border-2 rounded"
              placeholder="Email"
              required
            />
          </div>

          {/* Second Column */}
          <div>
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className="w-full px-5 py-3 border-2 rounded"
              placeholder="Phone Number"
              required
            />
          </div>
          <div>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-5 py-3 border-2 rounded"
              required
            >
              <option value="" disabled>Select your role</option>
              <option value="STUDENT">Student</option>
              <option value="TEACHER">Teacher</option>
            </select>
          </div>
          <div>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-5 py-3 border-2 rounded"
              placeholder="Password"
              required
            />
          </div>
          <div>
            <input
              type="password"
              name="password2"
              value={formData.password2}
              onChange={handleChange}
              className="w-full px-5 py-3 border-2 rounded"
              placeholder="Confirm Password"
              required
            />
          </div>

          {error && <p className="text-red-500 col-span-2">{error?.message || error?.detail || "An error occurred"}</p>}


          {/* Center the Register Button */}
          <div className="col-span-2 flex justify-center">
            <button
              type="submit"
              className="w-full md:w-1/2 mt-2 bg-indigo-500 text-white font-medium py-3 rounded-md hover:bg-indigo-700"
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </div>
        </form>

        <p className="my-2 text-center">
          Already have an account? Please
          <Link to="/login" className="text-red-700 italic">
            {" "}Login
          </Link>
        </p>
      </div>

    </>
  );
};

export default Register;
