import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import AdminHome from '../../pages/Admin/AdminHome';
import Users from '../../pages/Admin/users/Users';
import Transactions from '../../pages/Admin/Transaction/Transactions';
import AddUser from '../../pages/Admin/users/AddUser';
import Login from '../../pages/common/Login';
import UpdateUser from '../../pages/Admin/users/UpdateUser';
import AdminItem from '../../pages/Admin/Items/Item';
import AddItem from '../../pages/Admin/Items/AddItems';
import UpdateItems from '../../pages/Admin/Items/UpdateItems';
import SignUp from '../../pages/common/SignUp';
import UnAuthorized from '../../pages/common/UnAuthorized';
import { getAdmin } from '../../utils/utlis';

const PrivateRoutes = () => {
  return getAdmin() ? <Outlet /> : <Navigate to="/unauthorized" />;
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
      <Route path="/" element={<AdminItem employee={true} />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<SignUp />} />
      <Route path="/unauthorized" element={<UnAuthorized />} />{' '}
      {/* Add Unauthorized page route */}
    </Routes>
  );
}
