import React from 'react';
import ReactBlueImp from './../components/ReactBlueImpGallery';
import './_CustomOverlays.css';

class CustomOverlays extends React.Component {
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
      currentIndex: 0,
    };
  }
  render() {
    const overlays = (
      <ReactBlueImp.Overlays noArrows>
        <p className="description">{this.state.source[this.state.currentIndex]['data-description']}</p>
        <a className="prev" style={{ border: 0, background: 'transparent', fontSize: 45 }}>◀️</a>
        <a className="next" style={{ border: 0, background: 'transparent', fontSize: 45 }}>▶️</a>
      </ReactBlueImp.Overlays>
    );
    return (
      <ReactBlueImp
        options={{
          onslide: index => this.setState({ currentIndex: index }),
        }}
        withControls
        overlays={overlays}
      >
        { this.state.source.map((item) => {
          return <ReactBlueImp.Slide {...item} key={ item.source } />;
        })}
      </ReactBlueImp>
    );
  }
}

export default CustomOverlays;
