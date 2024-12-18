import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendForgotPasswordEmail, clearMessage } from '../../store/auth-slice/authSlice';
import Toast from '../../utils/Toast';

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
    <div className="main-section">
      <div className="user-dashboard">
        <div className="user-holder">
          <h4 className="text-center mb-0">Forgot Your Password?</h4>
          <p className="text-center">
            Please enter your email and we will send you a link to reset your
            password.
          </p>
          <hr />
          <div id="restaurant-sets-holder">
            <form
              className="form-fields-set"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              <div className="field-holder">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control px-2"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="field-holder payment-holder">
                <input
                  type="submit"
                  value={
                    emailStatus === "loading" ? "Sending..." : "Submit"
                  }
                  className="btn btn-danger mb-2"
                  disabled={emailStatus === "loading"}
                />
              </div>
            </form>
            {emailStatus === "success" && (
              <p className="text-success text-center mt-3">{message.text}</p>
            )}
            {emailStatus === "error" && (
              <p className="text-danger text-center mt-3">{error.text}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
