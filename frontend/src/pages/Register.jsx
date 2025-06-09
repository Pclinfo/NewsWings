import React, { useState } from "react";
import { useRegisterMutation } from "../services/api";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Upload } from "lucide-react";
import { ToastContainer, toast } from "react-toastify"; // ⭐ Toast import
import "react-toastify/dist/ReactToastify.css"; // ⭐ Toast CSS import
import { Link } from "react-router-dom";
const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    email: "",
    mobile: "",
    createPassword: "",
    confirmPassword: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [showCreatePassword, setShowCreatePassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formVisible, setFormVisible] = useState(true);

  const [Register, { isLoading, error }] = useRegisterMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const triggerFileInput = () => {
    document.getElementById("profileImageInput").click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.createPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const payload = new FormData();
      payload.append("name", formData.name);
      payload.append("dob", formData.dob);
      payload.append("email", formData.email);
      payload.append("mobile", formData.mobile);
      payload.append("password", formData.createPassword);
      payload.append("profile_image", profileImage);

      const response = await Register(payload).unwrap();

      if (response) {
        toast.success(response.message || "Registration successful!");
      }

      // Reset form after successful submit
      setFormData({
        name: "",
        dob: "",
        email: "",
        mobile: "",
        createPassword: "",
        confirmPassword: "",
      });
      setProfileImage(null);
      setImagePreview(null);
    } catch (err) {
      console.error("Error:", err);
      toast.error(err?.data?.error || "Something went wrong!");
    }
  };

  const togglePassword = (type) => {
    if (type === "create") {
      setShowCreatePassword((prev) => !prev);
    } else if (type === "confirm") {
      setShowConfirmPassword((prev) => !prev);
    }
  };

  if (!formVisible) return null;

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center p-4">
    <div className="bg-white p-4 md:p-8 rounded-md shadow-md w-full max-w-4xl flex flex-col md:flex-row gap-8">
      
      {/* Profile Image Section */}
      <div className="flex flex-col items-center justify-center flex-shrink-0">
        <label className="font-semibold text-gray-700 mb-2">Upload Profile Image</label>
  
        <input
          type="file"
          id="profileImageInput"
          accept="image/png, image/jpeg"
          onChange={handleImageChange}
          className="hidden"
        />
  
        <div
          onClick={triggerFileInput}
          className="w-32 h-32 flex items-center justify-center bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300 overflow-hidden relative"
        >
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Profile Preview"
              className="w-32 h-32 object-cover rounded-full"
            />
          ) : (
            <Upload size={48} className="text-gray-600" />
          )}
        </div>
      </div>
  
      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className="flex-1 space-y-6"
        encType="multipart/form-data"
      >
        {/* Toast Container */}
        <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
  
        {/* Form Fields */}
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="flex-1 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="flex-1 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
  
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email ID"
            value={formData.email}
            onChange={handleChange}
            className="flex-1 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
          <input
            type="tel"
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
            className="flex-1 p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
  
        {/* Password Fields */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <input
              type={showCreatePassword ? "text" : "password"}
              name="createPassword"
              placeholder="Create Password"
              value={formData.createPassword}
              onChange={handleChange}
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <button
              type="button"
              onClick={() => togglePassword("create")}
              className="absolute top-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 right-3 text-gray-600 hover:text-gray-800"
            >
              {showCreatePassword ? (
                <FaEyeSlash className="w-5 h-5" />
              ) : (
                <FaEye className="w-5 h-5" />
              )}
            </button>
          </div>
  
          <div className="relative flex-1">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 "
              required
            />
            <button
              type="button"
              onClick={() => togglePassword("confirm")}
              className="absolute top-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 right-3 text-gray-600 hover:text-gray-800"
            >
              {showConfirmPassword ? (
                <FaEyeSlash className="w-5 h-5" />
              ) : (
                <FaEye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
  
        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white py-3 font-medium cursor-pointer px-6 rounded w-full hover:bg-blue-700 transition"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
        <p className=" font-medium text-center">Already User ? <Link to='/login'> <span className=" text-blue-500"> Login</span>  </Link></p>
      </form>
      
    </div>
  </div>
  
  );
};

export default Register;
