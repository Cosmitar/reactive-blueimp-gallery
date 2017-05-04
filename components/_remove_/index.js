import React from 'react';
import PropTypes from 'prop-types';
import Gallery from 'blueimp-gallery';
import './../../node_modules/blueimp-gallery/js/blueimp-gallery-video.js';
import './../../node_modules/blueimp-gallery/js/blueimp-gallery-youtube.js';
import './../../node_modules/blueimp-gallery/js/blueimp-gallery-vimeo.js';
import './../../node_modules/blueimp-gallery/js/blueimp-gallery-indicator.js';
import './../../node_modules/blueimp-gallery/js/blueimp-gallery-fullscreen.js';
import './ReactFactory';
import Slide from './Slide';
import Overlays from './Overlays';
import { get_safe_html_uuid } from './utils';

import './../../node_modules/blueimp-gallery/css/blueimp-gallery.min.css';

class ReactBlueImp extends React.Component {
  constructor(props) {
    super(props);

    const { id } = props;

    this.state = {
      // lets store the original BlueImp gallery instance.
      instance: null,
      // the id for the html elements.
      id: id || get_safe_html_uuid(),
      // here we'll save the custom onopen callback to be
      // called internally with an instance of ReactBlueImp.
      onopenCallback: null,
    };
    // a reference to Slide components useful to render
    // slides with ReactFactory.
    this.slidesByKey = {};
  }

  componentDidMount() {
    const {
      options,
      inlineCarousel,
    } = this.props;

    const { id } = this.state;
    const container = `#${id}`;
    const propOptions = options;
    const setInstance = this._setInstance.bind(this);

    // stores custom event listener
    this.setState({ onopenCallback: propOptions.onopen });
    // overwrites with internal onopen handler
    propOptions.onopen = () => setTimeout(this._onOpen.bind(this));

    // initialization of galleries taken from official BlueImp documentation.
    if (inlineCarousel) {
      const gal = Gallery( // eslint-disable-line new-cap
        document.getElementById(`${id}-links`).getElementsByTagName('a'),
        Object.assign({}, {
          container: container,
          carousel: true,
        }, propOptions)
      );
      setInstance(gal);
    } else {
      document.getElementById(`${id}-links`).onclick = function (event) {
        event = event || window.event;
        const target = event.target || event.srcElement;
        const link = target.parentNode;
        const opts = Object.assign({}, {
          index: link,
          event: event,
          container: container,
        }, propOptions);
        const links = this.getElementsByTagName('a');
        const gal = Gallery(links, opts); // eslint-disable-line new-cap
        setInstance(gal);
      };
    }
  }

  render() {
    return (
      <div>
        { this._getElements() }
        { this._getControls() }
      </div>
    );
  }

  _onOpen() {
    const {
      onopenCallback,
      instance,
    } = this.state;

    const openCallback = onopenCallback || (f => f);
    openCallback(instance);
  }

  _setInstance(instance) {
    // gives to Gallery a reference to ReactBlueImp,
    // needed on ReactFactory slides
    instance.reactGallery = this;
    // stores Gallery into ReactBlueImp
    this.setState({ instance: instance });
  }

  _getElements() {
    const {
      inlineCarousel,
      className,
      children,
    } = this.props;

    const { id } = this.state;
    const elementsVisibilityStyle = inlineCarousel ? { visibility: 'hidden' } : {};

    return (
      <div id={`${id}-links`} style={elementsVisibilityStyle} className={`${className}-thumbnails`}>

        { children.map((child) => {

          const key = child.key || get_safe_html_uuid();
          this.slidesByKey[key] = child;

          return React.cloneElement(child, { 'data-key': key });
        })}

      </div>
    );
  }

  _getControls() {
    const {
      withControls,
      inlineCarousel,
      className,
      overlays,
    } = this.props;

    const { id } = this.state;
    const withControlsClass = withControls ? 'blueimp-gallery-controls' : '';
    const inlineCarouselClass = inlineCarousel ? 'blueimp-gallery-carousel' : '';
    const classNames = `${withControlsClass} ${inlineCarouselClass} ${className}`;

    return overlays ?
      React.cloneElement(overlays, {
        className: `${overlays.props.className || ''} ${classNames}`,
        id: id,
        noClose: inlineCarousel,
      })
    :
      <Overlays id={id} className={classNames} noClose={inlineCarousel} />;
  }
}

ReactBlueImp.propTypes = {
  id: PropTypes.string,
  withControls: PropTypes.bool,
  inlineCarousel: PropTypes.bool,
  options: PropTypes.object,
  className: PropTypes.string,
  overlays: PropTypes.any,
};

ReactBlueImp.defaultProps = {
  id: null,
  withControls: false,
  inlineCarousel: false,
  options: {},
  className: 'react-blueimp',
  overlays: null,
};

ReactBlueImp.Slide = Slide;
ReactBlueImp.Overlays = Overlays;

export default ReactBlueImp;
