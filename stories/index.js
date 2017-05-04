import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import ReactBlueImp from './../components/ReactBlueImpGallery';
import APIControlled from './APIControlled';
import CustomOverlays from './CustomOverlays';
import CustomThumbnails from './CustomThumbnails';
import CustomReactSlide from './CustomReactSlide';
import './_index.css';

const minimumSource = [{
  source: 'images/banana.jpg',
}, {
  source: 'images/apples.jpg',
}, {
  source: 'images/orange.png',
}];
const source1 = [{
  source: 'images/banana.jpg',
  thumbnail: 'images/thumbnails/banana.jpg',
  title: 'Bananas',
}, {
  source: 'images/apples.jpg',
  thumbnail: 'images/thumbnails/apples.jpg',
  title: 'Apples',
}, {
  source: 'images/orange.png',
  thumbnail: 'images/thumbnails/orange.png',
  title: 'Oranges',
}];

const source2 = [{
  source: 'images/tomato.jpg',
  thumbnail: 'images/thumbnails/tomato.jpg',
  title: 'Tomatoes',
}, {
  source: 'images/onion.jpg',
  thumbnail: 'images/thumbnails/onion.jpg',
  title: 'Onions',
}];

const source3 = [{
  title: 'Fruits',
  href: 'http://0.s3.envato.com/h264-video-previews/80fad324-9db4-11e3-bf3d-0050569255a8/490527.mp4',
  type: 'video/mp4',
  poster: 'images/thumbnails/onion.jpg',
}, {
  href: 'images/banana.jpg',
  thumbnail: 'images/thumbnails/banana.jpg',
  title: 'Bananas',
}, {
  title: 'A YouYube video',
  href: 'https://www.youtube.com/watch?v=vvjOTLQ1nSQ',
  type: 'text/html',
  'data-youtube': 'vvjOTLQ1nSQ',
  poster: 'https://img.youtube.com/vi/vvjOTLQ1nSQ/maxresdefault.jpg',
}];

storiesOf('React BlueImp Gallery', module)
  .add('Basic usage', () => {
    return (
      <ReactBlueImp>
        { minimumSource.map((item) => {
          return <ReactBlueImp.Slide { ...item } key={ item.source } />;
        })}
      </ReactBlueImp>
    );
  })
  .add('With event callbacks', () => {
    return (
      <ReactBlueImp
        options={{
          // onopen callback you'll get the Gallery instance.
          onopen: g => action('open')(g),
          // for other callback params see official documentation
          onopened: action('opened'),
          onslide: action('slide'),
          onslideend: action('slideend'),
          onslidecomplete: action('slidecomplete'),
          onclose: action('close'),
          onclosed: action('closed'),
        }}
      >
        { source1.map((item) => {
          return <ReactBlueImp.Slide { ...item } key={ item.source } />;
        })}
      </ReactBlueImp>
    );
  })
  .add('Multiple galleries', () => (
    <div>
      {[source1, source2].map((source, index) => {
        return (
          <ReactBlueImp key={index}>
            { source.map((item) => {
              return <ReactBlueImp.Slide { ...item } key={ item.source } />;
            })}
          </ReactBlueImp>
        );
      })}
    </div>
  ))
  .add('Mixed content: images & videos', () => (
    <ReactBlueImp>
      { source3.map((item) => {
        return <ReactBlueImp.Slide {...item} key={ item.href } />;
      })}
    </ReactBlueImp>
  ))
  .add('Inline carousel', () => (
    <ReactBlueImp
      inlineCarousel
    >
      { source1.map((item) => {
        return <ReactBlueImp.Slide { ...item } key={ item.source } />;
      })}
    </ReactBlueImp>
  ))
  .add('API controlled carousel', () => (
    <APIControlled />
  ))
  .add('Custom overlays', () => (
    <CustomOverlays />
  ))
  .add('Custom thumbnails', () => (
    <CustomThumbnails />
  ))
  .add('Custom React slide content', () => (
    <CustomReactSlide />
  ));
