import React from 'react';
import ReactGallery from './../components/ReactBlueImpGallery';

const source = [{
  href: 'images/banana.jpg',
  title: 'Bananas',
  'data-description': '🍌',
}, {
  href: 'images/apples.jpg',
  title: 'Apples',
  'data-description': '🍎',
}, {
  href: 'images/orange.jpg',
  title: 'Oranges',
  'data-description': '🍊',
}];

class CustomThumbnails extends React.Component {
  render() {
    return (
      <ReactGallery className="emoji">
        { source.map((item) => {
          const template = (
            <a {...item}
              style={{ display: 'inline-block', margin: '0 5px', textDecoration: 'none' }}
            >
              <p>{item['data-description']}</p>
            </a>
          );
          return <ReactGallery.Slide {...item} key={ item.href } template={template} />;
        })}
      </ReactGallery>
    );
  }
}

export default CustomThumbnails;
