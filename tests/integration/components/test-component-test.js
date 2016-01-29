import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('test-component', 'Integration | Component | test component', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{test-component}}`);

  let $view = this.$('> .ember-view');
  assert.equal($view.attr('style'), 'height:50px;width:100px;z-index:99;position:absolute;top:0px;left:0px;white-space:nowrap');
});
