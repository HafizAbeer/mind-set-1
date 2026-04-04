import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { KeyRound } from "lucide-react";
import AuthLayout from "../components/auth/AuthLayout";
import AuthInput from "../components/auth/AuthInput";
import AuthButton from "../components/auth/AuthButton";

const EnterPinPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";
  const type = location.state?.type || "verify";

  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!email) {
      return setError(
        "Session expired or email missing. Please signup or request reset again.",
      );
    }

    if (pin.length < 6) {
      return setError("Please enter a valid PIN");
    }

    if (type === "forgot") {
      navigate("/new-password", { state: { email, code: pin } });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: pin }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Invalid PIN");

      setSuccessMsg("Account verified successfully! Redirecting...");

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
      title="Enter PIN"
      subtitle={`Enter your PIN that was sent to your email address to ${type === "forgot" ? "reset your password" : "verify your account"}. ${email ? `(Sent to ${email})` : ""}`}
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
          label="PINcode"
          type="text"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          placeholder="123456"
          icon={KeyRound}
          required
        />

        <AuthButton type="submit" disabled={loading}>
          {loading ? "Verifying..." : "Continue"}
        </AuthButton>
      </form>
    </AuthLayout>
  );
};

export default EnterPinPage;
