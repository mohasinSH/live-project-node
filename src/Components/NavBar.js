import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Button } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { MdHome } from 'react-icons/md';
import '@fontsource/roboto'; 
import { useNavigate } from 'react-router-dom';
const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const pathSegments = location.pathname.split('/').filter(Boolean);
  const showButton = pathSegments.includes('create-invoice'); // Check if 'view-invoices' is in the pathSegments
  const handleChange = ()=>{
      navigate('/customer-edit/0')
  }
  return (
    <AppBar position="static" sx={{ backgroundColor: '#d3d3d3' }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="home" sx={{ mr: 2 }}>
          <MdHome size={24} style={{ color: 'black' }} />
        </IconButton>
        <Box sx={{ flexGrow: 0 }} />
        <Typography 
          variant="h6" 
          sx={{ 
            color: 'black', 
            fontWeight: 'bold', 
            fontFamily: 'Roboto, sans-serif',
            display: 'inline'
          }}
        >
        
        </Typography>
        <Box sx={{ display: 'inline', ml: 1 }}>
          {pathSegments.map((segment, index) => (
            <Typography 
              key={index}
              variant="h6" 
              sx={{ 
                color: 'black', 
                fontWeight: 'bold', 
                fontFamily: 'Roboto, sans-serif',
                display: 'inline',
                ml: index === 0 ? 0 : 1 // Add margin to all but the first segment
              }}
            >
              /{segment}/
            </Typography>
          ))}
          {showButton && ( // Conditionally render the Button only if path contains 'view-invoices'
           <Button 
              variant="contained" 
              onClick={handleChange}
              sx={{ 
                ml: 1, 
                backgroundColor: 'blue', 
                color: 'white', 
                textTransform: 'none',
                fontFamily: 'Roboto, sans-serif' 
              }}
            >
              Add Customer
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
