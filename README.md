# [React + BlueImp Gallery](https://cosmitar.github.io/reactive-blueimp-gallery/) :sunrise_over_mountains:
### NOW! Your favorite [gallery](https://github.com/blueimp/Gallery) as a React component ;)

This project is a tribute to a wonderful tool as [BlueImp Gallery](https://blueimp.github.io/Gallery/) mixed with an awesome devel sandbox like [Storybook](https://storybooks.js.org/).
As a result we have a useful React component for a flexible slideshow gallery.

### :point_up:How to start
install Reactive Blueimp Gallery in your project
`npm install --save reactive-blueimp-gallery`

### :v:Usage
import the library into your component
```javascript
import ReactGallery from 'reactive-blueimp-gallery';
```

Set a source with minimum requirements
```javascript
const images = [{
  source: 'images/banana.jpg',
}, {
  source: 'images/apples.jpg',
}, {
  source: 'images/orange.jpg',
}];
```

Use the component
```javascript
<ReactGallery source={images} />
```

and that's it! :raised_hands: a working version of BlueImp gallery into your React application :muscle:.

### Options
As a HOC, this lib has some shortcut configurations for a [full list of options](https://github.com/blueimp/Gallery#options) that BlueImp Gallery offers.

ReactBlueImpGallery accepts the following props:

<table class="rich-diff-level-zero">
<thead class="rich-diff-level-one">
<tr><td><b>Property</b></td><td><b>Type</b></td><td><b>Description</b></td></tr>
</thead>
<tbody class="rich-diff-level-one">
<tr>
<td>id</td><td>number</td><td>just an element identifier, attribute rendered into gallery HTML.</td>
</tr>
<tr>
<td>className</td><td>string</td><td>class name to handle presentational aspects, attribute rendered into gallery HTML.</td>
</tr>
<tr>
<td>withControls</td><td>boolean</td><td>to initialize the Gallery with visible controls.

```javascript
<ReactGallery withControls>
  ...
</ReactGallery>
```
</td>
</tr>
<tr>
<td>inlineCarousel</td><td>boolean</td><td>to display the images in an inline carousel instead of a lightbox.

```javascript
<ReactGallery inlineCarousel>
  ...
</ReactGallery>
```
</td>
</tr>
<tr>
<td>options</td><td>object</td><td>to send to BlueImp Gallery any of the <a href="https://github.com/blueimp/Gallery#options">supported options</a>.

```javascript
<ReactGallery
  options={{
    transitionSpeed: 200,
  }}
>
  ...
</ReactGallery>
```
</td>
</tr>
<tr>
<td>overlays</td><td>ReactBlueImpGallery.Overlays</td><td>to send custom overlays for slides. Lets talk about this in the <a href="https://github.com/Cosmitar/reactive-blueimp-gallery#custom-overlays">next section</a>.
</td>
</tr>
</tbody>
</table>

And finally, into `options` prop you can find a useful custom event `onopen` that return the original BlueImp Gallery instance allowing API control. See full API methods [here](https://github.com/blueimp/Gallery#api-methods)

```javascript
<ReactGallery
  options={{
    onopen: gal => gal.pause(),
  }}
>
...
</ReactGallery>
```
### Custom Overlays
Reactive BlueImp Gallery come with a helper component to customize slides overlay. `Overlays` component allows you to include extra HTML elements over a slide and also has props to quick set up for existing elements. `Overlays` is part of `ReactBlueImpGallery` and can be accesed as an attribute of it.
```javascript
const customOverlays = (
  <ReactGallery.Overlays>
    <p className="footer-copywrite">&reg; 2017 All rights reserved</p>
  </ReactGallery.Overlays>
);
<ReactGallery
  overlays={customOverlays}
>
...
</ReactGallery>
```

In the example above we're adding a `<p>` element into default slide overlay. Also you can define `Overlays` props

:nut_and_bolt:`className` to specify overlay CSS.

:nut_and_bolt:`noTitle` to hide default title element.

:nut_and_bolt:`noArrows` to hide default arrows (next/prev) elements.

:nut_and_bolt:`noClose` to hide default close (x) element.

:nut_and_bolt:`noPlayPause` to hide default play/pause element.

:nut_and_bolt:`noIndicator` to hide default slide indicator (ooo) elements.

```javascript
<ReactGallery
  overlays={<ReactGallery.Overlays noPlayPause noTitle />}
>
...
</ReactGallery>
```

### Slides
The slide component it also comes as `ReactBlueImpGallery` property. In the first example of this page, the slide component is receiving just one prop but they can accept others.

:nut_and_bolt:`source` for image or video resource, this is an alias of `href` also valid for images but not for video slides.

:nut_and_bolt:`thumbanil` to set a resource to show in thumbanils. `source` will be used if `thumbnails` is undefined.

:nut_and_bolt:`type` to set slide mime type. `image/jpeg` by default.

:nut_and_bolt:`title` info to show in the slide overlay.

### :sparkles: Slides with React content :rocket:
BlueImp Gallery supports different [slide types](https://github.com/blueimp/Gallery#additional-content-types) with a very good approach to customize content types. This way it supports HTML5, Youtube and Vimeo videos. Taking advantage of that smart design, this lib add a new content type to handle slide content with React components.

The content type is `text/react` (no real mime type for React) and you can implement your React component like the following example.
```javascript
const MyReactSlideContent = () => {
  return <p>My React slide content</p>;
}

...

<ReactGallery>
  <ReactGallery.Slide
    thumbnail="images/thumbnails/banana.jpg"
    type="text/react" // to tell BlueImp Gallery which slide factory should use
  >
    <MyReactSlideContent />
  </ReactGallery.Slide>
</ReactGallery>
```
Of course you can have (or you'll need in real life scenarios) dynamic data into your React slide content, but if you need data from a parent component there's a little bit complex issue to solve. Since BlueImp Gallery is in charge of the slide render with vanilla javascript, React lost control of that HTML. In order to let React to render the slides, we're calling ReactDom method to draw custom component into the slide, but that way the scope of the component you wrote and the scope of the instance of your component into the slide are different. Then, a solution is an explicit definition of the data which should be sent to rendered instance of your componente. That can be achived setting a `Slide` prop called `SynchedData` like this
```javascript
const MyReactSlideContent = ({ slideCount }) => {
  return <p>My React slide content with {slideCount}</p>;
}

...

<ReactGallery>
  <ReactGallery.Slide
    thumbnail="images/thumbnails/banana.jpg"
    type="text/react" // to tell BlueImp Gallery which slide factory should use
    synchedData={{ slideCount: this.state.slideCount }} // this prop will be sent to <MyReactSlideContent />
  >
    <MyReactSlideContent />
   </ReactGallery.Slide>
</ReactGallery>
```
Though this approach really works (you can [see it here](https://cosmitar.github.io/reactive-blueimp-gallery/?selectedKind=React%20BlueImp%20Gallery&selectedStory=Custom%20React%20slide%20content&full=0&down=1&left=1&panelRight=0&downPanel=kadirahq%2Fstorybook-addon-actions%2Factions-panel)), you sould be very cautious about implementing React components architecture into slide contents.

### Test and working examples
You can find many full working examples into [./stories](https://github.com/Cosmitar/reactive-blueimp-gallery/tree/master/stories) folder.

clone this repo

`git clone https://github.com/Cosmitar/reactive-blueimp-gallery.git`

install dependecies

`npm i`

start storybook

`npm run storybook`

Have fun :tada:

### Contributing
Pull requests and issues are welcome. If you've found a bug, please open an issue.

### License
MIT
