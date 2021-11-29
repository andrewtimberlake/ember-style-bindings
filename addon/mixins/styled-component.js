import { A } from "@ember/array";
import { dasherize, camelize, htmlSafe } from "@ember/string";
import { defineProperty, computed } from "@ember/object";
import Mixin from "@ember/object/mixin";

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
  strokeWidth: true,
};

export default Mixin.create({
  concatenatedProperties: ["styleBindings"],

  init() {
    this._super(...arguments);

    if (this.styleBindings || this.styles) {
      let styleKeys = ["styles"];
      if (this.styleBindings) {
        this.styleBindings = A(this.styleBindings.slice());
        this.styleBindings.forEach(function (binding) {
          styleKeys.push(binding.split(":")[0]);
        });
      }
      if (this.attributeBindings) {
        const attrb = this.attributeBindings.slice(0);
        attrb.push("style");
        this.attributeBindings = attrb;
      } else {
        this.attributeBindings = ["style"];
      }

      defineProperty(this, "style", computed(...styleKeys, this._buildStyles));
    }
  },

  _buildStyle(property, value) {
    if (typeof value === "undefined" || value === null) {
      return null;
    } else {
      return this._fixStyles(property, value).join(":");
    }
  },

  _buildStyles() {
    let styles = [];
    if (this.styleBindings) {
      this.styleBindings.forEach((binding) => {
        let [key, property] = binding.split(":");
        if (!property) {
          property = key;
        }
        styles.push(this._buildStyle(property, this.get(key)));
      });
    }
    if (this.styles) {
      Object.keys(this.styles).forEach((key) => {
        styles.push(this._buildStyle(key, this.get("styles." + key)));
      });
    }
    // console.log('styles', styles);
    return htmlSafe(styles.filter((el) => el).join(";"));
  },

  _fixStyles(property, value) {
    let isNumber = !isNaN(value) && isFinite(value);
    if (isNumber && !isUnitlessNumber[camelize(property)]) {
      value = value + "px";
    }
    return [dasherize(property), value];
  },
});
