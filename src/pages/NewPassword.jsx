import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Lock } from "lucide-react";
import AuthLayout from "../components/auth/AuthLayout";
import AuthInput from "../components/auth/AuthInput";
import AuthButton from "../components/auth/AuthButton";

const NewPasswordPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";
  const code = location.state?.code || "";

  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!email || !code) {
      return setError(
        "Session expired. Please restart the password reset process.",
      );
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      return setError("Passwords do not match");
    }

    if (passwords.newPassword.length < 8) {
      return setError("Password must be at least 8 characters long");
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          code,
          newPassword: passwords.newPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to reset password");

      setSuccessMsg("Password reset successfully! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="New Password"
      subtitle={`Enter your New Password ${email ? `for ${email}` : ""}`}
      footerText="Back to.."
      footerLinkText="Login"
      footerLinkHref="/login"
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}
        {successMsg && (
          <div className="text-green-500 text-sm text-center">{successMsg}</div>
        )}

        <AuthInput
          label="New password"
          name="newPassword"
          type="password"
          value={passwords.newPassword}
          onChange={handleChange}
          placeholder="Password"
          icon={Lock}
          footerText="Minimum length is 8 characters."
          required
        />

        <AuthInput
          label="Confirm password"
          name="confirmPassword"
          type="password"
          value={passwords.confirmPassword}
          onChange={handleChange}
          placeholder="Password"
          icon={Lock}
          footerText="Minimum length is 8 characters."
          required
        />

        <AuthButton type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </AuthButton>
      </form>
    </AuthLayout>
  );
};

export default NewPasswordPage;
