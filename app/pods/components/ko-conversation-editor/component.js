import Ember from 'ember';

export default Ember.Component.extend({
  conversation: null,
  currentUser: null,
  draft: null,
  actions: {
    sendRequested: function(messageText) {
      this.sendAction('sendRequested', messageText);
    },
    closeRequested: function() {
      this.sendAction('closeRequested');
    }
  }
});
