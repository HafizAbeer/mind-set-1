import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";
import AuthLayout from "../components/auth/AuthLayout";
import AuthInput from "../components/auth/AuthInput";
import AuthButton from "../components/auth/AuthButton";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        },
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to send reset PIN");

      navigate("/enter-pin", { state: { email, type: "forgot" } });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Enter the email address associated with your account and we will send you a PIN to reset your password."
      footerText="Back to.."
      footerLinkText="Login"
      footerLinkHref="/login"
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}
        <AuthInput
          label="Enter your email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="xyz@123.com"
          icon={Mail}
          required
        />

        <AuthButton type="submit" disabled={loading}>
          {loading ? "Sending..." : "Continue"}
        </AuthButton>
      </form>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
