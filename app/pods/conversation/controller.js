import Ember from 'ember';

export default Ember.Controller.extend({
  inputMessage: null,
  conversationService: Ember.inject.service('conversation'),
  actions: {
    sendMessage: function(message) {
      let conversation = this.get('model').conversation;
      let conversationService = this.get('conversationService');
      conversationService.sendMessage(conversation, message);
      this.set('inputMessage', null);
    }
  }
});
