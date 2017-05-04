import React from 'react';
import ReactBlueImp from './../components/ReactBlueImpGallery';

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
        source: 'images/orange.png',
        thumbnail: 'images/thumbnails/orange.png',
        title: 'Oranges',
        'data-description': '🍊🍊🍊',
      }],
      slideCount: 0,
    };
  }
  render() {
    return (
      <ReactBlueImp
        options={{
          onslide: () => this.setState({ slideCount: this.state.slideCount + 1 }),
          onclose: () => this.setState({ slideCount: 0 }),
        }}
      >
        <ReactBlueImp.Slide
          source="images/thumbnails/banana.jpg"
          type="text/react"
          key="MyAutoUpdateSlideContent"
        >
          <MyAutoUpdateSlideContent />
        </ReactBlueImp.Slide>

        <ReactBlueImp.Slide
          source="images/thumbnails/apples.jpg"
          type="text/react"
          synchedData={{ slideCount: this.state.slideCount }}
          key="MySynchedDataSlideContent"
        >
          <MySynchedDataSlideContent />
        </ReactBlueImp.Slide>

        <ReactBlueImp.Slide
          source="images/thumbnails/orange.png"
          type="text/react"
          key="MyReactStaticSlideContent"
        >
          <MyReactStaticSlideContent />
        </ReactBlueImp.Slide>

      </ReactBlueImp>
    );
  }
}

class MySynchedDataSlideContent extends React.Component {
  render() {
    const {
      slideCount,
    } = this.props;
    return <p style={{ color: 'white' }}>DISPLAYED SLIDES COUNT: {slideCount}</p>;
  }
}

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
    return <p style={{ color: 'white' }}>AUTO UPDATES: {this.state.count}</p>;
  }
}

class MyReactStaticSlideContent extends React.Component {
  render() {
    return (
      <p style={{ color: 'white' }}>STATIC CONTENT</p>
    );
  }
}
export default CustomReactSlide;
