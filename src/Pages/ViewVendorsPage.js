import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button,TextField } from '@mui/material';

const ViewVendorsPage = () => {
  const [customers, setCustomers] = useState([
    { id: 1, clientNo: 'C001', customerName: 'John', gstinNo: 'GST123', referenceName: 'Jane',adress:'Angan Ward' },
    { id: 2, clientNo: 'C002', customerName: 'Alice', gstinNo: 'GST456', referenceName: 'Bob', adress:'chapru Nagar' },

  ]);

  const handleDeleteCustomer = (id) => {

    const updatedCustomers = customers.filter(customer => customer.id !== id);
    
    setCustomers(updatedCustomers);
  };

  return (
    <div>
      <h1>List of Registered Vendors</h1>
      <TextField
        type="text"
        placeholder="Search Customer"
       
        fullWidth
        margin="normal"
      />
      <TableContainer component={Paper} >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell>Vendor Name</TableCell>
              <TableCell>GSTIN NO.</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Adress</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer, index) => (
              <TableRow key={customer.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{customer.clientNo}</TableCell>
                <TableCell>{customer.gstinNo}</TableCell>
                <TableCell>{customer.customerName}</TableCell>
                <TableCell>{customer.referenceName}</TableCell>
                <TableCell>{customer.adress}</TableCell>
                <TableCell>
                  <Button onClick={() => handleDeleteCustomer(customer.id)} variant="contained" color="error">Delete</Button>
                  <Button onClick={() => handleDeleteCustomer(customer.id)} variant="contained" color="success">Edit</Button>
 
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ViewVendorsPage;
