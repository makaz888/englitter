import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import PostScream from '../scream/PostScream';
import Notifications from './Notifications';
// MUI stuff
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Hidden from '@material-ui/core/Hidden';

// Icons
import HomeIcon from '@material-ui/icons/Home';
import LogoIcon from '../../images/logo.png';
import LogoSmallIcon from '../../images/logoSmall.png';
import MoreVertIcon from '@material-ui/icons/MoreVert';

//const styles = {
const styles = (theme) => ({
  button: {
    borderRadius: 20,
  },
  image: {
    height: 40,
  },
  logoSmall: {
    height: 25,
  },
  logoSmallLink: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  //toolBar: {
  //  height: 56,
  //},
  //appBar: {
  //  height: 30,
  //},
  appBar: {
    background: '#fcd145',
  },
});

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // this.stateの初期値{ anchorEl: false }をセット
      anchorEl: false,
    };
  }

  render() {
    const { classes, authenticated } = this.props;

    const handleClick = (event) => {
      //setAnchorEl(event.currentTarget);
      this.setState({ anchorEl: event.currentTarget });
    };
    const handleClose = () => {
      //setAnchorEl(null);
      this.setState({ anchorEl: null });
    };
    return (
      <AppBar>
        <Toolbar className={classes.toolBar}>
          <Hidden xsDown>
            <Link to="/main">
              <img src={LogoIcon} alt="logo" className={classes.image} />
            </Link>
          </Hidden>
          <Hidden smUp>
            <Link to="/main" className={classes.logoSmallLink}>
              <img
                src={LogoSmallIcon}
                alt="logo"
                className={classes.logoSmall}
              />
            </Link>
          </Hidden>

          <div className="nav-container">
            {authenticated ? (
              <Fragment>
                <PostScream />
                {/*
                <Link to="/">
                  <MyButton tip="Home!">
                    <HomeIcon />
                  </MyButton>
                </Link>
                */}
                <Notifications />
              </Fragment>
            ) : (
              <Fragment>
                <Hidden xsDown>
                  <Button
                    className={classes.button}
                    color="inherit"
                    size="small"
                    component={Link}
                    to="/login"
                  >
                    Login
                  </Button>
                  <Button
                    className={classes.button}
                    color="inherit"
                    size="small"
                    component={Link}
                    to="/signup"
                  >
                    Signup
                  </Button>
                </Hidden>

                <Hidden smUp>
                  <IconButton
                    aria-label="more"
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                    <MoreVertIcon />
                  </IconButton>

                  <Menu
                    id="simple-menu"
                    anchorEl={this.state.anchorEl}
                    keepMounted
                    open={Boolean(this.state.anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem
                      component={Link}
                      to="/login"
                      onClick={handleClose}
                    >
                      Login
                    </MenuItem>
                    <MenuItem
                      component={Link}
                      to="/signup"
                      onClick={handleClose}
                    >
                      Signup
                    </MenuItem>
                  </Menu>
                </Hidden>
              </Fragment>
            )}
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}

Navbar.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
});

//export default connect(mapStateToProps)(Navbar);
export default connect(mapStateToProps)(withStyles(styles)(Navbar));
