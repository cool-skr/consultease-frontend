import React from 'react';
import { Card, CardContent, Typography, Grid, Chip, Box, LinearProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Button from '@mui/material/Button';
import axios from 'axios';
import { message } from 'antd';
import DeleteIcon from '@mui/icons-material/Delete'; 
import Loading from '../common/Loading';
const ProjectCard = ({ project }) => {
  const navigate = useNavigate();
  const progress = (project.amountReceived / project.amountSanctioned) * 100;
  const [loading, setLoading] = React.useState(false);
  const handleMarkCompleted = async (e) => {
    e.stopPropagation();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('completed', 'yes');
      
      await axios.put(`http://localhost:5000/project/update/${project.projectId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      message.success('Project marked as completed successfully!');
      window.location.reload(); 
    } catch (error) {
      console.error('Error updating project:', error);
      message.error('Failed to mark project as completed');
    }
  };

  const handleDeleteProject = async (e) => {
    
    e.stopPropagation();
    try {
      await axios.delete(`http://localhost:5000/project/delete/${project.projectId}`);
      message.success('Project deleted successfully!');
      window.location.reload(); 
    } catch (error) {
      console.error('Error deleting project:', error);
      message.error('Failed to delete project');
    }
  };
  if(loading){
    return <Loading />;
  }
  return (
    <Card 
      onClick={() => navigate(`/project/${project.projectId}`)}
      sx={{ 
        height: '100%',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
          '&::before': {
            opacity: 1
          }
        },
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '4px',
          background: 'linear-gradient(90deg, #000000, #333333)',
          opacity: 0,
          transition: 'opacity 0.3s ease'
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ mb: 2.5 }}>
          <Chip 
            label={project.principalInvestigator} 
            size="small" 
            sx={{ 
              backgroundColor: '#000000',
              color: 'white',
              mb: 1.5,
              borderRadius: '6px',
              fontWeight: 500,
              px: 1.5
            }} 
          />
        </Box>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 600,
            fontSize: '1.2rem',
            lineHeight: 1.3,
            color: '#1a1a1a'
          }}
        >
          {project.projectTitle}
        </Typography>
        
        <Typography 
          variant="body2" 
          sx={{ 
            mb: 2.5,
            color: '#666666',
            display: 'flex',
            alignItems: 'center',
            gap: 0.5
          }}
        >
          <span style={{ fontWeight: 600 }}>Industry:</span> {project.industryName}
        </Typography>
        
        <Grid container spacing={2.5} sx={{ mb: 2.5 }}>
          <Grid item xs={6}>
            <Typography variant="caption" sx={{ color: '#666666', fontWeight: 500 }}>
              Duration
            </Typography>
            <Typography variant="body2" sx={{ color: '#1a1a1a', fontWeight: 500 }}>
              {project.projectDuration}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" sx={{ color: '#666666', fontWeight: 500 }}>
              Progress
            </Typography>
            <LinearProgress 
              variant="determinate" 
              value={progress > 100 ? 100 : progress} 
              sx={{ 
                height: 8,
                borderRadius: 5,
                mt: 0.5,
                backgroundColor: '#f0f0f0',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: progress >= 100 ? '#4caf50' : '#000000'
                }
              }}
            />
          </Grid>
        </Grid>

        {project.completed === 'yes' ? (
          <Box sx={{ 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 1,
            color: '#4caf50',
            mt: 2,
            pt: 2,
            borderTop: '1px solid #f0f0f0'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CheckCircleIcon fontSize="small" />
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                Completed
              </Typography>
            </Box>
            <DeleteIcon 
              onClick={handleDeleteProject} 
              sx={{ 
                cursor: 'pointer', 
                color: '#f44336', 
                '&:hover': { color: '#d32f2f' }
              }} 
            />
          </Box>
        ) : (
          <Box sx={{ 
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            mt: 2,
            pt: 2,
            borderTop: '1px solid #f0f0f0'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#64b5f6' }}>
                <CheckCircleIcon fontSize="small" />
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  Ongoing
                </Typography>
              </Box>
              <DeleteIcon 
                onClick={handleDeleteProject} 
                sx={{ 
                  cursor: 'pointer', 
                  color: '#f44336', 
                  '&:hover': { color: '#d32f2f' }
                }} 
              />
            </Box>
            <Button 
              variant="outlined" 
              size="small" 
              onClick={handleMarkCompleted}
              sx={{ 
                mt: 1,
                alignSelf: 'flex-start',
                color: '#4caf50',
                borderColor: '#4caf50',
                '&:hover': {
                  backgroundColor: 'rgba(76, 175, 80, 0.04)',
                  borderColor: '#4caf50'
                }
              }}
            >
              Mark Completed
            </Button>
          </Box>
        )}

      </CardContent>
    </Card>
  );
};

export default ProjectCard;