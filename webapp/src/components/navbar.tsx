import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Typography } from '@mui/material';
import { useAuth0 } from "@auth0/auth0-react";
import { styled } from '@mui/system';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { useAppDispatch } from '../reducers/fundrasierslice';
import { setUser,clearUser } from '../reducers/authslice';
import Logo from  "../assets/logo02.png";
import StartAFundRaiser from './StartAFundrasiserButton';
import verifyUser from '../middlewares/verifyusermiddleware';

const pages = [{ path: '/', label: 'Home' },{path:'/donations',label:'Donate'}];

const settings = [
  { path: '/mydashboard', label: 'My Dashboard' },
  { path: '/myprofile', label: 'My Profile' },
  { path: '/logout', label: 'Logout' }
];

const StyledIcon = styled('img')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
  marginRight: theme.spacing(1),
}));

function NavBar() {
  const { user, isAuthenticated, loginWithPopup, logout } = useAuth0();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();

  // Effect to sync Auth0 state with Redux
  React.useEffect(() => {
    if (isAuthenticated && user) {
      verifyUser(user);
      dispatch(setUser(user));
    } else {
      dispatch(clearUser());
    }
  }, [user, isAuthenticated, dispatch]);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logoutWithRedirect = () =>
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      }
    });

  return (
    <AppBar position="static" sx={{ background: "#1D5758", color: "#7DB569" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <StyledIcon src={Logo} sx={{ width: "50px", height: "50px" }} alt="Icon" />
          <Typography
            variant="h6"
            noWrap
            component={RouterNavLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Collective Cause
          </Typography>

          {/* Responsive menu button */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
              id="menu-appbar"
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ color: "#7DB569" }}
            >
              {pages.map((page) => (
                <MenuItem key={page.path} onClick={handleCloseNavMenu}>
                  <Typography variant="body1" textAlign="center" sx={{ color: '#7DB569' }}>{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Navigation links */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.path}
                component={RouterNavLink}
                to={page.path}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', textTransform: 'none' }}
              >
                {page.label}
              </Button>
            ))}
          </Box>
          <StartAFundRaiser />
          {/* User avatar and menu */}
          <Box sx={{ flexGrow: 0 }}>
            {isAuthenticated && user ? (
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="User Avatar" src={user.picture} />
                </IconButton>
              </Tooltip>
            ) : (
              <Button color="inherit" onClick={() => loginWithPopup()}>Log in</Button>
            )}
           
            {/* User menu */}
            <Menu
              id="user-menu"
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              {settings.map((setting) => (
                <MenuItem key={setting.label} onClick={setting.label === 'Logout' ? logoutWithRedirect : handleCloseUserMenu}>
                  <RouterNavLink
                    to={setting.path}
                    style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}
                  >
                    {setting.label}
                  </RouterNavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBar;
