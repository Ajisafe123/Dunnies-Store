"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  Check,
  AlertCircle,
  Loader2,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { register } from "@/services/auth";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const router = useRouter();

  const passwordRequirements = [
    { label: "At least 8 characters", met: formData.password.length >= 8 },
    { label: "One uppercase letter", met: /[A-Z]/.test(formData.password) },
    { label: "One number", met: /[0-9]/.test(formData.password) },
  ];

  const passwordsMatch =
    formData.password === formData.confirmPassword && formData.password !== "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!agreedToTerms)
      return setError("Please agree to the terms and conditions");
    if (!passwordsMatch) return setError("Passwords do not match");
    if (!passwordRequirements.every((r) => r.met))
      return setError("Password does not meet requirements");

    setIsLoading(true);

    try {
      await register({
        name: formData.fullName.trim(),
        email: formData.email,
        password: formData.password,
      });

      router.push(
        "/login?success=Account created successfully! Please sign in."
      );
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Create Account
          </h1>
          <p className="text-gray-600">Start your journey with us</p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl border border-purple-100 p-8 backdrop-blur-sm">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Full Name
              </label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400 group-focus-within:text-purple-600 transition-colors" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all text-sm bg-gray-50 focus:bg-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400 group-focus-within:text-purple-600 transition-colors" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all text-sm bg-gray-50 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Phone Number{" "}
                  <span className="text-gray-400 text-xs font-normal">
                    (Optional)
                  </span>
                </label>
                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400 group-focus-within:text-purple-600 transition-colors" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+234 800 000 0000"
                    className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all text-sm bg-gray-50 focus:bg-white"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400 group-focus-within:text-purple-600 transition-colors" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full pl-12 pr-12 py-3.5 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all text-sm bg-gray-50 focus:bg-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {formData.password && (
                <div className="mt-4 p-4 bg-purple-50 rounded-lg space-y-2">
                  {passwordRequirements.map((req) => (
                    <div
                      key={req.label}
                      className="flex items-center gap-3 text-sm"
                    >
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center ${
                          req.met ? "bg-green-500" : "bg-gray-300"
                        }`}
                      >
                        {req.met && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <span
                        className={
                          req.met
                            ? "text-green-700 font-medium"
                            : "text-gray-600"
                        }
                      >
                        {req.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-800 mb-2">
                Confirm Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400 group-focus-within:text-purple-600 transition-colors" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className={`w-full pl-12 pr-12 py-3.5 border-2 rounded-lg focus:outline-none focus:ring-4 transition-all text-sm ${
                    formData.confirmPassword
                      ? passwordsMatch
                        ? "border-green-400 focus:ring-green-100 focus:border-green-500 bg-green-50"
                        : "border-red-400 focus:ring-red-100 focus:border-red-500 bg-red-50"
                      : "border-gray-200 focus:ring-purple-100 focus:border-purple-500 bg-gray-50 focus:bg-white"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <label className="flex items-start space-x-3 cursor-pointer p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
              <input
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="w-5 h-5 mt-0.5 border-2 border-purple-300 rounded text-purple-600 focus:ring-2 focus:ring-purple-500"
              />
              <span className="text-sm text-gray-700">
                I agree to the{" "}
                <span className="text-purple-600 font-bold">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="text-purple-600 font-bold">
                  Privacy Policy
                </span>
              </span>
            </label>

            <Button
              type="submit"
              variant="primary"
              fullWidth
              disabled={isLoading || !agreedToTerms}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating Account...
                </span>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-10">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-purple-600 hover:text-purple-800 hover:underline font-bold transition-colors"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
