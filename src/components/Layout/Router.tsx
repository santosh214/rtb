import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import AdminHome from '../../pages/Admin/AdminHome';
// import Items from '../../pages/Admin/Items/MasterList';
import Users from '../../pages/Admin/users/Users';
import Transactions from '../../pages/Admin/Transaction/Transactions';
import AddUser from '../../pages/Admin/users/AddUser';
import UsersHome from '../../pages/Users/UsersHome';
import Login from '../../pages/common/Login';
import UpdateUser from '../../pages/Admin/users/UpdateUser';
import AdminItem from '../../pages/Admin/Items/AdminItem';
import AddItem from '../../pages/Admin/Items/AddItems';
import UpdateItems from '../../pages/Admin/Items/UpdateItems';


const PrivateRoutes = () => {
  let auth = { 'token': !!localStorage.getItem('email') }
  return (
    auth.token ? <Outlet /> : <Navigate to='/auth/login' />
  )
}
export default function Router() {
 
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="/dashboard" element={<AdminHome />} />
        <Route path="/dashboard/items" element={<AdminItem />} />
        <Route path="/dashboard/items" element={<AdminItem />} />
        <Route path="/dashboard/items/add" element={<AddItem/>} />
        <Route path="/dashboard/items/:id" element={<UpdateItems/>} />
        <Route path="/dashboard/user/:id" element={<UpdateUser />} />
        <Route path="/dashboard/transactions" element={<Transactions />} />
        <Route path="/dashboard/users/add" element={<AddUser />} />
        <Route path="/dashboard/users" element={<Users />} />
        <Route path="/" element={<UsersHome />} />
      </Route>

      <Route path="/auth/login" element={<Login />} />
    </Routes>
  )
}
