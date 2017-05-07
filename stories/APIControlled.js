import React, { Component } from 'react';
import ReactGallery from './../components/ReactBlueImpGallery';

class APIControlled extends Component {
  constructor(props) {
    super(props);
    this._onLoad = this._onLoad.bind(this);
    this._nextSlide = this._nextSlide.bind(this);
    this._prevSlide = this._prevSlide.bind(this);
    this.state = {
      galleryInstance: null,
      source: [{
        source: 'images/banana.jpg',
        thumbnail: 'images/thumbnails/banana.jpg',
        title: 'Bananas',
        'data-description': '🍌',
      }, {
        source: 'images/apples.jpg',
        thumbnail: 'images/thumbnails/apples.jpg',
        title: 'Apples',
        'data-description': '🍎',
      }, {
        source: 'images/orange.jpg',
        thumbnail: 'images/thumbnails/orange.jpg',
        title: 'Oranges',
        'data-description': '🍊',
      }],
    };
  }

  render() {
    return (
      <div>
        <button onClick={this._nextSlide}>next slide</button>
        <button onClick={this._prevSlide}>prev slide</button>
        {this.state.source.map((item, index) => {
          return (
            <button onClick={this._slideTo.bind(this, index)} key={index}>{`Go to slide ${index + 1} ${item['data-description']}`}</button>
          );
        })}
        <ReactGallery inlineCarousel options={{ onopen: this._onLoad }}>
          { this.state.source.map((item) => {
            return <ReactGallery.Slide { ...item } key={ item.source } />;
          })}
        </ReactGallery>
      </div>
    );
  }

  _onLoad(gal) {
    this.setState({ galleryInstance: gal });
  }

  _nextSlide() {
    this.state.galleryInstance.next();
  }

  _prevSlide() {
    this.state.galleryInstance.prev();
  }

  _slideTo(index) {
    this.state.galleryInstance.slide(index);
  }
}

export default APIControlled;
