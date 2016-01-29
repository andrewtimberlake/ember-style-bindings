# Ember-style-bindings [![Build Status](https://travis-ci.org/andrewtimberlake/ember-style-bindings.svg?branch=master)](https://travis-ci.org/andrewtimberlake/ember-style-bindings)

Provides a way to dynamically build up an inline style attribute for compoonents in a manner simmilar to `classNameBindings`.

## Usage

```javascript
import StyledComponentMixin from 'ember-style-bindings/mixins/styled-component';

export default Ember.Component.extend(StyledComponentMixin, {
  // A list of CSS properties to be included.
  //   height is pulled from a property named height
  //   width is pulled from a property named theWidth
  //   z-index is correctly named and pulled from the zIndex property
  // styleBindings are inherited from superclasses.
  styleBindings: ['height', 'theWidth:width', 'zIndex'],

  // You can easily include static styles using the styles property (optional)
  //  property names are correctly dasherized
  styles: {
    position: 'absolute',
    top: 0,
    left: 0,
    whiteSpace: 'nowrap'
  },

  height: Ember.computed(function() {
    // do your height calculations
    return 50;
  }),

  theWidth: Ember.computed(function() {
    // do your width calculations
    return 100;
  }),

  zIndex: Ember.computed(function() {
    // do your positional calculations
    return 99;
  })
});
```

The above component will proced HTML as follows
```html
<div style="height:50px;width:100px;z-index:99;position:absolute;top:0px;left:0px;white-space:nowrap"></div>
```

**NOTE** This addon uses `attributeBindings: ['style']` and a `style` property to work.

## Instaling

`ember install ember-style-bindings`

## Developing

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
