import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { Box, Typography, Grid, Chip, LinearProgress, Paper, Button, IconButton } from '@mui/material';
import axios from 'axios';
import { message } from 'antd';
import DownloadIcon from '@mui/icons-material/Download';
import EditIcon from '@mui/icons-material/Edit';
import Loading from '../common/Loading';
const ProjectPage = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/project/fetch/project/${projectId}`);
        setProject(response.data);
      } catch (error) {
        console.error('Error fetching project:', error);
        message.error('Failed to load project details');
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [projectId]);
  useEffect(() => {
    if (project) {
        setProgress((project.amountReceived / project.amountSanctioned) * 100);
      }; 
    },[project])
  
  return (
    loading ? (
      <Box sx={{ p: 40, display: 'flex', justifyContent: 'center' }}>
        <Loading />
      </Box>
    ) : !project ? (
      <Box sx={{ p: 4, display: 'flex', justifyContent: 'center' }}>
        <Typography variant="h5" color="error">Project not found</Typography>
      </Box>
    ) : (
      <Box sx={{ 
        p: { xs: 2, md: 4 }, 
        maxWidth: 1200, 
        margin: '0 auto',
        backgroundColor: '#f8f9fa',
        minHeight: '100vh'
      }}>
        <Paper 
          elevation={3} 
          sx={{ 
            p: { xs: 2, md: 4 }, 
            borderRadius: 3,
            background: 'linear-gradient(to bottom, #ffffff, #fafafa)',
            border: '1px solid #eaeaea',
            position: 'relative'  // Added for absolute positioning of edit button
          }}
        >
          <IconButton 
            onClick={() => navigate(`/project/edit/${project.projectId}`)}
            sx={{
              position: 'absolute',
              top: 20,
              right: 20,
              backgroundColor: '#1a237e',
              color: 'white',
              '&:hover': {
                backgroundColor: '#0d47a1'
              }
            }}
          >
            <EditIcon />
          </IconButton>
          <Box sx={{ mb: 5 }}>
            <Chip 
              label={project.completed === 'yes' ? 'Completed' : 'Ongoing'} 
              color={project.completed === 'yes' ? 'success' : 'primary'}
              sx={{ 
                mb: 2,
                px: 2,
                py: 1,
                fontSize: '1rem',
                fontWeight: 500,
                borderRadius: '8px'
              }}
            />
            <Typography 
              variant="h3" 
              sx={{ 
                mb: 2, 
                fontWeight: 700,
                background: 'linear-gradient(45deg, #1a237e, #0d47a1)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent'
              }}
            >
              {project.projectTitle}
            </Typography>
            <Typography 
              variant="h6" 
              sx={{ 
                color: 'text.secondary',
                fontWeight: 500
              }}
            >
              {project.industryName}
            </Typography>
          </Box>

          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Paper 
                elevation={1} 
                sx={{ 
                  p: 3, 
                  borderRadius: 2,
                  height: '100%',
                  border: '1px solid #eaeaea'
                }}
              >
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: '#1a237e' }}>
                  Project Details
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">Principal Investigator</Typography>
                    <Typography>{project.principalInvestigator}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">Co-Principal Investigator</Typography>
                    <Typography>{project.coPrincipalInvestigator}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">Duration</Typography>
                    <Typography>{project.projectDuration}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">Academic Year</Typography>
                    <Typography>{project.academicYear}</Typography>
                  </Box>
                </Box>
              </Paper>
            </Grid>
  
            <Grid item xs={12} md={6}>
              <Paper 
                elevation={1} 
                sx={{ 
                  p: 3, 
                  borderRadius: 2,
                  height: '100%',
                  border: '1px solid #eaeaea'
                }}
              >
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: '#1a237e' }}>
                  Financial Details
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">Amount Sanctioned</Typography>
                    <Typography>₹ {project.amountSanctioned}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">Amount Received</Typography>
                    <Typography>₹ {project.amountReceived}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">Progress</Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={progress > 100 ? 100 : progress}
                      sx={{ 
                        height: 12, 
                        borderRadius: 6,
                        mt: 2,
                        backgroundColor: 'rgba(0,0,0,0.05)',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: progress >= 100 ? '#2e7d32' : '#1565c0',
                          borderRadius: 6
                        }
                      }}
                    />
                  </Box>
                </Box>
              </Paper>
            </Grid>
  
            <Grid item xs={12}>
              <Paper 
                elevation={1} 
                sx={{ 
                  p: 3, 
                  borderRadius: 2,
                  border: '1px solid #eaeaea'
                }}
              >
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: '#1a237e' }}>
                  Project Summary
                </Typography>
                <Typography sx={{ lineHeight: 1.8 }}>{project.projectSummary}</Typography>
              </Paper>
            </Grid>
  
            <Grid item xs={12}>
              <Paper 
                elevation={1} 
                sx={{ 
                  p: 3, 
                  borderRadius: 2,
                  border: '1px solid #eaeaea',
                  mt: 4  
                }}
              >
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: '#1a237e' }}>
                  Documents
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  gap: 3,
                  flexWrap: 'wrap'  
                }}>
                  {project.billSettlement?.split(',').map((link, index) => (
                    <Button 
                      key={`bill-${index}`}
                      variant="outlined" 
                      startIcon={<DownloadIcon />}
                      href={link.trim()}
                      target="_blank"
                      sx={{
                        borderColor: '#1a237e',
                        color: '#1a237e',
                        px: 4,
                        py: 1.5,
                        borderRadius: 2,
                        '&:hover': {
                          backgroundColor: 'rgba(26, 35, 126, 0.04)',
                          borderColor: '#1a237e'
                        }
                      }}
                    >
                      Bill Settlement {index + 1}
                    </Button>
                  ))}
                  {project.agreement?.split(',').map((link, index) => (
                    <Button 
                      key={`agreement-${index}`}
                      variant="outlined" 
                      startIcon={<DownloadIcon />}
                      href={link.trim()}
                      target="_blank"
                      sx={{
                        borderColor: '#1a237e',
                        color: '#1a237e',
                        px: 4,
                        py: 1.5,
                        borderRadius: 2,
                        '&:hover': {
                          backgroundColor: 'rgba(26, 35, 126, 0.04)',
                          borderColor: '#1a237e'
                        }
                      }}
                    >
                      Agreement {index + 1}
                    </Button>
                  ))}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    )
  );
};

export default ProjectPage;