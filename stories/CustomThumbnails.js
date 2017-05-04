import React from 'react';
import ReactBlueImp from './../components/ReactBlueImpGallery';

const source = [{
  href: 'images/banana.jpg',
  title: 'Bananas',
  'data-description': '🍌🍌🍌',
}, {
  href: 'images/apples.jpg',
  title: 'Apples',
  'data-description': '🍎🍎🍎',
}, {
  href: 'images/orange.png',
  title: 'Oranges',
  'data-description': '🍊🍊🍊',
}];

class CustomThumbnails extends React.Component {
  render() {
    return (
      <ReactBlueImp>
        { source.map((item) => {
          const template = (
            <a {...item}
              style={{ display: 'inline-block', margin: '0 5px', textDecoration: 'none' }}
            >
              <p>{item['data-description']}</p>
            </a>
          );
          return <ReactBlueImp.Slide {...item} key={ item.href } template={template} />;
        })}
      </ReactBlueImp>
    );
  }
}

export default CustomThumbnails;
