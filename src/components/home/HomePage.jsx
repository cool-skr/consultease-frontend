import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Grid,
  Fab,
  Popover,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import Divider from "@mui/material/Divider";

import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ProjectCard from "./ProjectCard";
import axios from "axios";
import SearchBar from "./SearchBar";
import Loading from "../common/Loading";
import Filters from "./Filters";
import { BarChart, PieChart } from "@mui/x-charts";

const HomePage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const userEmail = localStorage.getItem("email");
        const endpoint =
          localStorage.getItem("admin") === "true"
            ? "http://localhost:5000/project/admin/fetch"
            : `http://localhost:5000/project/fetch/${userEmail}`;

        const response = await axios.get(endpoint);
        setProjects(response.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
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
    navigate("/login");
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const chartData = {
    projectsByStatus: [
      {
        label: "Ongoing",
        value: projects.filter((p) => p.completed === "no").length,
      },
      {
        label: "Completed",
        value: projects.filter((p) => p.completed === "yes").length,
      },
    ],
    budgetDistribution: projects.map((p) => ({
      label: p.projectTitle,
      value: p.amountSanctioned,
    })),
  };

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#000000",
          height: "70px",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="h5"
              onClick={() => navigate("/")}
              sx={{
                color: "#ffffff",
                fontWeight: 500,
                letterSpacing: "1px",
                fontFamily: "system-ui",
                cursor: "pointer",
                "&:hover": { opacity: 0.8 },
              }}
            >
              ConsultEase
            </Typography>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button
              color="inherit"
              onClick={handlePopoverOpen}
              sx={{
                textTransform: "none",
                fontSize: "1rem",
                display: "flex",
                alignItems: "center",
                gap: 1,
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
              }}
            >
              <AccountCircleIcon fontSize="small" />
              Profile
            </Button>
            <Popover
              open={open}
              anchorEl={anchorEl}
              onClose={handlePopoverClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <Box sx={{ p: 2, minWidth: 200 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ color: "text.secondary", mb: 1 }}
                >
                  Profile Info
                </Typography>
                <Divider sx={{ mb: 1 }} />
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <AccountCircleIcon sx={{ mr: 1, color: "primary.main" }} />
                  <Typography variant="body2">
                    {localStorage.getItem("email") || "N/A"}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="body2" sx={{ fontWeight: 500, mr: 1 }}>
                    Role:
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      backgroundColor:
                        localStorage.getItem("admin") === "true"
                          ? "success.main"
                          : "info.main",
                      color: "#fff",
                      px: 1.2,
                      py: 0.3,
                      borderRadius: "12px",
                      fontSize: "0.75rem",
                      fontWeight: 500,
                    }}
                  >
                    {localStorage.getItem("admin") === "true"
                      ? "Admin"
                      : "User"}
                  </Typography>
                </Box>
              </Box>
            </Popover>
            <Button
              color="inherit"
              onClick={handleLogout}
              sx={{
                textTransform: "none",
                fontSize: "1rem",
                display: "flex",
                alignItems: "center",
                gap: 1,
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.1)" },
              }}
            >
              <LogoutIcon fontSize="small" />
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 4 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 4,
            gap: 3,
          }}
        >
          <Typography
            variant="h4"
            sx={{ fontWeight: 600, whiteSpace: "nowrap" }}
          >
            Research Projects
          </Typography>
          <Box sx={{ flexGrow: 1, maxWidth: "500px" }}>
            <SearchBar projects={projects} setProjects={setFilteredProjects} />
          </Box>
        </Box>

        <Filters
          projects={projects}
          setFilteredProjects={setFilteredProjects}
        />

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
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
              onClick={() => navigate("/project/new")}
              sx={{
                position: "fixed",
                bottom: 32,
                right: 32,
                backgroundColor: "#000000",
                "&:hover": { backgroundColor: "#333333" },
              }}
            >
              <AddIcon />
            </Fab>
          </>
        )}
        {localStorage.getItem("admin") === "true" && (
          <Box
            sx={{
              mt: 8,
              mb: 4,
              p: 3,
              backgroundColor: "white",
              borderRadius: 2,
              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            }}
          >
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
              Project Statistics
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                  Projects by Status
                </Typography>
                <PieChart
                  series={[
                    {
                      data: chartData.projectsByStatus,
                      innerRadius: 30,
                      outerRadius: 100,
                    },
                  ]}
                  width={400}
                  height={200}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" sx={{ mb: 2 }}>
                  Budget Distribution
                </Typography>
                <BarChart
                  xAxis={[
                    {
                      scaleType: "band",
                      data: chartData.budgetDistribution.map((d) => d.label),
                    },
                  ]}
                  series={[
                    { data: chartData.budgetDistribution.map((d) => d.value) },
                  ]}
                  width={500}
                  height={300}
                />
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
