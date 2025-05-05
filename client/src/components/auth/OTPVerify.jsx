import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../api/api";
import "./Auth.css";

const OTPVerify = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  if (!email) {
    navigate("/register");
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const otpString = otp.join("");
      if (otpString.length !== 6) {
        setError("Please enter all 6 digits");
        return;
      }

      await api.post("/auth/verify-otp", { email, otp: otpString });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value.replace(/\D/, ""); // Only digits
    if (value.length > 1) return; // Only allow one digit

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Focus next input if value is entered
    if (value && index < 5) {
      const nextInput = e.target.nextSibling;
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = e.target.previousSibling;
      if (prevInput) prevInput.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (pastedData.length === 6) {
      setOtp(pastedData.split(""));
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-image"></div>

        <div className="auth-form-section">
          <h2 className="auth-title">Verify Your Email</h2>
          <p className="auth-subtitle">Enter the 6-digit OTP sent to {email}</p>

          <form onSubmit={handleSubmit}>
            <div className="otp-inputs">
              {Array.from({ length: 6 }).map((_, idx) => (
                <input
                  key={idx}
                  type="text"
                  maxLength={1}
                  className="otp-input"
                  value={otp[idx]}
                  onChange={(e) => handleOtpChange(e, idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  onPaste={handlePaste}
                  onFocus={(e) => e.target.select()}
                  disabled={isSubmitting}
                />
              ))}
            </div>

            {error && <div className="auth-error">{error}</div>}

            <button type="submit" className="auth-btn" disabled={isSubmitting}>
              {isSubmitting ? "Verifying..." : "Verify OTP"}
            </button>

            <div className="auth-link">
              Didn't receive the OTP?{" "}
              <button
                type="button"
                className="auth-link-btn"
                onClick={() => navigate("/register")}
                disabled={isSubmitting}
              >
                Try Again
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OTPVerify;
