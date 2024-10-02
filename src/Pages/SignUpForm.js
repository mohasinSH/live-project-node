import React, { useState } from 'react';
import { TextField, Button, Container, Grid } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function SignUpForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
    mobile: '',
    user_role: '',
    reference: '',
    gstin: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    const res =axios.post("http://localhost:8000/users",formData);
    console.log(res)
    
    setFormData({
      fname: '',
      lname: '',
      email: '',
      password: '',
      mobile: '',
      user_role: '',
      reference: '',
      gstin: ''
    });
    navigate('/')
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField fullWidth label="First Name" name="fname" value={formData.fname} onChange={handleChange} required />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Last Name" name="lname" value={formData.lname} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Email" type="email" name="email" value={formData.email} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Password" type="password" name="password" value={formData.password} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Mobile" name="mobile" value={formData.mobile} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="User Role" name="user_role" value={formData.user_role} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Reference" name="reference" value={formData.reference} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="GSTIN" name="gstin" value={formData.gstin} onChange={handleChange} required />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" type="submit">Sign Up</Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default SignUpForm;
