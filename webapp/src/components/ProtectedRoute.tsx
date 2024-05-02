import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../reducers/authslice';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface ProtectedRouteProps {
  redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ redirectPath = '/' }) => {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  const [open, setOpen] = React.useState(!isAuthenticated); // Open the modal if not authenticated

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if (!isAuthenticated) {
      setOpen(true); // Open the modal if not authenticated
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{ position: 'absolute', right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              You are not logged in
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Please log in to continue.
            </Typography>
          </Box>
        </Modal>
        {/* Navigate after closing the modal, replace true with another state or trigger */}
        { !open && <Navigate to={redirectPath} replace /> }
      </>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
