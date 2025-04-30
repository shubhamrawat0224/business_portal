import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../api/api";
import "./Auth.css";

const OTPVerify = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/verify-otp", { email, otp });
      navigate("/login");
    } catch (err) {
      setError("Invalid OTP");
    }
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value.replace(/\D/, ""); // Only digits
    if (!value) return;

    const newOtp = otp.split("");
    newOtp[index] = value[0];
    setOtp(newOtp.join(""));

    // Focus next input
    const nextInput = e.target.nextSibling;
    if (nextInput) nextInput.focus();
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-image"></div>

        <div className="auth-form-section">
          <h2 className="auth-title">Verify Your Email</h2>
          <p className="auth-subtitle">
            Enter the 6-digit OTP sent to your email
          </p>

          <form onSubmit={handleSubmit}>
            <div className="otp-inputs">
              {Array.from({ length: 6 }).map((_, idx) => (
                <input
                  key={idx}
                  type="text"
                  maxLength={1}
                  className="otp-input"
                  value={otp[idx] || ""}
                  onChange={(e) => handleOtpChange(e, idx)}
                  onFocus={(e) => e.target.select()}
                />
              ))}
            </div>

            {error && <div className="auth-error">{error}</div>}

            <button type="submit" className="auth-btn">
              Proceed
            </button>

            <div className="auth-link">
              Didn't get the code?
              <button
                type="button"
                style={{
                  border: "none",
                  background: "none",
                  color: "#2c2c54",
                  fontWeight: "600",
                  cursor: "pointer",
                  marginLeft: "4px",
                }}
                onClick={resendOtp}
              >
                Resend OTP
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OTPVerify;
