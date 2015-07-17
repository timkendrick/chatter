import Ember from 'ember';

const KEYCODE_ENTER = 13;

export default Ember.Component.extend({
  keyDown: function(event) {
    if (event.keyCode !== KEYCODE_ENTER) { return; }
    event.preventDefault();
    this.sendAction('submit', this.get('value'));
  }
});
