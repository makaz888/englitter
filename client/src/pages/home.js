import React, { Component, Fragment } from 'react';
import MyButton from '../util/MyButton';
import { Link } from 'react-router-dom';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import PropTypes from 'prop-types';

import Scream from '../components/scream/Scream';
import Profile from '../components/profile/Profile';
import ScreamSkeleton from '../util/ScreamSkeleton';

import { connect } from 'react-redux';
import { getScreams, getNextScreams } from '../redux/actions/dataActions';
import createPalette from '@material-ui/core/styles/createPalette';

import chidori from '../images/chidoriBlack.png';
import screen from '../images/screen.png';

const styles = (theme) => ({
  ...theme.spreadIt,
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
  showMoreButton: {
    textAlign: 'center',
  },
  textCenter: {
    textAlign: 'center',
  },
  button: {
    margin: theme.spacing(2, 0, 1),
    fontSize: '20px',
  },

  catchcopy: {
    //filter: 'none',

    width: '60%',
    marginTop: 100,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  chidori: {
    backgroundImage: `url(${chidori})`,
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: '70%',

    height: 300,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  subCatchcopy: {
    marginTop: 20,
    //color: theme.palette.primary.light,
    color: 'rgba(0, 0, 0, 0.5)',
  },

  screen: {
    width: '80%',
    marginTop: 30,
  },
  secondDiv: {
    marginTop: 30,
    background: 'white',
  },
  buttons: {
    marginTop: 50,
  },
  /*
  chidori: {
    filter: 'drop-shadow(5px 5px 5px #aaa)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },*/
});

class home extends Component {
  state = {
    screams: null,
  };
  componentDidMount() {
    this.props.getScreams();
  }
  getNextScreams = () => {
    this.props.getNextScreams(
      this.props.data.screams[this.props.data.screams.length - 1].createdAt
    );
  };
  render() {
    const { screams, loading } = this.props.data;
    const { classes } = this.props;

    let recentScreamsMarkup = !loading ? (
      screams.map((scream) => <Scream key={scream.screamId} scream={scream} />)
    ) : (
      <ScreamSkeleton />
    );
    return (
      <div className={classes.textCenter}>
        <div className={classes.catchcopy}>
          <div className={classes.chidori}>
            <div className={classes.verticalMiddle}>
              <Typography
                component="h1"
                variant="h4"
                color="primary"
                className={classes.transparent}
              >
                <b>Fun and Successful Way to Learn English</b>
              </Typography>
              <Typography
                component="h3"
                variant="subtitle1"
                className={classes.subCatchcopy}
              >
                英語学習ではアウトプットが最も重要だと言われています。あなたもenglitterで気軽にアウトプットしてみませんか？
              </Typography>
            </div>
          </div>
          <div className={classes.buttons}>
            <Button
              fullWidth
              variant="outlined"
              color="primary"
              className={classes.button}
              component={Link}
              to="/main"
            >
              見てみる
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.button}
              component={Link}
              to="/signup"
            >
              サインアップ
            </Button>
          </div>
        </div>
        <div className={classes.secondDiv}>
          <Typography
            component="h3"
            variant="subtitle1"
            className={classes.subCatchcopy}
          >
            毎日英語でつぶやこう
          </Typography>
          <Typography
            component="h3"
            variant="subtitle2"
            className={classes.subCatchcopy}
          >
            englitterは英語学習者のための完全無料SNSサービスです。
          </Typography>
          <img className={classes.screen} src={screen} alt="screen" />
        </div>
        <div className={classes.secondDiv}>
          <Typography
            component="h3"
            variant="subtitle1"
            className={classes.subCatchcopy}
          >
            「englitterは世界最高のWEBサービスです。」
            <br /> ーうちの嫁
            <hr /> 「englitterこそ英語習得の唯一の方法。」
            <br /> うちの娘
          </Typography>
        </div>
      </div>
    );
  }
}
home.propTypes = {
  getScreams: PropTypes.func.isRequired,
  getNextScreams: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  data: state.data,
});
export default connect(mapStateToProps, { getScreams, getNextScreams })(
  withStyles(styles)(home)
);
