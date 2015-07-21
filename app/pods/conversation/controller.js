import Ember from 'ember';

export default Ember.Controller.extend({
  model: null,
  state: null,
  currentUser: null,
  usersService: Ember.inject.service('users'),
  conversationService: Ember.inject.service('conversation'),
  actions: {
    sendMessage: function(messageText) {
      let conversation = this.get('model');
      let conversationService = this.get('conversationService');
      conversationService.sendMessage(conversation, messageText)
        .then((message) => {
          this.set('state.draft', null);
        });
    },
    close: function() {
      this.transitionToRoute('index');
    }
  }
});
