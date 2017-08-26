import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import ReactGallery from './../components/ReactBlueImpGallery';
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
  source: 'images/orange.jpg',
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
  source: 'images/orange.jpg',
  thumbnail: 'images/thumbnails/orange.jpg',
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
  title: 'Back to school',
  href: 'http://0.s3.envato.com/h264-video-previews/80fad324-9db4-11e3-bf3d-0050569255a8/490527.mp4',
  type: 'video/mp4',
  poster: 'images/thumbnails/back-to-school.jpg',
}, {
  href: 'images/banana.jpg',
  thumbnail: 'images/thumbnails/banana.jpg',
  title: 'Bananas',
}, {
  title: 'A YouYube video',
  href: 'https://www.youtube.com/watch?v=6v2L2UGZJAM',
  type: 'text/html',
  'data-youtube': '6v2L2UGZJAM',
  poster: 'https://img.youtube.com/vi/6v2L2UGZJAM/maxresdefault.jpg',
}];

storiesOf('React BlueImp Gallery', module)
  .add('Basic usage', () => {
    return (
      <ReactGallery source={minimumSource} />
    );
  })
  .add('With event callbacks', () => {
    return (
      <ReactGallery
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
          return <ReactGallery.Slide { ...item } key={ item.source } />;
        })}
      </ReactGallery>
    );
  })
  .add('Multiple galleries', () => (
    <div>
      {[source1, source2].map((source, index) => {
        return (
          <ReactGallery key={index}>
            { source.map((item) => {
              return <ReactGallery.Slide { ...item } key={ item.source } />;
            })}
          </ReactGallery>
        );
      })}
    </div>
  ))
  .add('Mixed content: images & videos', () => (
    <ReactGallery withControls options={{ youTubeClickToPlay: false }}>
      { source3.map((item) => {
        return <ReactGallery.Slide {...item} key={ item.href } />;
      })}
    </ReactGallery>
  ))
  .add('Inline carousel', () => (
    <ReactGallery
      inlineCarousel
    >
      { source1.map((item) => {
        return <ReactGallery.Slide { ...item } key={ item.source } />;
      })}
    </ReactGallery>
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
