import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import api from "../../api/api";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Auth.css";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const res = await api.post("/auth/login", values);
        login(res.data.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.data.user));
        navigate("/dashboard");
      } catch (err) {
        setErrors({ email: "Invalid credentials" });
      }
      setSubmitting(false);
    },
  });

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-image"></div>

        <div className="auth-form-section">
          <h2 className="auth-title">Log In to Admin Panel</h2>
          <p className="auth-subtitle">Enter your credentials to continue</p>

          <form onSubmit={formik.handleSubmit}>
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

            <button
              type="submit"
              className="auth-btn"
              disabled={formik.isSubmitting}
            >
              Log In
            </button>

            <div className="auth-link">
              Don't have an account?
              <Link to="/register">Register</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
