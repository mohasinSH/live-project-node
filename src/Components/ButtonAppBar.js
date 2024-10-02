import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { FaBuilding } from "react-icons/fa";
// import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{backgroundColor:'#0f5c9c'}}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <FaBuilding/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Radha Vilas
          </Typography>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}> <Button
      color="inherit" 
      sx={{ backgroundColor: 'blue', '&:hover': { backgroundColor: 'darkblue' } }}
    >
      LogOut
    </Button></Link>
         
        </Toolbar>
      </AppBar>
    </Box>
  );
}
