import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
// MUI
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

const styles = (theme) => ({
  ...theme.spreadIt,
  commentImage: { marginLeft: 50 },
  commentData: {
    marginLeft: 20,
  },
});

class Comments extends Component {
  render() {
    const { comments, classes } = this.props;

    return (
      <Fragment>
        {comments.map((comment, index) => {
          const { body, createdAt, userImage, userHandle } = comment;
          return (
            <Fragment key={createdAt}>
              {/*<Grid item sm={12}>*/}
              <Grid container spacing={1}>
                <Grid item>
                  <Avatar
                    alt={userHandle}
                    src={userImage}
                    className={classes.commentImage}
                  />
                </Grid>
                <Grid item xs>
                  <div className={classes.commentData}>
                    <Typography
                      variant="subtitle2"
                      component={Link}
                      to={`/user/${userHandle}`}
                      color="primary"
                    >
                      {userHandle}
                    </Typography>

                    <Typography variant="body2" color="textSecondary">
                      {dayjs(createdAt).format('h:mm , MMMM DD YYYY')}
                    </Typography>
                    <hr className={classes.invisibleSeparator} />
                    <Typography variant="body1">{body}</Typography>
                  </div>
                </Grid>
              </Grid>

              {index !== comments.length - 1 && (
                <Fragment>
                  <hr className={classes.invisibleSeparator} />
                  <hr className={classes.invisibleSeparator} />
                  <hr className={classes.invisibleSeparator} />
                  <hr className={classes.invisibleSeparator} />
                </Fragment>
              )}
            </Fragment>
          );
        })}
      </Fragment>
    );
  }
}

Comments.propTypes = {
  comments: PropTypes.array.isRequired,
};

export default withStyles(styles)(Comments);
