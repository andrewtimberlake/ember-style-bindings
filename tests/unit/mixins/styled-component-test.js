import EmberObject from '@ember/object';
import StyledComponentMixin from 'ember-style-bindings/mixins/styled-component';
import { module, test } from 'qunit';

module('Unit | Mixin | styled component', function() {
  test('it does nothing to a component that has no styleBindings property', function(assert) {
    let StyledComponentObject = EmberObject.extend(StyledComponentMixin);
    let subject = StyledComponentObject.create();

    assert.equal(subject.styleBindings, undefined);
    assert.equal(subject.attributeBindings, undefined);
    assert.equal(subject.get('style'), undefined);
  });

  test('it adds a style property and style attribute binding when the styleBindings property is present', function(assert) {
    let StyledComponentObject = EmberObject.extend(StyledComponentMixin, {
      styleBindings: ['height', 'theWidth:width'], // eslint-disable-line
      theWidth: '25px',
      height: '50px'
    });
    let subject = StyledComponentObject.create();

    assert.equal(subject.attributeBindings[0], 'style');
    assert.equal(subject.get('style').toHTML(), 'height:50px;width:25px');
  });

  test('it adds an explicit pixel extension to numbers', function(assert) {
    let StyledComponentObject = EmberObject.extend(StyledComponentMixin, {
      styleBindings: ['height', 'theWidth:width'], // eslint-disable-line
      theWidth: 25,
      height: 50
    });
    let subject = StyledComponentObject.create();

    assert.equal(subject.get('style').toHTML(), 'height:50px;width:25px');
  });

  test('it dynamically updates when bound properties change', function(assert) {
    let StyledComponentObject = EmberObject.extend(StyledComponentMixin, {
      styleBindings: ['height', 'theWidth:width'], // eslint-disable-line
      theWidth: 25,
      height: 50
    });
    let subject = StyledComponentObject.create();

    assert.equal(subject.get('style').toHTML(), 'height:50px;width:25px');

    subject.set('theWidth', 50);

    assert.equal(subject.get('style').toHTML(), 'height:50px;width:50px');
  });

  test('it does not add a pixel extension to "unitless" numbers', function(assert) {
    let StyledComponentObject = EmberObject.extend(StyledComponentMixin, {
      styleBindings: ['opacity', 'zIndex:z-index'], // eslint-disable-line
      opacity: 1,
      zIndex: 99
    });
    let subject = StyledComponentObject.create();

    assert.equal(subject.get('style').toHTML(), 'opacity:1;z-index:99');
  });

  test('it accepts camelized property names', function(assert) {
    let StyledComponentObject = EmberObject.extend(StyledComponentMixin, {
      styleBindings: ['zIndex', 'backgroundColor', 'whiteSpace'], // eslint-disable-line
      zIndex: 99,
      backgroundColor: 'red',
      whiteSpace: 'nowrap'
    });
    let subject = StyledComponentObject.create();

    assert.equal(subject.get('style').toHTML(), 'z-index:99;background-color:red;white-space:nowrap');
  });

  test('it includes static styles', function(assert) {
    let StyledComponentObject = EmberObject.extend(StyledComponentMixin, {
      styles: { // eslint-disable-line
        top: 0,
        left: 0,
        zIndex: 99
      }
    });
    let subject = StyledComponentObject.create();

    assert.equal(subject.get('style').toHTML(), 'top:0px;left:0px;z-index:99');
  });

  test('it will combine static and dynamic styles', function(assert) {
    let StyledComponentObject = EmberObject.extend(StyledComponentMixin, {
      styleBindings: ['theWidth:width'], // eslint-disable-line
      styles: { // eslint-disable-line
        top: 0,
        left: 0,
        zIndex: 99
      },
      theWidth: 50
    });
    let subject = StyledComponentObject.create();

    assert.equal(subject.get('style').toHTML(), 'width:50px;top:0px;left:0px;z-index:99');
  });
});
