import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const user = useSelector((state) => state.user);
  console.log("adminRoute", user); // ✅ Proper logging

  return user?.token && user.user?.isAdmin ? children : <Navigate to="/news" replace />;
};

export default AdminRoute;
