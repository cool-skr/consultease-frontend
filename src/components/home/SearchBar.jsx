import React from 'react';
import { TextField } from '@mui/material';

const SearchBar = ({ projects, setProjects }) => {
    const handleSearch = (e) => {
        const searchTerm = e.target.value.toLowerCase();
        if (searchTerm === '') {
            setProjects(originalProjects => originalProjects);
            return;
        }
        const filtered = projects.filter(project =>
            project.projectTitle.toLowerCase().includes(searchTerm) ||
            project.industryName.toLowerCase().includes(searchTerm) ||
            project.principalInvestigator.toLowerCase().includes(searchTerm)
        );
        setProjects(filtered);
    };

    return (
        <TextField
            fullWidth
            variant="outlined"
            placeholder="Search projects..."
            onChange={handleSearch}
            sx={{ mb: 0, maxWidth: "600px" }}
        />
    );
};

export default SearchBar;