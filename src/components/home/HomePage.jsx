import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Grid, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ProjectCard from './ProjectCard';

const HomePage = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const handleLogout = async (e) => {
    e.preventDefault();
    logout();
    navigate('/login'); 
  }
  const projects = [
    {
      id: 1,
      title: 'AI Healthcare Solutions',
      industry: 'Healthcare',
      duration: '12 months',
      academicYear: '2023-24',
      pi: 'Dr. Sarah Johnson',
      summary: 'Development of AI-powered diagnostic tools for early disease detection in rural areas...',
      amountSanctioned: '₹15,00,000'
    },
  ];

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
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
      
      <Box sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 500 }}>
            Research Projects
          </Typography>
          <Fab 
            color="primary" 
            aria-label="add project"
            onClick={() => navigate('/project/new')}
            sx={{
              backgroundColor: '#000000',
              '&:hover': {
                backgroundColor: '#333333'
              }
            }}
          >
            <AddIcon />
          </Fab>
        </Box>

        <Grid container spacing={3}>
          {projects.map((project) => (
            <Grid item xs={12} sm={6} md={4} key={project.id}>
              <ProjectCard project={project} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default HomePage;