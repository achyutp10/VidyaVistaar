import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearResetState, resetPassword } from '../../store/auth-slice/authSlice';
import Toast from '../../utils/Toast';
// import { resetPassword, clearResetState } from "../slices/authSlice";

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
      const result = await dispatch(resetPassword({ uid, token, password, confirmPassword })).unwrap(); // Await the action
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
    <div className="main-section">
      <div className="user-dashboard">
        <div className="user-holder">
          <h4 className="text-center mb-0">Reset Your Password</h4>
          <p className="text-center">Please enter your new password below</p>
          <hr />
          <form onSubmit={handleSubmit} className="form-fields-set">
            {resetStatus === "error" && (
              <p style={{ color: "red" }}>{resetError}</p>
            )}
            {resetStatus === "success" && (
              <p style={{ color: "green" }}>{resetMessage}</p>
            )}
            <div className="field-holder">
              <label>New Password</label>
              <input
                type="password"
                name="password"
                className="form-control px-2"
                placeholder="Enter new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="field-holder">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirm_password"
                className="form-control px-2"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <div className="field-holder payment-holder">
              <input
                type="submit"
                value={resetStatus === "loading" ? "Resetting..." : "Reset Password"}
                className="btn btn-danger mb-2"
                disabled={resetStatus === "loading"}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
