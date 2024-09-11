import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import AdminHome from '../../pages/Admin/AdminHome';
import Users from '../../pages/Admin/users/Users';
import AddUser from '../../pages/Admin/users/AddUser';
import Login from '../../pages/common/Login';
import UpdateUser from '../../pages/Admin/users/UpdateUser';
import AdminItem from '../../pages/Admin/Items/Item';
import AddItem from '../../pages/Admin/Items/AddItems';
import UpdateItems from '../../pages/Admin/Items/UpdateItems';
import SignUp from '../../pages/common/SignUp';
import UnAuthorized from '../../pages/common/UnAuthorized';
import { getAdmin, getUser } from '../../utils/utlis';
import Profile from '../../pages/Employee/Profile';
import Transactions from '../../pages/Admin/Transaction/Transactions';

const PrivateRoutes = () => {
  return getAdmin() ? <Outlet /> : <Navigate to="/unauthorized" />;
};

const PublicRoutes = () => {
  return getUser() ? <Outlet /> : <Navigate to="/unauthorized" />;
};
export default function Router() {
  return (
    <Routes>
      {/* Private Routes - Require authentication and admin role */}
      <Route element={<PrivateRoutes />}>
        <Route path="/dashboard" element={<AdminHome />} />
        <Route
          path="/dashboard/items"
          element={<AdminItem employee={false} />}
        />
        <Route path="/dashboard/items/add" element={<AddItem />} />
        <Route path="/dashboard/items/:id" element={<UpdateItems />} />
        <Route path="/dashboard/user/:id" element={<UpdateUser />} />
        <Route path="/dashboard/transactions" element={<Transactions />} />
        <Route path="/dashboard/users/add" element={<AddUser />} />
        <Route path="/dashboard/users" element={<Users />} />
      </Route>
      {/* Public Routes */}
      <Route element={<PublicRoutes />}>
        <Route path="/" element={<AdminItem employee={true} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/transactions" element={<Transactions />} />
      </Route>
      <Route path="/auth/signup" element={<SignUp />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/unauthorized" element={<UnAuthorized />} />{' '}
      <Route path="*" element={<h1>Page Not Found</h1>} />
      {/* Add Unauthorized page route */}
    </Routes>
  );
}
