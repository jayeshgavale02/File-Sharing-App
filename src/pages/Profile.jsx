import React, { useState } from 'react';
import { Card, Box, Typography, Checkbox, TextField, Button, Avatar } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Navbar from '../components/Navbar';

function Profile() {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const username = 'JohnDoe'; // Replace with actual username from props or state
  const email = 'johndoe@example.com'; // Replace with actual email from props or state

  const handleCheckboxChange = () => {
    setIsChangingPassword(!isChangingPassword);
    if (!isChangingPassword) {
      setNewPassword(''); // Clear password if unchecking
    }
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isChangingPassword) {
      console.log('New Password:', newPassword);
      // Perform the update action, e.g., call an API to update the password
    }
  };

  return (
    <>
      <Navbar />
      <Box display="flex" justifyContent="center" mt={5}>
        <Card sx={{ width: 360, padding: 3, borderRadius: 2, boxShadow: 3 }}>
          <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
            <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56, mb: 1 }}>
              <AccountCircleIcon fontSize="large" />
            </Avatar>
            <Typography variant="h5" component="div" align="center" gutterBottom>
              Profile
            </Typography>
          </Box>
          <Typography variant="body1" gutterBottom>
            <strong>Username:</strong> {username}
            <br />
            <strong>Email:</strong> {email}
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box display="flex" alignItems="center" mb={2}>
              <Checkbox
                checked={isChangingPassword}
                onChange={handleCheckboxChange}
                inputProps={{ 'aria-label': 'Change Password' }}
              />
              <Typography variant="body1">Change Password</Typography>
            </Box>
            <TextField
              type="password"
              label="Enter New Password"
              variant="outlined"
              fullWidth
              value={newPassword}
              onChange={handlePasswordChange}
              disabled={!isChangingPassword}
              required={isChangingPassword}
              sx={{ mb: 2 }}
            />
            <Button variant="contained" color="primary" type="submit" fullWidth>
              Update Password
            </Button>
          </form>
        </Card>
      </Box>
    </>
  );
}

export default Profile;
