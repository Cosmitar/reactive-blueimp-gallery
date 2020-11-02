import React from 'react';
import ReactGallery from './../components/ReactBlueImpGallery';
import './_CustomReactSlide.css';

class CustomReactSlide extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      source: [{
        source: 'images/banana.jpg',
        thumbnail: 'images/thumbnails/banana.jpg',
        title: 'Bananas',
        'data-description': '🍌🍌🍌',
      }, {
        source: 'images/apples.jpg',
        thumbnail: 'images/thumbnails/apples.jpg',
        title: 'Apples',
        'data-description': '🍎🍎🍎',
      }, {
        source: 'images/orange.jpg',
        thumbnail: 'images/thumbnails/orange.jpg',
        title: 'Oranges',
        'data-description': '🍊🍊🍊',
      }],
      slideCount: 0,
    };
  }
  render() {
    return (
      <ReactGallery
        options={{
          onslide: () => this.setState({ slideCount: this.state.slideCount + 1 }),
          onclose: () => this.setState({ slideCount: 0 }),
        }}
        withControls
      >

        <ReactGallery.Slide
          thumbnail="images/thumbnails/banana.jpg"
          type="text/react"
        >
          <MyReactStaticSlideContent />
        </ReactGallery.Slide>

        <ReactGallery.Slide
          thumbnail="images/thumbnails/apples.jpg"
          type="text/react"
        >
          <MyAutoUpdateSlideContent />
        </ReactGallery.Slide>

        <ReactGallery.Slide
          thumbnail="images/thumbnails/orange.jpg"
          type="text/react"
          synchedData={{ slideCount: this.state.slideCount }}
        >
          <MySynchedDataSlideContent />
        </ReactGallery.Slide>
      </ReactGallery>
    );
  }
}

const MySynchedDataSlideContent = ({ slideCount }) => {
  return <div className="react-slide synched-content">
    <p style={{ color: 'white' }}>
      DISPLAYED SLIDES COUNT: {slideCount}<br/>
      <span style={{ fontSize: 15 }}>This content updates from parent component state, linked to onslide action of BlueImp Gallery.</span>
    </p>

  </div>;
};

class MyAutoUpdateSlideContent extends React.Component {
  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
    this.state = {
      count: 0,
    };
  }

  tick() {
    this.setState({ count: this.state.count + 1 });
  }

  componentDidMount() {
    this.interval = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return <div className="react-slide self-update-content">
      <p style={{ color: 'white' }}>
        AUTO UPDATES: {this.state.count}<br/>
        <span style={{ fontSize: 15 }}>This content updates from a timer triggered inside the same component.</span>
      </p>
    </div>;
  }
}

const MyReactStaticSlideContent = () => {
  return <div className="react-slide static-content">
    <p style={{ color: 'white' }}>
      STATIC CONTENT<br/>
      This content is generated by a React component.
    </p>
  </div>;
};

export default CustomReactSlide;