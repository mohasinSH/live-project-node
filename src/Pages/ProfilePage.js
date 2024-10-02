import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Container, Button, Grid, Typography, Box, Divider, TextField } from '@mui/material';
import axios from 'axios';

const formContainer = css`
  display: flex;
  flex-wrap: wrap;
  & .MuiTextField-root {
    margin: 8px; /* Adjust the margin as needed */
    flex: 1;
  }
`;

const FullWidthGrid = styled(Grid)`
  width: 100%;
`;

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    address: '',
    mobileNo: '',
    alternateMobileNo: '',
    landline: '',
    email: '',
    website: '',
    customerPrefix: '',
    invoicePrefix: '',
    gstinNo: '',
    panNo: '',
    bankAccount: '',
    bankName: '',
    bankIFSCCode: ''
  });
  const [currentLogo, setCurrentLogo] = useState('');

  useEffect(() => {
    axios.get("http://localhost:8000/company")
      .then((res) => {
        const data = res.data[0];
        console.log(data)
        setFormData({
          companyName: data.company_name,
          address: data.address,
          mobileNo: data.mobile_no,
          alternateMobileNo: data.alternate_mobile,
          landline: data.landline,
          email: data.email,
          website: data.website,
          customerPrefix: data.customer_prefix,
          invoicePrefix: data.invoice_prefix,
          gstinNo: data.gstin,
          panNo: data.panno,
          bankAccount: data.bank_acc,
          bankName: data.bank_name,
          bankIFSCCode: data.bank_ifsc
        });
        setCurrentLogo(data.logo);
      })
      .catch((error) => {
        console.error("Error fetching company data:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setCurrentLogo(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSubmit = {
      company_name: formData.companyName,
      address: formData.address,
      mobile_no: formData.mobileNo,
      alternate_mobile: formData.alternateMobileNo,
      landline: formData.landline,
      email: formData.email,
      website: formData.website,
      customer_prefix: formData.customerPrefix,
      invoice_prefix: formData.invoicePrefix,
      gstin: formData.gstinNo,
      panno: formData.panNo,
      bank_acc: formData.bankAccount,
      bank_name: formData.bankName,
      bank_ifsc: formData.bankIFSCCode,
      logo: currentLogo
    };

    console.log(dataToSubmit);

    axios.post("http://localhost:8000/company", dataToSubmit)
      .then((res) => {
        console.log("Data updated successfully:", res);
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };

  return (
    <Container maxWidth="md">
      <FullWidthGrid item xs={12}>
        <Divider variant="fullWidth" />
      </FullWidthGrid>
      <Typography variant="h4" component="h1" gutterBottom sx={{ marginTop: '20px', marginBottom: '60px' }}>
        Profile Page
      </Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3} css={formContainer}>
          <TextField label="Company Name" name="companyName" value={formData.companyName} onChange={handleChange} required />
          <TextField label="Address" name="address" value={formData.address} onChange={handleChange} required sm={8} />
          <TextField label="Mobile No" name="mobileNo" value={formData.mobileNo} onChange={handleChange} required />
          <TextField label="Alternate Mobile No" name="alternateMobileNo" value={formData.alternateMobileNo} onChange={handleChange} />
          <TextField label="Landline" name="landline" value={formData.landline} onChange={handleChange} />
          <TextField label="Email" name="email" value={formData.email} type="email" onChange={handleChange} required />
          <TextField label="Website" name="website" value={formData.website} onChange={handleChange} />
          <input name="currentLogo" type="file" onChange={handleFileChange} />
          <FullWidthGrid item xs={12}>
            <Divider variant="fullWidth" />
          </FullWidthGrid>
          <TextField label="Customer Prefix" name="customerPrefix" value={formData.customerPrefix} onChange={handleChange} />
          <TextField label="Invoice Prefix" name="invoicePrefix" value={formData.invoicePrefix} onChange={handleChange} />
          <TextField label="GSTIN No" name="gstinNo" value={formData.gstinNo} onChange={handleChange} required />
          <TextField label="PAN No" name="panNo" value={formData.panNo} onChange={handleChange} required />
          <TextField label="Bank Account" name="bankAccount" value={formData.bankAccount} onChange={handleChange} required />
          <TextField label="Bank Name" name="bankName" value={formData.bankName} onChange={handleChange} required />
          <TextField label="Bank IFSC Code" name="bankIFSCCode" value={formData.bankIFSCCode} onChange={handleChange} required />
          <FullWidthGrid item xs={12}>
            <Box mt={2}>
              <Button variant="contained" color="primary" fullWidth type="submit">
                Update
              </Button>
            </Box>
          </FullWidthGrid>
        </Grid>
      </form>
    </Container>
  );
};

export default ProfilePage;
