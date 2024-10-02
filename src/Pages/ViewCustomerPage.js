import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField } from '@mui/material';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ViewCustomerPage = () => {
  const [customers, setCustomers] = useState([]);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [customerPrefix, setCustomerPrefix] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/users').then((res) => {
      console.log(res.data);
      setCustomers(res.data);
      setFilteredCustomers(res.data);
    });

    axios.get('http://localhost:8000/company').then((res) => {
      console.log(res.data[0].customer_prefix);
      setCustomerPrefix(res.data[0].customer_prefix);
    });
  }, []);

  const handleDeleteCustomer = (id) => {

    const updatedCustomers = customers.filter(customer => customer.id !== id);

    setCustomers(updatedCustomers);
    setFilteredCustomers(updatedCustomers);
    axios.delete(`http://localhost:8000/users/${id}`);
  };

  const handleEditCustomer = (id) => {

  };

  const handleSearchChange = (event) => {
    const searchValue = event.target.value;
    setSearch(searchValue);

    if (searchValue === '') {
      setFilteredCustomers(customers);
    } else {
      const filtered = customers.filter(customer =>
        customer.fname.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredCustomers(filtered);
    }
  };

  return (
    <div>
      <h1>List of Registered Customers</h1>
      <TextField
        type="text"
        placeholder="Search Customer"
        value={search}
        onChange={handleSearchChange}
        fullWidth
        margin="normal"
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>S.No</TableCell>
              <TableCell>Client No.</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>GSTIN No.</TableCell>
              <TableCell>Reference Name</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCustomers.map((customer, index) => (
              <TableRow key={customer.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{customerPrefix}{customer.id}</TableCell>
                <TableCell>{customer.fname}</TableCell>
                <TableCell>{customer.gstin}</TableCell>
                <TableCell>{customer.reference}</TableCell>
                <TableCell>
                  <Button onClick={() => handleDeleteCustomer(customer.id)} variant="contained" color="error">Delete</Button>
                 <Link to={`/customer-edit/${customer.id}`}><Button onClick={() => handleEditCustomer(customer.id)} variant="contained" color="success">Edit</Button></Link> 
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ViewCustomerPage;
