import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Grid, Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ProjectCard from './ProjectCard';
import axios from 'axios';
import SearchBar from './SearchBar';
import Loading from '../common/Loading';
// Replace BudgetFilter import with:
import Filters from './Filters';

const HomePage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const userEmail = localStorage.getItem('email');
        const endpoint = (localStorage.getItem('admin') === 'true') 
          ? 'http://localhost:5000/project/admin/fetch' 
          : `http://localhost:5000/project/fetch/${userEmail}`;
        
        const response = await axios.get(endpoint);
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);
  useEffect(() => {
    setFilteredProjects(projects);
  }, [projects]);
  const handleLogout = async (e) => {
    e.preventDefault();
    logout();
    navigate('/login'); 
  }
  
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
                  '&:hover': { opacity: 0.8 }
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
                  '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
                }}
              >
                Logout
              </Button>
            </Toolbar>
          </AppBar>

      <Box sx={{ p: 4 }}>
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          mb: 4,
          gap: 3
        }}>
          <Typography variant="h4" sx={{ fontWeight: 600, whiteSpace: 'nowrap' }}>
            Research Projects
          </Typography>
          <Box sx={{ flexGrow: 1, maxWidth: '500px' }}>
            <SearchBar 
              projects={projects} 
              setProjects={setFilteredProjects} 
            />
          </Box>
        </Box>

        <Filters projects={projects} setFilteredProjects={setFilteredProjects} />

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}>
            <Loading />
          </Box>
        ) : (
          <>
            <Grid container spacing={3}>
              {filteredProjects.map((project) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={project.id}>
                  <ProjectCard project={project} />
                </Grid>
              ))}
            </Grid>
            <Fab 
              color="primary" 
              aria-label="add project"
              onClick={() => navigate('/project/new')}
              sx={{
                position: 'fixed',
                bottom: 32,
                right: 32,
                backgroundColor: '#000000',
                '&:hover': { backgroundColor: '#333333' }
              }}
            >
              <AddIcon />
            </Fab>
          </>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;