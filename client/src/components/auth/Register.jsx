import React from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api/api";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Auth.css";

const Register = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: "", password: "", confirmPassword: "", name: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().min(6, "Min 6 chars").required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
      name: Yup.string().required("Required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        await api.post("/auth/register", {
          email: values.email,
          password: values.password,
          name: values.name,
        });
        navigate("/verify-otp", { state: { email: values.email } });
      } catch (err) {
        setErrors({ email: "Registration failed" });
      }
      setSubmitting(false);
    },
  });

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-image"></div>

        <div className="auth-form-section">
          <h2 className="auth-title">Register to Admin Panel</h2>
          <p className="auth-subtitle">Create your account to get started</p>

          <form onSubmit={formik.handleSubmit}>
            <label className="auth-label" htmlFor="name">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="auth-input"
              placeholder="Enter your name"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            {formik.errors.name && (
              <div className="auth-error">{formik.errors.name}</div>
            )}

            <label className="auth-label" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="auth-input"
              placeholder="Enter your email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email && (
              <div className="auth-error">{formik.errors.email}</div>
            )}

            <label className="auth-label" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="auth-input"
              placeholder="Enter your password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.errors.password && (
              <div className="auth-error">{formik.errors.password}</div>
            )}

            <label className="auth-label" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              className="auth-input"
              placeholder="Confirm your password"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
            />
            {formik.errors.confirmPassword && (
              <div className="auth-error">{formik.errors.confirmPassword}</div>
            )}

            <button
              type="submit"
              className="auth-btn"
              disabled={formik.isSubmitting}
            >
              Register
            </button>

            <div className="auth-link">
              Already have an account?
              <Link to="/login">Login</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
