import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";
import AuthLayout from "../components/auth/AuthLayout";
import AuthInput from "../components/auth/AuthInput";
import AuthButton from "../components/auth/AuthButton";
import AuthCheckbox from "../components/auth/AuthCheckbox";
import AuthSelect from "../components/auth/AuthSelect";
import AgreementModal from "../components/auth/AgreementModal";

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    role: "User",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAgreementOpen, setIsAgreementOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (e) => {
    setFormData({ ...formData, role: e.target.value });
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match");
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          gender: formData.gender,
          role: formData.role,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      // Redirect to the "verify-email" page (EnterPin)
      navigate("/enter-pin", { state: { email: formData.email } });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignupClick = () => {
    const { name, email, gender, password, confirmPassword } = formData;
    if (!name || !email || !gender || !password || !confirmPassword) {
      setError("Please fill in all fields before signing up.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    setIsAgreementOpen(true);
  };

  return (
    <AuthLayout
      title="Sign Up for free"
      footerText="Back to.."
      footerLinkText="Login"
      footerLinkHref="/login"
    >
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}

        <AuthInput
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Username"
          icon={User}
          required
        />

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

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full">
          <div className="flex-1">
            <AuthSelect
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              icon={User}
              options={["Male", "Female"]}
            />
          </div>

          <div className="flex-1">
            <AuthSelect
              label="Role"
              name="role"
              value={formData.role}
              onChange={handleSelectChange}
              icon={User}
              options={["User", "Therapist"]}
            />
          </div>
        </div>

        <AuthInput
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          icon={Lock}
          footerText="Minimum length is 8 characters."
          required
          minLength={8}
        />

        <AuthInput
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Password"
          icon={Lock}
          required
          minLength={8}
        />

        <AuthButton
          type="button"
          disabled={loading}
          onClick={handleSignupClick}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </AuthButton>

        <div className="pt-2">
          <AuthCheckbox
            defaultChecked
            label={
              <span className="text-[14px] leading-[20px] text-gray-300">
                By creating an account, you agree to the{" "}
                <button
                  type="button"
                  onClick={handleSignupClick}
                  className="text-[#6BC7FF] underline"
                >
                  Terms of Service
                </button>
                . We will occasionally send you account related emails.
              </span>
            }
          />
        </div>
      </form>
      <AgreementModal
        isOpen={isAgreementOpen}
        onClose={() => setIsAgreementOpen(false)}
        onAccept={() => handleSubmit()}
        role={formData.role}
      />
    </AuthLayout>
  );
};

export default SignupPage;
