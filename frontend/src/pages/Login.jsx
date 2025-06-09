// Login.js
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../features/userSlice";
import { useLoginMutation } from "../services/api";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.from || "/news";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [login, { isLoading, isError, error: loginError }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      toast.error("Please fill in all fields.");
      return;
    }
    setError("");
    try {
      const { data } = await login({ email, password });
      console.log(data);
      if (data?.token) {
        dispatch(
          setUser({
            email: data.user?.email || "user",
            name: data.user?.name || "user",
            user_id: data.user?.id,
            isAdmin: false,
            token: data.token,
            profile_image: data.user?.profile_image,
            mobile:data.user?.mobile,
          })
        );
        toast.success("Login successful!");
        navigate(redirectPath);
      }
    } catch (err) {
      console.error("Login failed:", err);
      toast.error(loginError?.data?.error || "Login failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="mb-4 text-red-500 text-center">{error}</div>
          )}
          {isError && (
            <span className="mb-4 text-red-500 block text-center font-medium">
              {loginError?.data?.error || "An error occurred during login."}
            </span>
          )}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 cursor-pointer bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <a
            href="/forgot-password"
            className="text-sm text-blue-500 hover:underline"
          >
            Forgot your password?
          </a>
        </div>
        <div className="mt-4 text-center">
          <span className="text-sm">Don't have an account? </span>
          <Link
            to="/register"
            className="text-sm text-blue-500 hover:underline"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
