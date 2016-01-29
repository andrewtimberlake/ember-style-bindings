import Ember from 'ember';
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
