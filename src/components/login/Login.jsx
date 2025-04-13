import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  Typography,
  TextField,
  Paper,
  FormControlLabel,  
  Checkbox          
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import { useAuth } from '../../context/AuthContext.jsx';

function Login() {
  const { login } = useAuth();
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  });
  const getData = (e) => {
    const { value, name } = e.target;
    setFormValues(() => {
      return {
        ...formValues,
        [name]: value,
      };
    });
  };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAdminLogin) {
      try {
        const response = await fetch('http://localhost:5000/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formValues),
        });

        if (response.ok) {
          login(formValues.email);
          navigate('/');
        } else {
          console.error('Login failed');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
    else {
      try {
        const response = await fetch('http://localhost:5000/admin/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formValues),
        });

        if (response.ok) {
          login(formValues.email, 'true');
          navigate('/');
        } else {
          console.error('Login failed');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (

    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={4}
          sx={{
            padding: 3,
            borderRadius: 2,
            width: '100%',
          }}
        >
          <Box
            component="img"
            src={Logo}
            alt="ConsultEase Logo"
            sx={{
              width: '150px',
              height: 'auto',
              display: 'block',
              margin: '0 auto',
              mb: 2
            }}
          />
          <Typography
            component="h1"
            variant="h5"
            sx={{
              textAlign: 'center',
              mb: 2,
              fontWeight: 500,
              color: '#000000',
            }}
          >
            Sign In
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              type="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={getData}
              sx={{ mb: 2 }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={getData}
              sx={{ mb: 2 }}
            />
            <FormControlLabel
              control={<Checkbox
                checked={isAdminLogin}
                onChange={
                  () => {
                    setIsAdminLogin((prev) => !prev);
                  }
                }
                color="primary" />}
              label="Log in as Admin"
              sx={{ mb: 1 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              sx={{
                mt: 2,
                mb: 3,
                py: 1.5,
                fontSize: '1.1rem',
                textTransform: 'none',
              }}
            >
              Sign In
            </Button>
            <Grid container justifyContent="center" spacing={2}>
              <Grid item>
                <Link href="" variant="body2" sx={{ textDecoration: 'none' }}>
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
            <Grid
              container
              justifyContent="center"
              sx={{ mt: 3 }}
              className="footer"
            >
              <Typography variant="body2">
                Don't have an account?{' '}
                <Link
                  onClick={() => navigate('/signup')}
                  sx={{ textDecoration: 'none', fontWeight: 600, cursor: 'pointer' }}
                >
                  Sign Up
                </Link>
              </Typography>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default Login;