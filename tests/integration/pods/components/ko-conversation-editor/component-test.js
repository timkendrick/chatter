import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


moduleForComponent('ko-conversation-editor', 'Integration | Component | ko conversation editor', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{ko-conversation-editor}}`);

  assert.equal(this.$().text(), '');

  // Template block usage:
  this.render(hbs`
    {{#ko-conversation-editor}}
      template block text
    {{/ko-conversation-editor}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
