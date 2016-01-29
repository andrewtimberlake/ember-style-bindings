import Ember from 'ember';
import StyledComponentMixin from 'ember-style-bindings/mixins/styled-component';
import { module, test } from 'qunit';

module('Unit | Mixin | styled component');

test('it does nothing to a component that has no styleBindings property', function(assert) {
  let StyledComponentObject = Ember.Object.extend(StyledComponentMixin);
  let subject = StyledComponentObject.create();

  assert.equal(subject.styleBindings, undefined);
  assert.equal(subject.attributeBindings, undefined);
  assert.equal(subject.get('style'), undefined);
});

test('it adds a style property and style attribute binding when the styleBindings property is present', function(assert) {
  let StyledComponentObject = Ember.Object.extend(StyledComponentMixin, {
    styleBindings: ['height', 'theWidth:width'],
    theWidth: '25px',
    height: '50px'
  });
  let subject = StyledComponentObject.create();

  assert.equal(subject.attributeBindings[0], 'style');
  assert.equal(subject.get('style').toHTML(), 'height:50px;width:25px');
});

test('it adds an explicit pixel extension to numbers', function(assert) {
  let StyledComponentObject = Ember.Object.extend(StyledComponentMixin, {
    styleBindings: ['height', 'theWidth:width'],
    theWidth: 25,
    height: 50
  });
  let subject = StyledComponentObject.create();

  assert.equal(subject.get('style').toHTML(), 'height:50px;width:25px');
});

test('it does not add a pixel extension to "unitless" numbers', function(assert) {
  let StyledComponentObject = Ember.Object.extend(StyledComponentMixin, {
    styleBindings: ['opacity', 'zIndex:z-index'],
    opacity: 1,
    zIndex: 99
  });
  let subject = StyledComponentObject.create();

  assert.equal(subject.get('style').toHTML(), 'opacity:1;z-index:99');
});

test('it accepts camelized property names', function(assert) {
  let StyledComponentObject = Ember.Object.extend(StyledComponentMixin, {
    styleBindings: ['zIndex', 'backgroundColor', 'whiteSpace'],
    zIndex: 99,
    backgroundColor: 'red',
    whiteSpace: 'nowrap'
  });
  let subject = StyledComponentObject.create();

  assert.equal(subject.get('style').toHTML(), 'z-index:99;background-color:red;white-space:nowrap');
});

test('it includes static styles', function(assert) {
  let StyledComponentObject = Ember.Object.extend(StyledComponentMixin, {
    styles: {
      top: 0,
      left: 0,
      zIndex: 99
    }
  });
  let subject = StyledComponentObject.create();

  assert.equal(subject.get('style').toHTML(), 'top:0px;left:0px;z-index:99');
});

test('it will combine static and dynamic styles', function(assert) {
  let StyledComponentObject = Ember.Object.extend(StyledComponentMixin, {
    styleBindings: ['theWidth:width'],
    styles: {
      top: 0,
      left: 0,
      zIndex: 99
    },
    theWidth: 50
  });
  let subject = StyledComponentObject.create();

  assert.equal(subject.get('style').toHTML(), 'width:50px;top:0px;left:0px;z-index:99');
});

test('it generates the correct style for the README', function(assert) {
  let StyledComponentObject = Ember.Object.extend(StyledComponentMixin, {
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
  let subject = StyledComponentObject.create();

  assert.equal(subject.get('style').toHTML(), 'height:50px;width:100px;z-index:99;position:absolute;top:0px;left:0px;white-space:nowrap');
});
