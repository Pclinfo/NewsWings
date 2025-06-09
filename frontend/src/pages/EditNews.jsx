// src/pages/EditNews.jsx

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetNewsByIdQuery, useUpdateNewsMutation } from '../services/AdminPosts';
import { toast } from 'react-toastify';
import {
  setCategory,
  setSubCategory,
  resetCategory,
} from '../features/CategorySlice';


const EditNews = () => {
   const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetNewsByIdQuery(id);
  const [updateNews] = useUpdateNewsMutation();
  const categoryMap = useSelector((state) => state.category.categoryMap);
  const selectedCategory = useSelector((state) => state.category.selectedCategory);
  const selectedSubCategory = useSelector((state) => state.category.selectedSubCategory);
  const BASE_URL = import.meta.env.VITE_API_URL || 'http://192.168.0.104:5000';

  const [form, setForm] = useState({
    news_title: '',
    news_description: '',
    news_category: '',
    news_sub_category: '',
  });

  const [previewUrl, setPreviewUrl] = useState(null);
  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    if (data) {
      setForm({
        news_title: data.news_title || '',
        news_description: data.news_description || '',
        news_category: data.news_category || '',
        news_sub_category: data.news_sub_category || '',
      });

      if (data.image_url) {
        setPreviewUrl(data.image_url);
      } else if (data.image) {
        setPreviewUrl(`${BASE_URL}/uploads/${data.image}`);
      }
    }
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'news_category' ? { news_sub_category: '' } : {}),
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('news_title', form.news_title);
    formData.append('news_description', form.news_description);
    formData.append('news_category', form.news_category);
    formData.append('news_sub_category', form.news_sub_category);

    if (newImage) {
      formData.append('image', newImage);
    }

    try {
      await updateNews({ id, formData }).unwrap();
      toast.success('✅ News updated successfully');
      navigate('/news');
    } catch (err) {
      console.error('Update error:', err);
      toast.error('❌ Failed to update news');
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">Access denied or item not found</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Edit News</h2>
      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <div>
          <label className="block font-medium mb-1">Title</label>
          <input
            type="text"
            name="news_title"
            value={form.news_title}
            onChange={handleChange}
            placeholder="News title"
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="news_description"
            value={form.news_description}
            onChange={handleChange}
            placeholder="News description"
            className="w-full border p-2 rounded"
            rows={5}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Category</label>
          <select
            name="news_category"
            value={form.news_category}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Select Category</option>
            {Object.keys(categoryMap).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {form.news_category && categoryMap[form.news_category] && (
          <div>
            <label className="block font-medium mb-1">Sub-category</label>
            <select
              name="news_sub_category"
              value={form.news_sub_category}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            >
              <option value="">Select Sub Category</option>
              {categoryMap[form.news_category].map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>
        )}

        {previewUrl && (
          <div className="mt-4">
            <p className="text-sm text-gray-600 mb-1">Current Image Preview:</p>
            <img
              src={previewUrl}
              alt="Preview"
              className="w-64 h-auto rounded shadow border"
            />
          </div>
        )}

        <div>
          <label className="block font-medium mb-1">Replace Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="block w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditNews;


