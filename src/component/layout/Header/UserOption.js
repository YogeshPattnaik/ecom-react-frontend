import React, { useState } from 'react';
import './Header.css';
import { SpeedDial, SpeedDialAction, Backdrop } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ListAltIcon from '@mui/icons-material/ListAlt';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useAlert } from 'react-alert';
import { logout } from '../../../actions/userActions';

const UserOption = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const [open, setOpen] = useState(false);

  const options = [
    { icon: <ListAltIcon />, name: 'Orders', func: orders },
    { icon: <PersonIcon />, name: 'Profile', func: account },
    { icon: <ExitToAppIcon />, name: 'Logout', func: logoutUser },
  ];

  if (user.role === 'admin') {
    options.unshift({
      icon: <DashboardIcon />,
      name: 'Dashboard',
      func: dashboard,
    });
  }

  function orders() {
    navigate('/orders');
  }

  function dashboard() {
    navigate('/dashboard');
  }

  function account() {
    navigate('/account');
  }

  function logoutUser() {
    dispatch(logout());
    alert.success('logout successfully');
  }

  return (
    <>
      <Backdrop open={open} style={{ zIndex: '10' }} />
      <SpeedDial
        ariaLabel="speedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        direction="down"
        className="speedDial"
        style={{ zIndex: '11' }}
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : './Profile.png'}
            alt="profile"
          />
        }
      >
        {options.map((item) => {
          const { icon, name, func } = item;
          return (
            <SpeedDialAction
              key={name}
              icon={icon}
              tooltipTitle={name}
              onClick={func}
            />
          );
        })}
      </SpeedDial>
    </>
  );
};

export default UserOption;
