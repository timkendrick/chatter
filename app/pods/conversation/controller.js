import Ember from 'ember';

export default Ember.Controller.extend({
  inputMessage: null,
  focused: false,
  conversationService: Ember.inject.service('conversation'),
  updateConversation: function() {
    this.set('inputMessage', null);
  }.observes('model.conversation'),
  actions: {
    sendMessage: function(message) {
      let conversation = this.get('model').conversation;
      let conversationService = this.get('conversationService');
      conversationService.sendMessage(conversation, message);
      this.set('inputMessage', null);
    },
    close: function() {
      this.transitionToRoute('index');
    }
  }
});
