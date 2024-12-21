import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendForgotPasswordEmail, clearMessage } from "../../store/auth-slice/authSlice";
import Toast from "../../utils/Toast";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const { emailStatus, message, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(clearMessage()); // Clear any previous messages

    try {
      await dispatch(sendForgotPasswordEmail(email)).unwrap(); // Await and unwrap the action
      Toast().fire({
        icon: "success",
        title: "Email sent successfully",
      });
    } catch (error) {
      Toast().fire({
        icon: "error",
        title: error.message || "Failed to send email",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h4 className="text-2xl font-semibold text-center mb-4 text-gray-800">
          Forgot Your Password?
        </h4>
        <p className="text-sm text-gray-600 text-center mb-6">
          Please enter your email address, and we will send you a link to reset your password.
        </p>
        <hr className="mb-6" />
        <form
          className="space-y-4"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full px-4 py-2 rounded-md text-white font-semibold ${emailStatus === "loading"
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
              }`}
            disabled={emailStatus === "loading"}
          >
            {emailStatus === "loading" ? "Sending..." : "Submit"}
          </button>
        </form>
        {emailStatus === "success" && (
          <p className="mt-4 text-green-600 text-center">{message?.text}</p>
        )}
        {emailStatus === "error" && (
          <p className="mt-4 text-red-600 text-center">{error?.text}</p>
        )}
      </div>
    </div>
  );
};

export default ForgetPassword;
