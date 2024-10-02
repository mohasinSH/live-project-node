import React, { useEffect } from 'react';
import Cards from '../Components/Cards';
import Box from '@mui/material/Box';
import { Toolbar } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';

const drawerWidth = 0;

const DashBoard = () => {
  const [totalCustomer, setTotalCustomer] = useState(0);
  const [totalInvoices, setTotalInvoices] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:8000/invoices").then((res) => {
      setTotalInvoices(res.data.length);
    });

    axios.get("http://localhost:8000/users").then((res) => {
      setTotalCustomer(res.data.length);
    });
  }, []);

  return (
    <Box component="main" sx={{
      display: 'flex', // Change display to flex
      justifyContent: 'center', // Align items horizontally at the center
      gap: '20px',
      height: '250px'
    }}>
      <Cards name="DashBoard" color="red" mt='20px'/>
      <Cards name="Invoices" color="blue" length={totalInvoices} mt='20px' />
      <Cards name="Customer" color="green" length={totalCustomer} mt='20px' />
      <Cards name="Vendors" color="purple"  mt='20px'/>
    </Box>
  );
};

export default DashBoard;
