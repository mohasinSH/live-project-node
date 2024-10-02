import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
const image = require('./cityscape-anime-inspired-urban-area.jpg')
const Cards = ({ name, color, length = 2, ml = '0px', mr = '0px', mt = '0px' }) => {
  return (
    <Card
      sx={{ 
        position: 'relative', // Set position to relative
        maxWidth: 500, 
        width: '400px',
        backgroundColor: color, 
        ml: ml, 
        mr: mr, 
        mt: mt, 
        color: 'whitesmoke',
        overflow: 'visible', // Allow content to overflow the card
        '&:hover': {
          transform: 'scale(1.05)',
          transition: 'transform 0.3s ease-in-out',
        }
      }}
    >
      <CardMedia
        sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        image={image}
        title="green iguana"
      />
      {/* Position the CardContent above the CardMedia */}
      <CardContent
        sx={{
          position: 'relative', // Set position to relative
          zIndex: 1, // Set a higher z-index to appear above the CardMedia
          backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent background color
          padding: '20px', // Adjust padding as needed
        }}
      >
        <Typography gutterBottom variant="h5" component="div" sx={{ color: 'whitesmoke' }}>
          {name}
        </Typography>
        {name !== "DashBoard" && (
          <Typography variant="body2" sx={{ color: 'whitesmoke' }}>
            Total {name} are {length}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default Cards;
