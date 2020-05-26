import React, { Component, Fragment } from 'react';

import InfiniteLoader from '../util/InfiniteLoader';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import PropTypes from 'prop-types';

import Scream from '../components/scream/Scream';
import Profile from '../components/profile/Profile';
import ScreamSkeleton from '../util/ScreamSkeleton';

import { connect } from 'react-redux';
import {
  getScreams,
  getNextScreams,
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
  card: {
    /*position: 'relative',
    display: 'flex',*/
    marginBottom: 10,
    borderRadius: 20,
  },
  showMore: {
    textAlign: 'center',
  },
});

class main extends Component {
  state = {
    screams: null,
  };
  componentDidMount() {
    this.props.setLoadedAll(true);
    this.props.getScreams();
  }
  getNextScreams = () => {
    this.props.getNextScreams(
      this.props.data.screams[this.props.data.screams.length - 1].createdAt
    );
  };
  render() {
    const { screams, loading, loadedAll } = this.props.data;
    const { classes } = this.props;

    let recentScreamsMarkup = !loading ? (
      <div>
        {screams.map((scream) => (
          <Scream key={scream.screamId} scream={scream} />
        ))}
        <div className={classes.showMore}>
          <InfiniteLoader
            onVisited={() => this.getNextScreams()}
            loadedAll={loadedAll}
          />
        </div>
      </div>
    ) : (
      <ScreamSkeleton />
    );
    return (
      <Grid container spacing={0}>
        <Grid item sm={8} xs={12} smPush={4} className={classes.gridScreams}>
          {recentScreamsMarkup}
        </Grid>
        <Grid item sm={4} xs={12} smPull={8} className={classes.gridProfile}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}
main.propTypes = {
  getScreams: PropTypes.func.isRequired,
  getNextScreams: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  setLoadedAll: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  data: state.data,
});
export default connect(mapStateToProps, {
  getScreams,
  getNextScreams,
  setLoadedAll,
})(withStyles(styles)(main));
