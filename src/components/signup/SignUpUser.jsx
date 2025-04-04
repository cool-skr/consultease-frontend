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
  Checkbox,
} from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/logo.png'; 
import { useAuth } from '../../context/AuthContext.jsx';

function SignUpUser() {
  const [formValues, setFormValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    isAdmin: false,
    passkey: '',
  });

  const [passkeyError, setPasskeyError] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const {login} = useAuth();
  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    if (!minLength || !hasUpperCase || !hasLowerCase || !hasSpecialChar) {
      setPasswordError('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one special character');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const validateConfirmPassword = (confirmPassword) => {
    if (confirmPassword !== formValues.password) {
      setConfirmPasswordError('Passwords do not match');
      return false;
    }
    setConfirmPasswordError('');
    return true;
  };

  const validatePasskey = (passkey) => {
    if (formValues.isAdmin && passkey !== '123okshamba') {
      setPasskeyError('Invalid admin passkey');
      return false;
    }
    setPasskeyError('');
    return true;
  };

  const getData = (e) => {
    const { value, name, type, checked } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (name === 'passkey') {
      validatePasskey(value);
    }
    if (name === 'email') {
      validateEmail(value);
    }
    if (name === 'password') {
      validatePassword(value);
    }
    if (name === 'confirmPassword') {
      validateConfirmPassword(value);
    }
  };

  const validateEmail = (email) => {
    if (!email.endsWith('@ssn.edu.in')) {
      setEmailError('Please use your SSN email address (@ssn.edu.in)');
      return false;
    }
    setEmailError('');
    return true;
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    if(formValues.password !== formValues.confirmPassword) {
      setConfirmPasswordError('Passwords do not match. Please check your passwords.');
      return;
    }
    else {
      try {
        const registerData = {
          username: formValues.username,
          password: formValues.password,
          email: formValues.email
        };

        const response = await fetch('http://localhost:5000/user/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(registerData),
        });

        if (response.status === 201) {
          login();
          navigate('/');
        } else {
          console.error('Registration failed');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }
  const navigate = useNavigate();

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
          elevation={3}
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
              fontWeight: 600,
              color: 'primary.main',
            }}
          >
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              margin="dense"
              required
              fullWidth
              name="username"
              label="Username"
              autoFocus
              sx={{ mb: 1 }}
              onChange={getData}
            />
            
            <TextField
              margin="dense"
              required
              fullWidth
              name="email"
              label="Email Address"
              type="email"
              sx={{ mb: 1 }}
              onChange={getData}
              error={!!emailError}
              helperText={emailError}
            />
            <TextField
              margin="dense"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              sx={{ mb: 1 }}
              onChange={getData}
              error={!!passwordError}
              helperText={passwordError}
            />
            <TextField
              margin="dense"
              required
              fullWidth
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              sx={{ mb: 1 }}
              onChange={getData}
              error={!!confirmPasswordError}
              helperText={confirmPasswordError}
            />
            <FormControlLabel
              control={<Checkbox name="isAdmin" checked={formValues.isAdmin} onChange={getData} color="primary" />}
              label="Sign up as Admin"
              sx={{ mb: 1 }}
            />
            
            {formValues.isAdmin && (
              <TextField
                margin="dense"
                required
                fullWidth
                name="passkey"
                label="Admin Passkey"
                type="password"
                sx={{ mb: 1 }}
                onChange={getData}
                error={!!passkeyError}
                helperText={passkeyError}
              />
            )}
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 1,
                mb: 2,
                py: 1,
                fontSize: '1rem',
                textTransform: 'none',
              }}
            >
              Sign Up
            </Button>
            <Grid
              container
              justifyContent="center"
              sx={{ mt: 2 }}
            >
              <Typography variant="body2">
                Already have an account?{' '}
                <Link 
                  onClick={() => navigate('/login')} 
                  sx={{ textDecoration: 'none', fontWeight: 600, cursor: 'pointer' }}
                >
                  Sign In
                </Link>
              </Typography>
            </Grid>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default SignUpUser;