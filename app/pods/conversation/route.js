import Ember from 'ember';

export default Ember.Route.extend({
  conversationService: Ember.inject.service('conversation'),
  usersService: Ember.inject.service('users'),
  model: function(params) {
    let conversationService = this.get('conversationService');
    let usersService = this.get('usersService');
    let conversationId = Number(params.conversation_id);
    let conversation = conversationService.getConversation(conversationId);
    if (!conversation) {
      this.transitionTo('index');
      return null;
    }
    let currentUser = usersService.getCurrentUser();
    return {
      conversation: conversation,
      currentUser: currentUser
    };
  }
});
