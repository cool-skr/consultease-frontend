import React from 'react';
import { Box, Card, CardContent, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';
import BudgetFilter from './BudgetFilter';

const Filters = ({ projects, setFilteredProjects }) => {
    const [status, setStatus] = React.useState('all');

    const handleStatusChange = (event, newStatus) => {
        if (newStatus !== null) {
            setStatus(newStatus);
            let filtered = projects;
            if (newStatus !== 'all') {
                filtered = projects.filter(project =>
                    project.completed === newStatus);
            }
            setFilteredProjects(filtered);
        }
    };

    return (
        <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
            <Card sx={{ flex: 1, maxWidth: 300, backgroundColor: '#ffffff', borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <BudgetFilter projects={projects} setFilteredProjects={setFilteredProjects} />
            </Card>
            <Card sx={{ flex: 1, maxWidth: 300, backgroundColor: '#ffffff', borderRadius: 3, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
                <CardContent sx={{ p: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#000000', mb: 1.5 }}>
                        Project Status
                    </Typography>
                    <ToggleButtonGroup
                        value={status}
                        exclusive
                        onChange={handleStatusChange}
                        size="small"
                        sx={{ width: '100%' }}
                    >
                        <ToggleButton
                            value="all"
                            sx={{
                                flex: 1,
                                textTransform: 'uppercase',
                                '&.Mui-selected': {
                                    backgroundColor: '#000000',
                                    color: '#ffffff',
                                    '&:hover': {
                                        backgroundColor: '#000000',
                                        color: '#ffffff',
                                    },
                                },
                            }}
                        >
                            All
                        </ToggleButton>
                        <ToggleButton
                            value="no"
                            sx={{
                                flex: 1,
                                textTransform: 'uppercase',
                                '&.Mui-selected': {
                                    backgroundColor: '#000000',
                                    color: '#ffffff',
                                    '&:hover': {
                                        backgroundColor: '#000000',
                                        color: '#ffffff',
                                    },
                                },
                            }}
                        >
                            Ongoing
                        </ToggleButton>
                        <ToggleButton
                            value="yes"
                            sx={{
                                flex: 1,
                                textTransform: 'uppercase',
                                '&.Mui-selected': {
                                    backgroundColor: '#000000',
                                    color: '#ffffff',
                                    '&:hover': {
                                        backgroundColor: '#000000',
                                        color: '#ffffff',
                                    },
                                },
                            }}
                        >
                            Completed
                        </ToggleButton>

                    </ToggleButtonGroup>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Filters;