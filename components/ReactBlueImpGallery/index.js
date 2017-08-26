import React from 'react';
import PropTypes from 'prop-types';
import Gallery from 'blueimp-gallery';

import 'blueimp-gallery-path/js/blueimp-gallery-video.js';
import 'blueimp-gallery-path/js/blueimp-gallery-youtube.js';
import 'blueimp-gallery-path/js/blueimp-gallery-vimeo.js';
import 'blueimp-gallery-path/js/blueimp-gallery-indicator.js';
import 'blueimp-gallery-path/js/blueimp-gallery-fullscreen.js';
import 'blueimp-gallery-path/css/blueimp-gallery.min.css';

import './ReactFactory';
import Slide from './Slide';
import Overlays from './Overlays';
import { get_safe_html_uuid, object_to_key, constants } from './utils';


class ReactBlueImpGallery extends React.Component {
  constructor(props) {
    super(props);

    const { id } = props;

    this.state = {
      // lets store the original BlueImp gallery instance.
      instance: null,
      // the id for the html elements.
      id: id || get_safe_html_uuid(),
      // here we'll save the custom onopen callback to be
      // called internally with an instance of ReactBlueImpGallery.
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
        let link = target;
        // link detection based on an allways present data-trigger attribute
        while (!link.getAttribute('data-trigger')) {
          link = link.parentNode;
        }
        const links = this.getElementsByTagName('a');
        const opts = Object.assign({}, {
          index: link,
          event: event,
          container: container,
        }, propOptions);
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
    // gives to Gallery a reference to ReactBlueImpGallery,
    // needed on ReactFactory slides
    instance.reactGallery = this;
    // stores Gallery into ReactBlueImpGallery
    this.setState({ instance: instance });
  }

  _getElements() {
    const {
      inlineCarousel,
      className,
      children,
      source,
    } = this.props;

    const { id } = this.state;
    const elementsVisibilityStyle = inlineCarousel ? { visibility: 'hidden' } : {};
    const customClassName = className ? `${className}-thumbnails` : '';

    return (
      <div id={`${id}-links`} style={elementsVisibilityStyle} className={`${customClassName} ${constants.DEFAULT_CLASS_NAME}-thumbnails`}>

        { source.length ?
          source.map((src) => {
            return (
              <Slide { ...src } key={ src.source } />
            );
          })
          :
          children.map((child) => {
            const key = child.key || object_to_key(child.props);
            this.slidesByKey[key] = child;
            return React.cloneElement(child, { key, 'data-key': key });
          })
        }

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
    const classNames = `${withControlsClass} ${inlineCarouselClass} ${className} ${constants.DEFAULT_CLASS_NAME}`;

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

ReactBlueImpGallery.propTypes = {
  id: PropTypes.string,
  withControls: PropTypes.bool,
  inlineCarousel: PropTypes.bool,
  options: PropTypes.object,
  className: PropTypes.string,
  overlays: PropTypes.any,
  source: PropTypes.array,
};

ReactBlueImpGallery.defaultProps = {
  id: null,
  withControls: false,
  inlineCarousel: false,
  options: {},
  className: '',
  overlays: null,
  source: [],
};

ReactBlueImpGallery.Slide = Slide;
ReactBlueImpGallery.Overlays = Overlays;

export default ReactBlueImpGallery;
