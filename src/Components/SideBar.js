import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link, Routes, Route, Outlet } from 'react-router-dom';
import CreateInvoicePage from '../Pages/CreateInvoicePage';
import ViewInvoicePage from '../Pages/ViewInvoicePage';
import ViewCustomerPage from '../Pages/ViewCustomerPage';
import ViewVendorsPage from '../Pages/ViewVendorsPage';
import DashBoard from '../Pages/DashBoard';
import ProfilePage from '../Pages/ProfilePage';
import { useLocation } from 'react-router-dom';
import ButtonAppBar from './ButtonAppBar';
import NavBar from './NavBar'
import { MdSpaceDashboard } from "react-icons/md";

function SideBar(props) {
  const [showInvoiceOptions, setShowInvoiceOptions] = useState(false);
  const location = useLocation();
  console.log(location.pathname);

  const handleInvoiceClick = () => {
    setShowInvoiceOptions(!showInvoiceOptions);
  };

  return (
    <Box sx={{}}>
    <ButtonAppBar/>
    <Box sx={{ display: 'flex',height:'850px',widht:'1478px'}}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0px', width: '400px',height:'850px',backgroundColor:'#1976d2'}}>
        <Box sx={{ height: '13vh' ,width:'100%'}}>
        <Button variant="contained" color="primary" sx={{ width: '100%', height: '100%', padding: '12px', borderRadius: '0px' ,display:'flex' ,justifyContent:'flex-start'}}>
      <Link to="/sidebar" style={{ textDecoration: 'none', color: 'inherit' }}>
        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', height: '50px', fontSize: '20px' }}>
          <MdSpaceDashboard style={{ marginRight: '8px', fontSize: '22px' }} />
          DashBoard
        </span>
      </Link>
    </Button>
        </Box>
        <Box sx={{ height: '13vh' ,width:'100%'}}>
          <Button
            variant="contained"
            color="primary"
            sx={{ width: '100%',height:'100%', padding: '12px',borderRadius:'0px' ,display:'flex' ,justifyContent:'flex-start'}}
            onClick={handleInvoiceClick}
          >
               <span style={{ display: 'flex', alignItems: 'center', height: '50px', fontSize: '20px' }}>
      <MdSpaceDashboard style={{ marginRight: '8px', fontSize: '22px' }} />
      Invoice
    </span>
          </Button>
        </Box>
        {showInvoiceOptions && (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '0px', width: '100%' }}>
            <Box sx={{ height: '13vh' ,width:'100%'}}>
              <Button variant="contained" color="primary" sx={{ width: '100%',height:'100%', padding: '12px',borderRadius:'0px' ,display:'flex' ,justifyContent:'flex-start'}}>
                <Link to="/sidebar/create-invoice" style={{ textDecoration: 'none', color: 'inherit' }}>
                <span style={{ display: 'flex', alignItems: 'center', height: '50px', fontSize: '20px' }}>
      <MdSpaceDashboard style={{ marginRight: '8px', fontSize: '22px' }} />
      Create Invoice
    </span>
                </Link>
              </Button>
            </Box>
            <Box sx={{ height: '13vh' ,width:'100%'}}>
              <Button variant="contained" color="primary" sx={{ width: '100%',height:'100%', padding: '12px',borderRadius:'0px' ,display:'flex' ,justifyContent:'flex-start'}}>
                <Link to="/sidebar/view-invoice" style={{ textDecoration: 'none', color: 'inherit' }}>
                <span style={{ display: 'flex', alignItems: 'center', height: '50px', fontSize: '20px' }}>
      <MdSpaceDashboard style={{ marginRight: '8px', fontSize: '22px' }} />
      View Invoice
    </span>
                </Link>
              </Button>
            </Box>
          </Box>
        )}
        <Box sx={{ height: '13vh' ,width:'100%'}}>
          <Button variant="contained" color="primary" sx={{ width: '100%',height:'100%', padding: '12px' ,borderRadius:'0px' ,display:'flex' ,justifyContent:'flex-start'}}>
            <Link to="/sidebar/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
            <span style={{ display: 'flex', alignItems: 'center', height: '50px', fontSize: '20px' }}>
      <MdSpaceDashboard style={{ marginRight: '8px', fontSize: '22px' }} />
      Profile
    </span>
            </Link>
          </Button>
        </Box>
        <Box sx={{ height: '13vh' ,width:'100%'}}>
          <Button variant="contained" color="primary" sx={{ width: '100%',height:'100%', padding: '12px',borderRadius:'0px' ,display:'flex' ,justifyContent:'flex-start' }}>
            <Link to="/sidebar/customer" style={{ textDecoration: 'none', color: 'inherit' }}>
            <span style={{ display: 'flex', alignItems: 'center', height: '50px', fontSize: '20px' }}>
      <MdSpaceDashboard style={{ marginRight: '8px', fontSize: '22px' }} />
      Customer
    </span>
            </Link>
          </Button>
        </Box>
        <Box sx={{ height: '13vh' ,width:'100%'}}>
          <Button variant="contained" color="primary" sx={{ width: '100%',height:'100%', padding: '12px' ,borderRadius:'0px',boxShadow:'none' ,display:'flex' ,justifyContent:'flex-start'}}>
            <Link to="/sidebar/vendor" style={{ textDecoration: 'none', color: 'inherit',border:'none' ,outline:'none',boxShadow: 'none'}}>
            <span style={{ display: 'flex', alignItems: 'center', height: '50px', fontSize: '20px' }}>
      <MdSpaceDashboard style={{ marginRight: '8px', fontSize: '22px' }} />
      Vendor
    </span>
            </Link>
          </Button>
        </Box>
      </Box>
      <Box sx={{ flex: 1, padding: '20px', maxHeight: '850px', // Set the max height
      overflowY: 'auto',width:'100%'}}>
      <NavBar/>
      <Outlet/>
        {/* <Routes> */}
          {/* <Route path="/" element={<DashBoard />} />
          <Route exact path="/create-invoice" element={<CreateInvoicePage />} />
          <Route path="view-invoice" element={<ViewInvoicePage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="customer" element={<ViewCustomerPage />} />
          <Route path="vendor" element={<ViewVendorsPage />} /> */}
        {/* </Routes> */}
      </Box>
    </Box>
    <Box sx={{height:'77px',backgroundColor:'#0f5c9c'}}></Box>
    </Box>
  );
}

export default SideBar;
