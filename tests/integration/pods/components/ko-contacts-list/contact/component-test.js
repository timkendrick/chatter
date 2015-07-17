import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


moduleForComponent('ko-contacts-list/contact', 'Integration | Component | ko contacts list/contact', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ko-contacts-list/contact}}`);

  assert.equal(this.$().text(), '');

  // Template block usage:
  this.render(hbs`
    {{#ko-contacts-list/contact}}
      template block text
    {{/ko-contacts-list/contact}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
