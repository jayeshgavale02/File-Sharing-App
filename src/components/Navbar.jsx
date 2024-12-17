import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/img/log2.png';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const pages = token
    ? [
        { name: 'Dashboard', path: '/dashboard' },
        { name: 'File Upload', path: '/fileupload' }
      ]
    : [
        { name: 'Home', path: '/' },
        { name: 'Login', path: '/login' }
      ];

  return (
    <AppBar position="static" sx={{ background: "#222" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <IconButton edge="start" color="inherit" aria-label="logo" sx={{ backgroundColor: 'transparent' }}>
            <img src='data:image/jpeg;base64,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' alt="File Sharing App Logo" style={{ height: '40px', borderRadius: '50%',  }} />
          </IconButton>
          
          {/* Mobile App Name */}
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              display: { xs: 'flex', md: 'none' }, // Only show on mobile
              fontFamily: 'monospace',
              fontWeight: 50,
              letterSpacing: '1.rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            File Sharing App
          </Typography>

          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' }, // Only show on desktop
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            File Sharing App
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          {/* Desktop Menu */}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={handleCloseNavMenu}
                component={Link}
                to={page.path}
                sx={{ my: 2, color: 'white', display: 'block', textDecoration: 'none' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              id="menu-appbar"
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  component={Link}
                  to={page.path}
                >
                  {page.name}
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* User Menu for Mobile and Desktop */}
          {token && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                size="large"
                aria-label="user menu"
                aria-controls="user-menu"
                aria-haspopup="true"
                onClick={handleOpenUserMenu}
                color="inherit"
              >
            <AccountCircle fontSize="large" />
              </IconButton>
              <Menu
                anchorEl={anchorElUser}
                id="user-menu"
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                slotProps={{
                  paper: {
                    elevation: 0,
                    sx: {
                      overflow: 'visible',
                      filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                      mt: 1.5,
                      '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                      },
                      '&::before': {
                        content: '""',
                        display: 'block',
                        position: 'absolute',
                        top: 0,
                        right: 14,
                        width: 10,
                        height: 10,
                        bgcolor: 'background.paper',
                        transform: 'translateY(-50%) rotate(45deg)',
                        zIndex: 0,
                      },
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
          
                <MenuItem onClick={handleCloseUserMenu} component={Link} to="/profile">
                  <ListItemIcon>
                    <Avatar fontSize="small" />
                  </ListItemIcon>
                  Profile
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
