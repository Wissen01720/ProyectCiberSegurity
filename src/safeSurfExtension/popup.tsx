import ReactDOM from 'react-dom';
import { Button, Typography, Box } from '@mui/material';

const Popup = () => {
  const handleButtonClick = () => {
    alert("Explora nuestras guías para mantenerte seguro en línea.");
  };

  return (
    <Box p={2} width={300}>
      <Typography variant="h5" gutterBottom>
        SafeSurf
      </Typography>
      <Typography variant="body1">
        Protégete mientras navegas. Haz clic abajo para obtener más información sobre prácticas seguras.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleButtonClick}
        style={{ marginTop: '10px' }}
      >
        Aprende más
      </Button>
    </Box>
  );
};

ReactDOM.render(<Popup />, document.getElementById('root'));
