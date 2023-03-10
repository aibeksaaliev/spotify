import React, { useState } from 'react';
import { User } from '../../../types';
import { Button, Menu, MenuItem } from '@mui/material';
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../../app/hooks";
import {logout} from "../../../feauters/users/usersThunks";
import {getArtists} from "../../../feauters/artists/artistsThunks";

interface Props {
  user: User;
}

const UsersMenu: React.FC<Props> = ({user}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await dispatch(logout());
    await dispatch(getArtists());
    navigate('/');
  };

  return (
    <>
      <Button
        onClick={handleClick}
        color="inherit"
      >
        Hello, {user.username}
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => navigate('/add_new_artist')}>Add New Artist</MenuItem>
        <MenuItem onClick={() => navigate('/add_new_album')}>Add New Album</MenuItem>
        <MenuItem onClick={() => navigate('/add_new_track')}>Add New Track</MenuItem>
        <MenuItem onClick={() => navigate('/track_history')}>Track History</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UsersMenu;