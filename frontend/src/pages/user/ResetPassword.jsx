import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearResetState, resetPassword } from "../../store/auth-slice/authSlice";
import Toast from "../../utils/Toast";

const ResetPassword = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { resetStatus, resetMessage, resetError } = useSelector(
    (state) => state.auth
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (resetStatus === "success") {
      setTimeout(() => {
        navigate("/login");
        dispatch(clearResetState());
      }, 3000);
    }
  }, [resetStatus, navigate, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      Toast().fire({
        icon: "error",
        title: "Passwords do not match",
      });
      return;
    }

    try {
      const result = await dispatch(
        resetPassword({ uid, token, password, confirmPassword })
      ).unwrap(); // Await the action
      Toast().fire({
        icon: "success",
        title: result.message || "Password reset successfully",
      });
    } catch (error) {
      Toast().fire({
        icon: "error",
        title: error.message || "Failed to reset password",
      });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h4 className="text-2xl font-semibold text-center mb-4 text-gray-800">
          Reset Your Password
        </h4>
        <p className="text-sm text-gray-600 text-center mb-6">
          Please enter your new password below.
        </p>
        <hr className="mb-6" />
        <form onSubmit={handleSubmit} className="space-y-4">
          {resetStatus === "error" && (
            <p className="text-red-600 text-center">{resetError}</p>
          )}
          {resetStatus === "success" && (
            <p className="text-green-600 text-center">{resetMessage}</p>
          )}
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              name="password"
              className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirm_password"
              className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full px-4 py-2 rounded-md text-white font-semibold ${resetStatus === "loading"
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
              }`}
            disabled={resetStatus === "loading"}
          >
            {resetStatus === "loading" ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
