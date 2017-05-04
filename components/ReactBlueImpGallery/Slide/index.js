import React from 'react';
import PropTypes from 'prop-types';

// We'll add components to a listener queue to be notified
// on changes in synched data.
const nextListeners = [];
function subscribe(listener) {
  if (typeof listener !== 'function') {
    throw new Error('Expected listener to be a function.');
  }

  let isSubscribed = true;

  nextListeners.push(listener);

  return function unsubscribe() {
    if (!isSubscribed) {
      return;
    }

    isSubscribed = false;

    const index = nextListeners.indexOf(listener);
    nextListeners.splice(index, 1);
  };
}

// Helper to wrapp components which was rendered into
// slide with ReactFactory. Connect subscribes to synchedData updates
// and renders wrapped component with new data.
class Connect extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.unsubscribe = subscribe((data) => {
      this.setState({ ...data });
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return React.cloneElement(this.props.wrappedComponent, { ...this.state });
  }
}

Connect.propTypes = { wrappedComponent: PropTypes.object };

// Slide represents both thumbnail and content of an slide,
// but only renders thumbanils with proper config to BlueImp gallery.
class Slide extends React.Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.synchedData !== this.props.synchedData) {
      nextListeners.forEach(s => s(nextProps.synchedData));
    }
  }

  render() {
    const {
      source,
      href,
      thumbnail,
      title,
      poster,
      type,
      template,
      children, // eslint-disable-line no-unused-vars
      synchedData, // eslint-disable-line no-unused-vars
      ...props
    } = this.props;

    const src = source || href;
    const tn = thumbnail || poster || src;
    const _title = title;
    return template ?
      React.cloneElement(template, { ...props })
    : (
        <a href={src} title={_title} type={type} {...props}>
            <img src={tn} alt={_title} />
        </a>
      );
  }
}

Slide.propTypes = {
  source: PropTypes.string,
  href: PropTypes.string,
  thumbnail: PropTypes.string,
  poster: PropTypes.string,
  title: PropTypes.string,
  type: PropTypes.string,
  template: PropTypes.any,
  synchedData: PropTypes.object,
};

Slide.defaultProps = {
  source: null,
  href: null,
  thumbnail: null,
  poster: null,
  title: '',
  type: 'image/jpeg',
  template: null,
  synchedData: {},
};

Slide.Connect = Connect;

export default Slide;
