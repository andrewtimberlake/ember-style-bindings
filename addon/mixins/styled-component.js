import Ember from 'ember';

const { computed, defineProperty, Handlebars, Mixin } = Ember;
const { camelize } = Ember.String;
const { SafeString } = Handlebars;

// Thanks to ember-computed-style
// Lifted from React
const isUnitlessNumber = {
  animationIterationCount: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridRow: true,
  gridColumn: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,

  // SVG-related properties
  fillOpacity: true,
  stopOpacity: true,
  strokeDashoffset: true,
  strokeOpacity: true,
  strokeWidth: true
};

export default Mixin.create({
  concatenatedProperties: ['styleBindings'],

  init() {
    this._super(...arguments);

    if(this.styleBindings) {
      this.styleBindings = Ember.A(this.styleBindings.slice());
      this.attributeBindings = ['style'];

      let styleKeys = this.styleBindings.map((binding) => {
        return binding.split(':')[0];
      });
      defineProperty(this, 'style', computed(...styleKeys, this._buildStyles));
    }
  },

  _buildStyles() {
    let styles = this.styleBindings.map((binding) => {
      let [key, property] = binding.split(':');
      if(!property) { property = key; }
      return this._fixStyles(property, this.get(key)).join(':');
    });
    // console.log('styles', styles);
    return new SafeString(styles.join(';'));
  },

  _fixStyles(property, value) {
    let isNumber = !isNaN(value) && isFinite(value);
    if(isNumber && !isUnitlessNumber[camelize(property)]) {
      value = value + 'px';
    }
    return [property, value];
  }
});
