import React from 'react';
import ReactDOM from 'react-dom';
import Gallery from 'blueimp-gallery';
import Slide from './Slide';
import { constants } from './utils';

const textFactory = Gallery.prototype.textFactory;
Gallery.prototype.textFactory = function (obj, callback) {
  let retVal = null;
  if (obj.type === constants.REACT_MIME_TYPE) {
    const element = document.createElement('DIV');
    element.setAttribute('class', 'react-content');
    element.setAttribute('title', obj.getAttribute('title'));

    setTimeout(() => {
      const slide = this.reactGallery.slidesByKey[obj.getAttribute('data-key')];
      ReactDOM.render(
        <Slide.Connect wrappedComponent={React.Children.only(slide.props.children)} />,
        element
      );
      callback({
        type: 'load',
        target: element,
      });
    });
    retVal = element;
  } else {
    retVal = textFactory.call(this, obj, callback);
  }

  return retVal;
};
