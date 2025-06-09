// src/app/store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import categoryReducer from '../features/CategorySlice';
import userReducer from '../features/userSlice';
import { authApi } from '../services/api';
import { newsApi } from '../services/AdminPosts';
import { studentApi } from '../services/studentApi';
import { categoriesNewsApi } from '../services/CategoriesNews'; // ✅ Fix 1: confirm correct export
import plansReducer from '../features/PlanSlice'
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  category: categoryReducer,
  user: userReducer,
  plans: plansReducer,
  [authApi.reducerPath]: authApi.reducer,
  [newsApi.reducerPath]: newsApi.reducer,
  [studentApi.reducerPath]: studentApi.reducer,
  [categoriesNewsApi.reducerPath]: categoriesNewsApi.reducer, // ✅ Fix 2
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(
      authApi.middleware,
      newsApi.middleware,
      categoriesNewsApi.middleware ,// ✅ Add this too
      studentApi.middleware

    ),
});

export const persistor = persistStore(store);
export default store;
