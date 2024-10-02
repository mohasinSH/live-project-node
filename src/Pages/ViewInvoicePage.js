import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import ImageIcon from '@mui/icons-material/Image';
import Paper from '@mui/material/Paper';

const ViewInvoicePage = () => {
  const [companyData, setCompanyData] = useState([]);
  const [invoiceprefix, setInvoicePrefix] = useState('');
  const [customerprefix, setCustomerPrefix] = useState(''); 

  useEffect(() => {
    axios.get("http://localhost:8000/invoices").then((res) => {
      setCompanyData(res.data);
    });
    axios.get("http://localhost:8000/company").then((res) => {
      setInvoicePrefix(res.data[0].invoice_prefix);
      setCustomerPrefix(res.data[0].customer_prefix);
    });
  }, []);

  return (
    <Box sx={{ maxWidth: '1200px', margin: 'auto', padding: '20px' }}>
      <Paper elevation={3} sx={{ padding: '0px', marginBottom: '0px' ,height:'30px',borderRadius:'5px 5px 0px 0px'}}>
        <Typography  sx={{ fontFamily: 'Roboto, sans-serif' }}>
          List of Invoices
        </Typography>
      </Paper>
      <TableContainer sx={{ maxHeight: '650px', overflowY: 'auto' }}>
        <Table sx={{ minWidth: 650, border: '1px solid #e0e0e0' }}>
          <TableHead sx={{ backgroundColor: '#f5f5f5', fontFamily: 'Roboto, sans-serif', fontWeight: 'bold', borderTopLeftRadius: '8px', borderTopRightRadius: '8px' }}>
            <TableRow sx={{ backgroundColor: '#e0e0e0' }}>
              <TableCell>S.no</TableCell>
              <TableCell>Invoice No</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Reference Name</TableCell>
              <TableCell>Action List</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {companyData.map((invoice, index) => (
              <TableRow 
                key={invoice.invoiceNo} 
                sx={{ 
                  '&:last-child td, &:last-child th': { border: 0 }, 
                  backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'white'
                }}
              >
                <TableCell>{invoice.id}</TableCell>
                <TableCell>{`${invoiceprefix}${invoice.id}`}</TableCell>
                <TableCell>{invoice.created_at.split("T")[0]}</TableCell>
                <TableCell>{invoice.pending_amount}</TableCell>
                <TableCell 
                  sx={{ 
                    color: invoice.pending_amount > 0 ? 'red' : 'green', 
                    fontWeight: 'bold',
                    fontFamily: 'Roboto, sans-serif'
                  }}
                >
                  {invoice.pending_amount > 0 ? 'Pending' : 'Paid'}
                </TableCell>
                <TableCell>{invoice.contact}</TableCell>
                <TableCell>{`${customerprefix}${invoice.customer_id}`}</TableCell>
                <TableCell>{invoice.referenceName}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" startIcon={<ImageIcon />}>
                    View Image
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ViewInvoicePage;
