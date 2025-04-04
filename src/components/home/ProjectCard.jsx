import React from 'react';
import { Card, CardContent, Typography, Grid, Chip, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  const navigate = useNavigate();

  return (
    <Card 
      onClick={() => navigate(`/project/${project.id}`)}
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
            label={project.industry} 
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
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 600,
              fontSize: '1.2rem',
              lineHeight: 1.3,
              color: '#1a1a1a'
            }}
          >
            {project.title}
          </Typography>
        </Box>
        
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
          <span style={{ fontWeight: 600 }}>PI:</span> {project.pi}
        </Typography>
        
        <Grid container spacing={2.5} sx={{ mb: 2.5 }}>
          <Grid item xs={6}>
            <Typography variant="caption" sx={{ color: '#666666', fontWeight: 500 }}>
              Duration
            </Typography>
            <Typography variant="body2" sx={{ color: '#1a1a1a', fontWeight: 500 }}>
              {project.duration}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption" sx={{ color: '#666666', fontWeight: 500 }}>
              Amount
            </Typography>
            <Typography variant="body2" sx={{ color: '#1a1a1a', fontWeight: 500 }}>
              {project.amountSanctioned}
            </Typography>
          </Grid>
        </Grid>

        <Typography 
          variant="body2" 
          sx={{ 
            color: '#666666',
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
            lineHeight: 1.5,
            borderTop: '1px solid #f0f0f0',
            pt: 2
          }}
        >
          {project.summary}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;