import Ember from 'ember';

const KEYCODE_ENTER = 13;

export default Ember.Component.extend({
  value: null,
  isSubmitDisabled: function() {
    return !this.get('value');
  }.property('value'),
  keyDown: function(event) {
    if (event.keyCode !== KEYCODE_ENTER) { return; }
    event.preventDefault();
    let isSubmitDisabled = this.get('isSubmitDisabled');
    if (isSubmitDisabled) { return; }
    let $formElement = this.$('.MessageField');
    $formElement.submit();
  },
  actions: {
    onSubmit: function() {
      this.sendAction('action', this.get('value'));
    }
  }
});
