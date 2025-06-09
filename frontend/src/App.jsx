import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import GooglePayButton from "./Components/Payment";
import store, { persistor } from "./app/store";

// Pages & Components
import Home from "./pages/Home";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";
import UniverCity from "./pages/UniverCity";
import College from "./pages/College";
import Publication from "./pages/Publication";
import NewsWingNavBar from "./pages/NewsWingNavBar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminPost from "./pages/AdminPost";
import UserNews from "./pages/AdminPost";
import AdminCreate from "./pages/AdminCreate";
import EditNews from "./pages/EditNews";
import UpdateProfile from "./pages/UpdateProfile";
import AdminLogin from "./pages/AdminLogin";
import PDFUploader from "./pages/PdfUploader";
import PDFGallery from "./pages/PDFGallery";
import NewsDetail from "./pages/NewsDetails";
import NewsLayout from "./Layout/NewsLayout";
import SubCategoryPosts from "./pages/SubCategoryPosts";
import CategoryPosts from "./pages/CategoryPosts";
import AdminRoute from "./Layout/AdminRoute";
import { useSelector } from "react-redux";
import ArticleForm from "./pages/ArticleForm";
import AdminArticles from "./pages/AdminArticles";

function AppContent() {
  const location = useLocation();
  const isNewsWing = location.pathname.startsWith("/news");
   const userDetails = useSelector((state) => state.user.user);
const isAdmin = userDetails.isAdmin 
console.log(isAdmin)
  return (
    <>
      {isNewsWing ? <NewsWingNavBar /> : <NavBar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/university" element={<UniverCity />} />
        <Route path="/college" element={<College />} />
        <Route path="/publication" element={<>
        {
          isAdmin ? <AdminArticles/> : <><Publication /> <ArticleForm /></> 
        }
      </>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin-news" element={<AdminPost />} />
        <Route path="/news" element={<UserNews />} />

        <Route
          path="/admin-create"
          element={
            <AdminRoute>
              <AdminCreate />
            </AdminRoute>
          }
        />
        <Route path="/admin/edit/:id" element={<EditNews />} />
        <Route path="/profile/edit" element={<UpdateProfile />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route
          path="/pdf-upload"
          element={
            <AdminRoute>
              <PDFUploader />
            </AdminRoute>
          }
        />
        <Route
          path="/category/:category"
          element={
            <NewsLayout>
              <CategoryPosts />
            </NewsLayout>
          }
        />
        <Route
          path="/category/:category/subcategory/:subcategory"
          element={
            <NewsLayout>
              <SubCategoryPosts />
            </NewsLayout>
          }
        />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/e-paper" element={<PDFGallery />} />
        <Route path="/payment" element={<GooglePayButton />} />
       

      </Routes>

      <Footer />

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <PersistGate loading={null} persistor={persistor}>
          <AppContent />
        </PersistGate>
      </Router>
    </Provider>
  );
}

export default App;
