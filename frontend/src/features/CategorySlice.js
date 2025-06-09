



// src/features/category/categorySlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialCategoryMap = {
  'Sports News': ['Cricket', 'Football', 'Basketball', 'Hockey'],
  'Business': ['Economy', 'Industry', 'Markets', 'Budget'],
  'Current News': ['Politics', 'Weather', 'Events'],
  'India': ['World', 'States', 'Cities'],
  'Health': ['Science', 'Fitness', 'Disease', 'Healthcare', 'Gadgets'],
  'Entertainment': ['Movies', 'Music', 'TV', 'Celebrities', 'OTT'],
  'Education': ['Exams', 'Results', 'Scholarships'],
  'Others': [],  // Ensure 'Others' category is always present
};

const initialState = {
  categoryMap: initialCategoryMap,
  selectedCategory: '',
  selectedSubCategory: '',
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.selectedSubCategory = '';
    },
    setSubCategory: (state, action) => {
      state.selectedSubCategory = action.payload;
    },
    resetCategory: (state) => {
      state.selectedCategory = '';
      state.selectedSubCategory = '';
    },
    addCustomCategory: (state, action) => {
      const { category, subCategory } = action.payload;
      if (!state.categoryMap[category]) {
        // create the category and add the subcategory
        state.categoryMap[category] = subCategory ? [subCategory] : [];
      } else if (subCategory && !state.categoryMap[category].includes(subCategory)) {
        // add subcategory if not present
        state.categoryMap[category].push(subCategory);
      }
    },
  },
});

export const {
  setCategory,
  setSubCategory,
  resetCategory,
  addCustomCategory,
} = categorySlice.actions;

export default categorySlice.reducer;
