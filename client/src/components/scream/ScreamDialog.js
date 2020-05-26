import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../../util/MyButton';
import InfiniteLoader from '../../util/InfiniteLoader';
import LikeButton from './LikeButton';
import Comments from './Comments';
import CommentForm from './CommentForm';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

// MUI
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
// Icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
//Redux
import { connect } from 'react-redux';
import {
  getScream,
  clearErrors,
  setLoadedAllComments,
  getMoreComments,
} from '../../redux/actions/dataActions';

const styles = (theme) => ({
  ...theme.spreadIt,

  profileImage: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  commentData: {
    marginLeft: 20,
  },
  engleet: {
    marginLeft: 20,
  },
  dialogContent: {
    padding: 20,
  },
  closeButton: {
    /* position: 'absolute',
    /*left: '90%',*/
    marginLeft: 'auto',
  },
  /*
  expandButton: {
    position: 'absolute',
    left: '90%',
  },
  */
  spinnerDiv: {
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 50,
  },
  showMore: {
    textAlign: 'center',
  },
});

class ScreamDialog extends Component {
  state = {
    open: false,
    oldPath: '',
    newPath: '',
  };
  componentDidMount() {
    this.props.setLoadedAllComments(true);
    if (this.props.openDialog) {
      this.handleOpen();
    }
  }
  handleOpen = () => {
    let oldPath = window.location.pathname;

    const { userHandle, screamId } = this.props;
    const newPath = `/users/${userHandle}/scream/${screamId}`;

    if (oldPath === newPath) oldPath = `/user/${userHandle}`;

    window.history.pushState(null, null, newPath);

    this.setState({ open: true, oldPath, newPath });
    this.props.getScream(this.props.screamId);
  };

  handleClose = () => {
    window.history.pushState(null, null, this.state.oldPath);
    this.setState({ open: false });
    this.props.clearErrors();
  };

  getMoreComments = () => {
    console.log(this.props);
    this.props.getMoreComments(
      this.props.screamId,
      this.props.scream.comments[this.props.scream.comments.length - 1]
        .createdAt
    );
  };

  render() {
    const {
      classes,
      scream: {
        screamId,
        body,
        createdAt,
        likeCount,
        commentCount,
        userImage,
        userHandle,
        comments,
      },
      UI: { loading },
      className,
    } = this.props;
    const { loadedAllComments } = this.props.data;
    const dialogMarkup = loading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={50} thickness={2} />
      </div>
    ) : (
      <Fragment>
        <Grid container spacing={1}>
          <Grid item>
            <Avatar
              alt={userHandle}
              src={userImage}
              className={classes.profileImage}
            />
          </Grid>
          <Grid item xs>
            <div className={classes.commentData}>
              <Typography
                component={Link}
                color="primary"
                variant="subtitle1"
                to={`/user/${userHandle}`}
              >
                {userHandle}
              </Typography>

              <Typography variant="body1" color="textSecondary">
                {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
              </Typography>
            </div>

            <div className={classes.engleet}>
              <hr className={classes.invisibleSeparator} />
              <Typography variant="h5">{body}</Typography>
              <LikeButton screamId={screamId} />
              <span>{likeCount}</span>
            </div>
          </Grid>
          <hr className={classes.visibleSeparator} />
        </Grid>
        <CommentForm screamId={screamId} />
        <Comments comments={comments} />
        <div className={classes.showMore}>
          {console.log(loadedAllComments)}
          <InfiniteLoader
            onVisited={() => this.getMoreComments()}
            loadedAll={loadedAllComments}
            containerElement={document.querySelector('.dialogContent')}
          />
        </div>
      </Fragment>
    );
    return (
      <Fragment>
        <MyButton
          onClick={this.handleOpen}
          tip="Comments"
          btnClassName={className}
        >
          <ChatOutlinedIcon color="primary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            tipClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          <DialogContent
            className={classes.DialogContent}
            className="dialogContent"
          >
            {dialogMarkup}
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

ScreamDialog.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  getScream: PropTypes.func.isRequired,
  getMoreComments: PropTypes.func.isRequired,
  screamId: PropTypes.string.isRequired,
  userHandle: PropTypes.string.isRequired,
  scream: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  setLoadedAllComments: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  scream: state.data.scream,
  UI: state.UI,
  data: state.data,
});

const mapActionsToProps = {
  getScream,
  clearErrors,
  setLoadedAllComments,
  getMoreComments,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(ScreamDialog));
