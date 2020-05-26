import React, { Component, Fragment } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';
import axios from 'axios';
import Scream from '../components/scream/Scream';
import StaticProfile from '../components/profile/StaticProfile';
import InfiniteLoader from '../util/InfiniteLoader';
import Grid from '@material-ui/core/Grid';

import ScreamSkeleton from '../util/ScreamSkeleton';
import ProfileSkeleton from '../util/ProfileSkeleton';

import { connect } from 'react-redux';
import {
  getUserScreams,
  getMoreUserScreams,
  setLoadedAll,
} from '../redux/actions/dataActions';

const styles = (theme) => ({
  gridScreams: {
    order: 2,
    [theme.breakpoints.up('sm')]: {
      order: 1,
    },
  },
  gridProfile: {
    order: 1,
    [theme.breakpoints.up('sm')]: {
      order: 2,
    },
  },
  showMore: {
    textAlign: 'center',
  },
});

class user extends Component {
  state = {
    //profile: null,
    screamParam: null,
  };
  componentDidMount() {
    this.props.setLoadedAll('true');

    const handle = this.props.match.params.handle;
    const screamId = this.props.match.params.screamId;

    if (screamId) this.setState({ screamIdParam: screamId });
    this.props.getUserScreams(handle);
    /*
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        this.setState({
          profile: res.data.user,
        });
      })
      .catch((err) => console.log(err));
      */
  }
  getMoreUserScreams = () => {
    const handle = this.props.match.params.handle;
    this.props.getMoreUserScreams(
      handle,
      this.props.data.screams[this.props.data.screams.length - 1].createdAt
    );
  };
  render() {
    const { screams, loading, loadedAll } = this.props.data;
    const { screamIdParam } = this.state;
    const { classes } = this.props;

    const screamsMarkup = loading ? (
      <ScreamSkeleton />
    ) : screams === null ? (
      <p>No screams from this user</p>
    ) : !screamIdParam ? (
      <Fragment>
        {screams.map((scream) => (
          <Scream key={scream.screamId} scream={scream} />
        ))}
        <div className={classes.showMore}>
          <InfiniteLoader
            onVisited={() => this.getMoreUserScreams()}
            loadedAll={loadedAll}
          />
        </div>
      </Fragment>
    ) : (
      screams.map((scream) => {
        if (scream.screamId !== screamIdParam)
          return <Scream key={scream.screamId} scream={scream} />;
        else return <Scream key={scream.screamId} scream={scream} openDialog />;
      })
    );

    return (
      <Grid container spacing={1}>
        <Grid item sm={8} xs={12} className={classes.gridScreams}>
          {screamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12} className={classes.gridProfile}>
          {this.props.data.profile === null ? (
            <ProfileSkeleton />
          ) : (
            <StaticProfile profile={this.props.data.profile} />
          )}
        </Grid>
      </Grid>
    );
  }
}

user.propTypes = {
  getUserScreams: PropTypes.func.isRequired,
  getMoreUserScreams: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, {
  getUserScreams,
  getMoreUserScreams,
  setLoadedAll,
})(withStyles(styles)(user));
