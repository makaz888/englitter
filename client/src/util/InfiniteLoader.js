import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

class InfiniteLoader extends Component {
  static get propTypes() {
    return {
      onVisited: PropTypes.func,
    };
  }

  constructor(props) {
    super(props);
    this.handleScroll = this.handleScroll.bind(this);
    this.state = { visited: false };
  }

  componentDidMount() {
    if (
      this.props.containerElement == null ||
      this.props.containerElement == undefined
    ) {
      window.addEventListener('scroll', this.handleScroll);
    } else {
      this.props.containerElement.addEventListener('scroll', this.handleScroll);
    }
  }

  componentWillUnmount() {
    if (
      this.props.containerElement == null ||
      this.props.containerElement == undefined
    ) {
      window.removeEventListener('scroll', this.handleScroll);
    } else {
      this.props.containerElement.removeEventListener(
        'scroll',
        this.handleScroll
      );
    }
  }

  handleScroll(e) {
    if (!this.props.loadedAll) {
      if (this.isElementInViewport()) {
        if (!this.state.visited) {
          this.setState({ visited: true });
          new Promise((resolve, reject) => {
            this.props.onVisited();
            resolve();
          }).then(() => {
            //setTimeout('setStateFalse()', 1000);
            setTimeout(() => {
              this.setStateFalse();
            }, 1000);
          });
        }
      }
    }
  }

  setStateFalse() {
    this.setState({ visited: false });
  }

  isElementInViewport() {
    var rect = this.refs.visit.getBoundingClientRect();

    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= window.innerHeight &&
      rect.right <= window.innerWidth
    );
  }
  render() {
    return (
      <span>
        {this.props.loadedAll ? (
          <>Loaded All</>
        ) : (
          <Fragment>
            <CircularProgress size={30} />
            <span className="visit" ref="visit"></span>
          </Fragment>
        )}
      </span>
    );
  }
}
export default InfiniteLoader;
