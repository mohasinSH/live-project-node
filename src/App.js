import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import LoginPage from "./Pages/LoginPage";
import SignUp from "./Pages/SignUp";
import UserEditForm from "./Pages/UserEditForm";
import DashBoard from "./Pages/DashBoard";
import CreateInvoicePage from "./Pages/CreateInvoicePage";
import ViewInvoicePage from "./Pages/ViewInvoicePage";
import ViewCustomerPage from "./Pages/ViewCustomerPage";
import ProfilePage from "./Pages/ProfilePage";
import ViewVendorsPage from "./Pages/ViewVendorsPage";
import SideBar from "./Components/SideBar";
import ProtectedRoute from './Utils/ProtectedRoute';

function App() {
  return (
    <div className="App">
     
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/customer-edit/:id" element={<UserEditForm />} />

          {/* Protected Routes */}
          <Route path="/sidebar" element={<ProtectedRoute />}>
            <Route path="" element={<SideBar />}>
              <Route path="" element={<DashBoard />} />
              <Route path="create-invoice" element={<CreateInvoicePage />} />
              <Route path="view-invoice" element={<ViewInvoicePage />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="customer" element={<ViewCustomerPage />} />
              <Route path="vendor" element={<ViewVendorsPage />} />
            </Route>
          </Route>

          {/* Redirect for any unmatched route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    </div>
  );
}

export default App;
