
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useCreateNewsMutation } from '../services/AdminPosts';
import {
  setCategory,
  setSubCategory,
  resetCategory,
} from '../features/CategorySlice';

const AdminCreate = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const categoryMap = useSelector((state) => state.category.categoryMap);
  const selectedCategory = useSelector((state) => state.category.selectedCategory);
  const selectedSubCategory = useSelector((state) => state.category.selectedSubCategory);

  const [createNews, { isLoading }] = useCreateNewsMutation();

  const [formData, setFormData] = useState({
    news_title: '',
    news_description: '',
    image: { url: '', width: 400, height: 300 },
  });

  const [customSubMenu, setCustomSubMenu] = useState('');
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleCategoryChange = (e) => {
    dispatch(setCategory(e.target.value));
    dispatch(setSubCategory(''));
    setCustomSubMenu('');
    setErrors((prev) => ({
      ...prev,
      news_category: undefined,
      news_sub_category: undefined,
    }));
  };

  const handleSubCategoryChange = (e) => {
    dispatch(setSubCategory(e.target.value));
    setCustomSubMenu('');
    setErrors((prev) => ({ ...prev, news_sub_category: undefined }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        image: { ...prev.image, url: reader.result },
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleImageSizeChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      image: { ...prev.image, [name]: parseInt(value) || 0 },
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!selectedCategory) newErrors.news_category = 'Please select a category.';
    if (!selectedSubCategory) newErrors.news_sub_category = 'Please select a sub-category.';
    if (selectedSubCategory === 'Others' && !customSubMenu.trim())
      newErrors.news_submenu = 'Please enter a custom submenu.';
    if (!formData.news_title.trim()) newErrors.news_title = 'Title is required.';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const fd = new FormData();
    fd.append('news_title', formData.news_title);
    fd.append('news_description', formData.news_description);
    fd.append('news_category', selectedCategory);
    fd.append('news_sub_category', selectedSubCategory);
    fd.append('news_submenu', selectedSubCategory === 'Others' ? customSubMenu : '');
    fd.append('image_width', formData.image.width);
    fd.append('image_height', formData.image.height);

    if (formData.image.url && formData.image.url.startsWith('data:image')) {
      const blob = await (await fetch(formData.image.url)).blob();
      fd.append('image', blob, 'upload.png');
    }

    try {
      await createNews(fd).unwrap();
      toast.success('✅ News Created');
      dispatch(resetCategory());
      setFormData({
        news_title: '',
        news_description: '',
        image: { url: '', width: 400, height: 300 },
      });
      setCustomSubMenu('');
      setErrors({});
    } catch (err) {
      toast.error('❌ Creation Failed');
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg space-y-8"
    >
      {/* News Category */}
      <div>
        <label className="block mb-2 font-semibold text-gray-700">
          News Category <span className="text-red-600">*</span>
        </label>
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 transition ${
            errors.news_category ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
          }`}
        >
          <option value="" disabled>Select Category</option>
          {Object.keys(categoryMap)
            .filter((cat) => cat !== 'Others')
            .map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          <option value="Others">Others</option>
        </select>
        {errors.news_category && (
          <p className="mt-1 text-sm text-red-600">{errors.news_category}</p>
        )}
      </div>

      {/* Sub Category */}
      {selectedCategory && (
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Sub Category <span className="text-red-600">*</span>
          </label>
          <select
            value={selectedSubCategory}
            onChange={handleSubCategoryChange}
            className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 transition ${
              errors.news_sub_category ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
            }`}
          >
            <option value="" disabled>Select Sub Category</option>
            {(categoryMap[selectedCategory] || [])
              .filter((sub) => sub !== 'Others')
              .map((sub) => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            <option value="Others">Others</option>
          </select>
          {errors.news_sub_category && (
            <p className="mt-1 text-sm text-red-600">{errors.news_sub_category}</p>
          )}
        </div>
      )}

      {/* Custom Submenu */}
      {selectedSubCategory === 'Others' && (
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Custom Submenu <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            value={customSubMenu}
            onChange={(e) => setCustomSubMenu(e.target.value)}
            placeholder="Enter custom submenu"
            className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 transition ${
              errors.news_submenu ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
            }`}
          />
          {errors.news_submenu && (
            <p className="mt-1 text-sm text-red-600">{errors.news_submenu}</p>
          )}
        </div>
      )}

      {/* Title */}
      <div>
        <label className="block mb-2 font-semibold text-gray-700">
          Title <span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          name="news_title"
          value={formData.news_title}
          onChange={handleInputChange}
          placeholder="Enter news title"
          className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 transition ${
            errors.news_title ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
          }`}
        />
        {errors.news_title && (
          <p className="mt-1 text-sm text-red-600">{errors.news_title}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block mb-2 font-semibold text-gray-700">Description</label>
        <textarea
          name="news_description"
          value={formData.news_description}
          onChange={handleInputChange}
          placeholder="Enter news description (optional)"
          rows={4}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-y"
        />
      </div>

      {/* Image Upload */}
      <div>
        <label className="block mb-2 font-semibold text-gray-700">Image Upload</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="mb-2"
        />
        {formData.image.url && (
          <img
            src={formData.image.url}
            alt="Preview"
            width={formData.image.width}
            height={formData.image.height}
            className="mb-2 object-contain border rounded"
          />
        )}
      </div>

      {/* Image Size Controls */}
      <div className="flex space-x-4">
        <div>
          <label className="block mb-1 font-semibold text-gray-700">Width (px)</label>
          <input
            type="number"
            name="width"
            value={formData.image.width}
            onChange={handleImageSizeChange}
            min={50}
            max={2000}
            className="w-24 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold text-gray-700">Height (px)</label>
          <input
            type="number"
            name="height"
            value={formData.image.height}
            onChange={handleImageSizeChange}
            min={50}
            max={2000}
            className="w-24 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition disabled:opacity-50"
        >
          {isLoading ? 'Creating...' : 'Create News'}
        </button>
      </div>
    </form>
  );
};

export default AdminCreate;
