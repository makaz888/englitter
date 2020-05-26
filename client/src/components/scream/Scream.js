import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import PropTypes from 'prop-types';
import MyButton from '../../util/MyButton';
import DeleteScream from './DeleteScream';
import ScreamDialog from './ScreamDialog';

import LikeButton from './LikeButton';
import clsx from 'clsx';
// MUI Stuff
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// Icons
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteIcon from '@material-ui/icons/Favorite';

// Redux
import { connect } from 'react-redux';

//const styles = {
const styles = (theme) => ({
  card: {
    /*position: 'relative',
    display: 'flex',*/
    marginBottom: 5,
    borderRadius: 20,
  },
  cardHeader: {
    //background: 'red',
    padding: 10,
  },
  cardContent: {
    marginLeft: 67,
    padding: 0,
    //background: 'blue',
  },
  cardActions: {
    marginLeft: 57,
    padding: 0,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',

    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  commentButton: {
    marginLeft: 50,
  },
});

export class Scream extends Component {
  //Added
  constructor(props) {
    super(props);
    this.state = {
      // this.stateの初期値{ expanded: false }をセット
      expanded: false,
    };
  }

  render() {
    dayjs.extend(relativeTime);
    const {
      classes,
      scream: {
        body,
        createdAt,
        userImage,
        userHandle,
        screamId,
        likeCount,
        commentCount,
      },
      user: {
        authenticated,
        credentials: { handle },
      },
    } = this.props;

    const deleteButton =
      authenticated && userHandle === handle ? (
        <DeleteScream screamId={screamId} />
      ) : null;

    // Added
    //const [expanded, setExpanded] = React.useState(false);

    // Added
    const handleExpandClick = () => {
      //setExpanded(!expanded);
      this.setState({ expanded: !this.state.expanded });
    };

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={<Avatar alt={userHandle} src={userImage} />}
          action={<div>{deleteButton}</div>}
          title={<Link to={`/user/${userHandle}`}>{userHandle}</Link>}
          subheader={dayjs(createdAt).fromNow()}
          className={classes.cardHeader}
        />
        <CardContent className={classes.cardContent}>
          <Typography variant="body2" color="textSecondary" component="p">
            {body}
          </Typography>
        </CardContent>
        <CardActions disableSpacing className={classes.cardActions}>
          <LikeButton screamId={screamId} />
          <span>{likeCount} </span>
          {/*}
          <MyButton tip="Comment" btnClassName={classes.commentButton}>
            <ChatOutlinedIcon />
          </MyButton>
        */}
          <ScreamDialog
            className={classes.commentButton}
            screamId={screamId}
            userHandle={userHandle}
            openDialog={this.props.openDialog}
          />
          <span> {commentCount}</span>

          {/*
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
          */}
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>
              Heat 1/2 cup of the broth in a pot until simmering, add saffron
              and set aside for 10 minutes.
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

Scream.propTypes = {
  user: PropTypes.object.isRequired,
  scream: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  openDialog: PropTypes.bool,
};
const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Scream));
