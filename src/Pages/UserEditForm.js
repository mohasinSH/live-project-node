import React, { useEffect, useState } from 'react';
import { TextField, Button, Container, Grid } from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function UserEditForm() {
  const [customerId, setCustomerId] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    mobile: '',
    reference: '',
    gstin: ''
  });

  useEffect(() => {
    console.log(id);
    setCustomerId(id);

    
    if (id && id !== '0') {
      axios.get(`http://localhost:8000/users/${id}`)
        .then(res => {
          const userData = res.data[0];
          console.log(userData[0])
          setFormData({
            fname: userData.fname,
            lname: userData.lname,
            email: userData.email,
            mobile: userData.mobile,
            reference: userData.reference,
            gstin: userData.gstin
          });
        })
        .catch(err => {
          console.error(err);
        });
        
    }
  }, []);
  useEffect(() => {
    console.log(formData);
  }, [formData]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    axios.post(`http://localhost:8000/users/${customerId}`, formData)
      .then(res => {
        console.log(res);
       
      })
      .catch(err => {
        console.error(err);
      });
    
    setFormData({
      fname: '',
      lname: '',
      email: '',
      mobile: '',
      reference: '',
      gstin: ''
    });
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField 
              fullWidth 
              label="First Name" 
              name="fname" 
              value={formData.fname} 
              onChange={handleChange} 
              required 
              
            />
          </Grid>
          <Grid item xs={6}>
            <TextField 
              fullWidth 
              label="Last Name" 
              name="lname" 
              value={formData.lname} 
              onChange={handleChange} 
              required 
              
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              fullWidth 
              label="Email" 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
             
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              fullWidth 
              label="Mobile" 
              name="mobile" 
              value={formData.mobile} 
              onChange={handleChange} 
              required 
            
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              fullWidth 
              label="Reference" 
              name="reference" 
              value={formData.reference} 
              onChange={handleChange} 
              required 
              
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              fullWidth 
              label="GSTIN" 
              name="gstin" 
              value={formData.gstin} 
              onChange={handleChange} 
              required 
              
            />
          </Grid>
          <Grid item xs={12}>
            <Button 
              variant="contained" 
              color="primary" 
              type="submit" 
              
            >
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default UserEditForm;
