import React from 'react';
import { TextField, Grid, Typography } from '@mui/material';

const CustomInput = ({ label, placeholder, type = 'text', required = false, size = 'small' ,sm=4}) => {
  return (
    <Grid item xs={12} sm={sm}>
      <Typography variant="subtitle1">{label}</Typography>
      <TextField
        fullWidth
        placeholder={placeholder}
        type={type}
        variant="outlined"
        size={size}
        required={required}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </Grid>
  );
};

export default CustomInput;
