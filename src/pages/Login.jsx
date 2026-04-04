import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import AuthLayout from "../components/auth/AuthLayout";
import AuthInput from "../components/auth/AuthInput";
import AuthButton from "../components/auth/AuthButton";
import AuthCheckbox from "../components/auth/AuthCheckbox";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 403 && data.isVerified === false) {
          navigate("/enter-pin", { state: { email: formData.email } });
          return;
        }
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("userToken", data.token);

      const userData = {
        name:
          data.user?.name ||
          data.name ||
          data.displayName ||
          data.userName ||
          "User",
        email: data.user?.email || data.email || formData.email,
      };
      localStorage.setItem("user", JSON.stringify(userData));

      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Login"
      footerText="Don't have an account?"
      footerLinkText="Sign Up"
      footerLinkHref="/signup"
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}

        <AuthInput
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          icon={Mail}
          required
        />

        <AuthInput
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          icon={Lock}
          rightLabelText="Forgot Password?"
          rightLabelHref="/forgot-password"
          footerText="Minimum length is 8 characters."
          required
        />

        <AuthCheckbox label="Remember Me" defaultChecked />

        <AuthButton type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </AuthButton>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
