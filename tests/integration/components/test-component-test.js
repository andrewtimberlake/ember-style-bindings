import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | test component', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    await render(hbs`{{test-component}}`);

    let $view = this.element.querySelector('.ember-view');
    assert.equal($view.getAttribute('style'), 'height:50px;width:100px;z-index:99;position:absolute;top:0px;left:0px;white-space:nowrap');
  });
});
