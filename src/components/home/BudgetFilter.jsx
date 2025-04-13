import React from 'react';
import { Slider, Typography, CardContent, Box } from '@mui/material';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';

const BudgetFilter = ({ projects, setFilteredProjects }) => {
    const [value, setValue] = React.useState([0, 5000000]);

    const formatValue = (value) => {
        if (value >= 5000000) return '50L+';
        if (value >= 100000) return `${(value / 100000).toFixed(1)}L`;
        if (value >= 1000) return `${(value / 1000).toFixed(1)}K`;
        return value;
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
        const filtered = projects.filter(project =>
            project.amountSanctioned >= newValue[0] && project.amountSanctioned <= newValue[1]
        );
        setFilteredProjects(filtered);
    };

    return (
        <CardContent sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                <CurrencyRupeeIcon sx={{ mr: 1, color: '#000000', fontSize: '1.2rem' }} />
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#000000' }}>
                    Budget Range
                </Typography>
            </Box>
            <Box sx={{ px: 1 }}>
                <Slider
                    value={value}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    valueLabelFormat={formatValue}
                    min={0}
                    max={5000000}
                    sx={{
                        color: '#000000',
                        height: 4,
                        '& .MuiSlider-valueLabel': {
                            backgroundColor: '#000000',
                            fontSize: '0.75rem',
                        },
                        '& .MuiSlider-thumb': {
                            width: 12,
                            height: 12,
                        }
                    }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                    <Typography variant="caption" sx={{ color: '#666666' }}>₹{formatValue(value[0])}</Typography>
                    <Typography variant="caption" sx={{ color: '#666666' }}>₹{formatValue(value[1])}</Typography>
                </Box>
            </Box>
        </CardContent>
    );
};

export default BudgetFilter;