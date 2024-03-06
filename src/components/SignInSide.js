import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom'; // Import useHistory

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://www.selenium.dev/selenium-ide/">
        Download Selenium IDE here!
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const users = [
  { email: 'user1@example.com', password: 'password1' },
  { email: 'user2@example.com', password: 'password2' },
  // Add more users as needed
];

function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return email.length >= 4 && emailRegex.test(email);
}

function isValidPassword(password) {
  return password.length >= 4 && /^[a-zA-Z0-9_.@-]+$/.test(password);
}

const defaultTheme = createTheme();

export default function SignInSide() {
  const navigate = useNavigate(); // Initialize useHistory

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (name === 'email') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: !isValidEmail(value) ? 'Invalid email address' : '',
      }));
    } else if (name === 'password') {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password:
          value.length < 4
            ? 'Password must be at least 4 characters'
            : !isValidPassword(value)
            ? 'Password can only contain letters, numbers, _, ., @, -'
            : '',
      }));
    }
  };

  const findUser = (email, password) => {
    const user = users.find((user) => user.email === email);
    if (user) {
      return user.password === password ? user : null;
    }
    return null;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isFormValid = isValidEmail(formData.email) && isValidPassword(formData.password);

    if (!isFormValid) {
      return;
    }

    const foundUser = findUser(formData.email, formData.password);

    if (foundUser) {
      if (foundUser.password === formData.password) {
        console.log('Login successful:', foundUser);
        setErrors({ email: '', password: '' });
        navigate('/dashboard');
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: 'Password is incorrect',
        }));
      }
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: 'User not registered or incorrect credentials',
        password: '',
      }));
    }
  };

  const handleForgotPasswordClick = () => {
    // Navigate to the ForgotPassword component
    navigate('/forgotpassword');
  };

  const handleSignUp = () => {
    // Navigate to the ForgotPassword component
    navigate('/signup');
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
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
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2" onClick={handleForgotPasswordClick}>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2" onClick={handleSignUp}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
