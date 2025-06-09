

import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import {
  useUpdateProfileMutation,
  useUpdateAdminProfileMutation,
  useGetCurrentUserQuery,
  useGetAdminProfileQuery,
} from "../services/api";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../features/userSlice";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const isAdmin = user?.isAdmin;

  const {
    data: adminData,
    isLoading: isAdminLoading,
    refetch: refetchAdmin,
  } = useGetAdminProfileQuery(user?.user_id, {
    skip: !isAdmin || !user?.user_id,
  });

  const {
    data: regularUserData,
    isLoading: isUserLoading,
    refetch: refetchUser,
  } = useGetCurrentUserQuery(undefined, {
    skip: isAdmin,
  });

  const userData = isAdmin ? adminData : regularUserData;
  const isFetching = isAdmin ? isAdminLoading : isUserLoading;

  const [updateUserProfile] = useUpdateProfileMutation();
  const [updateAdminProfile] = useUpdateAdminProfileMutation();
  const updateProfile = isAdmin ? updateAdminProfile : updateUserProfile;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [mobile, setMobile] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [removeImage, setRemoveImage] = useState(false);

  useEffect(() => {
    if (userData) {
      setName(userData.name || "");
      setEmail(userData.email || "");

      const rawMobile = userData.mobile || "";
      if (rawMobile.startsWith("+")) {
        setCountryCode(rawMobile.slice(0, 4));
        setMobile(rawMobile.slice(4));
      } else {
        setCountryCode("+91");
        setMobile(rawMobile);
      }

      if (userData.profile_image) {
        setPreview(`http://127.0.0.1:5000/${userData.profile_image}?t=${Date.now()}`);
        setRemoveImage(false);
      } else {
        setPreview("");
        setRemoveImage(true);
      }
    }
  }, [userData]);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateMobile = (number) => /^[0-9]{7,12}$/.test(number);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setRemoveImage(false);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreview("/default-profile.png");
    setRemoveImage(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      return toast.error("Invalid email address");
    }

    if (!isAdmin && !validateMobile(mobile)) {
      return toast.error("Invalid mobile number");
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    if (removeImage) formData.append("remove_image", "true");
    if (!isAdmin) {
      formData.append("mobile", `${countryCode}${mobile}`);
    }
    if (image) {
      formData.append("profile_image", image);
    }
    if (removeImage) {
      formData.append("remove_image", "true");
    }

    updateProfile(formData)
      .unwrap()
      .then((res) => {
        toast.success(res.message || "Profile updated successfully!");
        const updatedUser = {
          ...user,
          name,
          email,
          mobile: `${countryCode}${mobile}`,
          profile_image: removeImage ? null : res.user.profile_image,
        };
        dispatch(setUser(updatedUser));
        isAdmin ? refetchAdmin() : refetchUser();
      })
      .catch((err) => {
        console.error("Error updating profile:", err);
        toast.error(err?.data?.error || err?.error || "Update failed");
      });
  };

  if (isFetching) return <p className="text-center">Loading profile...</p>;

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-800">Update Profile</h2>
      <div className="flex flex-col items-center">
        <div className="relative group w-32 h-32">
          {preview === "/default-profile.png" || !preview ? (
            <Avatar
              name={email}
              size="128"
              round={true}
              
            />
          ) : (
            <img
              src={preview}
              alt="Profile Preview"
              className="w-32 h-32 object-cover rounded-full border shadow-sm"
            />
          )}
          <label className="absolute bottom-0 right-0 bg-blue-600 text-white p-1 rounded-full cursor-pointer hover:bg-blue-700 transition">
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            ✎
          </label>
        </div>
        {preview !== "/default-profile.png" && (
          <button
            type="button"
            onClick={handleRemoveImage}
            className="mt-2 text-sm text-red-500 hover:underline"
          >
            Remove Image
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium text-gray-700">Name:</label>
          <input
            type="text"
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-gray-700">Email:</label>
          <input
            type="email"
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {!isAdmin && (
          <div>
            <label className="block mb-1 font-medium text-gray-700">Mobile:</label>
            <div className="flex gap-2">
              <select
                className="border border-gray-300 p-2 rounded-lg bg-white"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
              >
                <option value="+91">🇮🇳 +91</option>
                <option value="+1">🇺🇸 +1</option>
                <option value="+44">🇬🇧 +44</option>
                <option value="+971">🇦🇪 +971</option>
              </select>
              <input
                type="text"
                className="flex-1 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
                maxLength={12}
              />
            </div>
          </div>
        )}
        <button
          type="submit"
          disabled={isFetching}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isFetching ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
