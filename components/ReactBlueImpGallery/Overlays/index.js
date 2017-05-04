import React from 'react';
import PropTypes from 'prop-types';

class Overlays extends React.Component {
  render() {
    const {
      id,
      className,
      children,
      noTitle,
      noArrows,
      noClose,
      noPlayPause,
      noIndicator,
    } = this.props;

    const titleElement = noTitle ? null : <h3 className="title"></h3>;
    const prevArrowElement = noArrows ? null : <a className="prev">‹</a>;
    const nextArrowElement = noArrows ? null : <a className="next">›</a>;
    const closeElement = noClose ? null : <a className="close">×</a>;
    const playPauseElement = noPlayPause ? null : <a className="play-pause"></a>;
    const indicatorElement = noIndicator ? null : <ol className="indicator"></ol>;
    { /* The Gallery as lightbox dialog, should be a child element of the document body */ }
    return (
      <div
        id={id}
        className={`blueimp-gallery ${className}`}
      >
          <div className="slides"></div>
          { titleElement }
          { children }
          { prevArrowElement }
          { nextArrowElement }
          { closeElement }
          { playPauseElement }
          { indicatorElement }
      </div>
    );
  }
}

Overlays.PropTypes = {
  id: PropTypes.string.isRequired,
  noClose: PropTypes.bool,
  noTitle: PropTypes.bool,
  noArrows: PropTypes.bool,
  noPlayPause: PropTypes.bool,
  noIndicator: PropTypes.bool,
};

Overlays.defaultProps = {
  noClose: false,
  noTitle: false,
  noArrows: false,
  noPlayPause: false,
  noIndicator: false,
};

export default Overlays;
