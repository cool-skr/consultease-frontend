import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const HomePage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
            position="static" 
            sx={{ 
              backgroundColor: '#000000',
              height: '70px',
            }}
          >
            <Toolbar sx={{ justifyContent: 'space-between' }}>
              <Typography
                variant="h5"
                onClick={() => navigate('/')}
                sx={{
                  color: '#ffffff',
                  fontWeight: 500,
                  letterSpacing: '1px',
                  fontFamily: 'system-ui',
                  cursor: 'pointer',
                  '&:hover': {
                    opacity: 0.8
                  }
                }}
              >
                ConsultEase
              </Typography>

              <Button 
                color="inherit" 
                onClick={handleLogout}
                sx={{
                  textTransform: 'none',
                  fontSize: '1rem',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                  }
                }}
              >
                Logout
              </Button>
            </Toolbar>
          </AppBar>

      <Box sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to ConsultEase
        </Typography>
      </Box>
    </Box>
  );
};

export default HomePage;