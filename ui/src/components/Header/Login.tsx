import React, { FC } from 'react';
import { connect } from 'react-redux';

import { makeStyles, createStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';

import { iRootState } from '../../store';

const useStyles = makeStyles(() =>
  createStyles({
    avatar: {}
  })
);

const mapState = (state: iRootState) => ({
  authUser: state.global.authUser
});

const mapDispatch = (dispatch: any) => ({
  initApp: dispatch.global.initApp,
  doLogOut: dispatch.global.doLogOut
});

type connectedProps = ReturnType<typeof mapState> &
  ReturnType<typeof mapDispatch>;

// Ideally we shouldn't be using redux in components
const Login: FC<connectedProps> = ({ authUser, doLogOut }) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  function handleProfileMenuOpen(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleMenuClose() {
    setAnchorEl(null);
  }

  const handleLogOut = () => {
    setAnchorEl(null);
    doLogOut();
  };

  if (authUser === null) {
    return null;
  }
  return (
    <React.Fragment>
      <IconButton
        aria-label='account of current user'
        aria-controls='menu-appbar'
        aria-haspopup='true'
        onClick={handleProfileMenuOpen}
        color='inherit'
      >
        <Avatar
          alt={authUser.name}
          src={authUser.picture}
          className={classes.avatar}
        />
      </IconButton>
      <Menu
        id='menu-appbar'
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        anchorEl={anchorEl}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleLogOut}>Log-Out</MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default connect(
  mapState,
  mapDispatch
)(Login);
