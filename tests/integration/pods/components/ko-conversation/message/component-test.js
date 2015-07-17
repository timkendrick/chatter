import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


moduleForComponent('ko-conversation/message', 'Integration | Component | ko conversation/message', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ko-conversation/message}}`);

  assert.equal(this.$().text(), '');

  // Template block usage:
  this.render(hbs`
    {{#ko-conversation/message}}
      template block text
    {{/ko-conversation/message}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
