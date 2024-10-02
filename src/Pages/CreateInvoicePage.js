import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';
import axios from 'axios';

const CreateInvoicePage = () => {
  const [rows, setRows] = useState([{ id: 1, unit: '', unitPrice: '', total: 0 }]);
  const [customerNamelist, setCustomerNamelist] = useState([]);
  const [invoiceIdcounter,setinvoiceIdcounter] = useState(0);
  const [companyName,setcompanyName] = useState();
  const [gstinNo,setgstinNo] = useState(0);
  const [formData, setFormData] = useState({
    customerName: '',
    selectedDate: '',
    description:'',
    invoiceID:'RV/',
    unit:'',
    unitPrice:'',
    total:'',
    discount: '',
    paymentOption: '',
    amountReceived: '',
    pendingamount: 200000
  });

  const { customerName, selectedDate,description, discount, paymentOption, amountReceived,pendingamount ,invoiceID} = formData;
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [pending,setPending] = useState();
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/users');
        setCustomerNamelist(response.data);
        axios.get(`http://localhost:8000/invoices/${customerName}`).then((res)=>{

          console.log(res)
          setPending(parseFloat(res.data[0].pending_amount))
          
        })
        axios.get('http://localhost:8000/company').then((res)=>{
          console.log(res);
          setcompanyName(res.data[0].company_name)
          setgstinNo(res.data[0].gstin)
        })
      } catch (error) {
        console.error('There was an error fetching the customer data!', error);
      }
    };

    fetchCustomers();
  }, [customerName]);

  useEffect(() => {
    const newSubtotal = rows.reduce((acc, row) => acc + row.total, 0);
    const discountedSubtotal = newSubtotal - (parseFloat(discount) || 0);
    const newTotal = discountedSubtotal - (parseFloat(amountReceived) || 0);
    console.log(newTotal)
   
    setSubtotal(discountedSubtotal);
    setTotal(newTotal);
  }, [rows, discount, amountReceived]);
   

  const addRow = () => {
    setRows((prevRows) => [...prevRows, { id: prevRows.length + 1, unit: '', unitPrice: '', total: 0 }]);
  };

  const deleteRow = (id) => {
    setRows((prevRows) => prevRows.filter((row) => row.id !== id));
  };

  const handleUnitChange = (id, unit) => {
    const newRows = rows.map((row) => {
      if (row.id === id) {
        const total = parseInt(unit) * parseFloat(row.unitPrice || 0);
        return { ...row, unit, total };
      }
      return row;
    });
    setRows(newRows);
  };

  const handleUnitPriceChange = (id, unitPrice) => {
    const newRows = rows.map((row) => {
      if (row.id === id) {
        const total = parseFloat(unitPrice) * parseFloat(row.unit || 0);
        return { ...row, unitPrice, total };
      }
      return row;
    });
    setRows(newRows);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const invoiceid = invoiceID+`${invoiceIdcounter+1}`
    setinvoiceIdcounter(invoiceIdcounter+1);
    setPending(pending+total)
    const pending_amt = pending+total
    const invoiceData = {
      customerName,
      selectedDate,
      description,
      invoiceIdcounter,
      discount,
      paymentOption,
      amountReceived,
      rows,
      subtotal,
      total,
      pending_amt
    };
    console.log('Submitting Invoice Data:', invoiceData);
    const res =axios.post(`http://localhost:8000/invoices`,invoiceData);

    console.log(res);
  };

  return (
    <Box sx={{ maxWidth: '800px', margin: 'auto', padding: '20px' }}>
      <Box sx={{ marginBottom: '20px' }}>
        <Typography variant="h6">Company Name: {companyName}</Typography>
        <Typography variant="body1">Company GSTin No: {gstinNo}</Typography>
      </Box>

      <form onSubmit={handleSubmit}>
        <Box sx={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
          <TextField
            select
            label="Select Customer"
            variant="outlined"
            fullWidth
            name="customerName"
            value={customerName}
            onChange={handleChange}
          >
            {customerNamelist.length
              ? customerNamelist.map((value) => (
                  <MenuItem key={value.id} value={value.id}>
                    {value.fname}
                  </MenuItem>
                ))
              : null}
          </TextField>
          <TextField
            type="date"
            label="Date"
            variant="outlined"
            fullWidth
            name="selectedDate"
            value={selectedDate}
            onChange={handleChange}
          />
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>Unit</TableCell>
                <TableCell>Unit Price</TableCell>
                <TableCell>Total</TableCell>
                <TableCell></TableCell> 
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <TextField variant="outlined" fullWidth   name="description" 
            value={description}
            onChange={handleChange}/>
                  </TableCell>
                  <TableCell>
                    <TextField
                      variant="outlined"
                      fullWidth
                      value={row.unit}
                      onChange={(e) => handleUnitChange(row.id, e.target.value)}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      variant="outlined"
                      fullWidth
                      value={row.unitPrice}
                      onChange={(e) => handleUnitPriceChange(row.id, e.target.value)}
                    />
                  </TableCell>
                  <TableCell>{row.total}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => deleteRow(row.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        
        <Box sx={{ marginTop: '20px', marginBottom: '20px' }}>
          <Button variant="contained" color="success" onClick={addRow}>
            Add Row
          </Button>
        </Box>

        
        <Box sx={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
          <TextField
            label="Discount"
            variant="outlined"
            fullWidth
            name="discount"
            value={discount}
            onChange={handleChange}
          />
          <TextField
            select
            label="Payment Option"
            variant="outlined"
            fullWidth
            name="paymentOption"
            value={paymentOption}
            onChange={handleChange}
          >
            <MenuItem value="cash">Cash</MenuItem>
            <MenuItem value="credit">Credit</MenuItem>
            <MenuItem value="debit">Debit</MenuItem>
          </TextField>
          <TextField
            label="Amount Received"
            variant="outlined"
            fullWidth
            name="amountReceived"
            value={amountReceived}
            onChange={handleChange}
          />
        </Box>

        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <Typography variant="h6">Subtotal: {subtotal}</Typography>
        </Box>

       
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <Typography variant="h6">Total: {total}</Typography>
        </Box>

        
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button type="submit" variant="contained" color="success">
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default CreateInvoicePage;
