import Ember from 'ember';

export default Ember.Route.extend({
  conversationService: Ember.inject.service('conversation'),
  model: function(params) {
    let conversationId = Number(params.conversation_id);
    let conversations = this.get('conversationService').getConversations();
    let conversation = conversations.filter(
      (conversation) => conversation.id === conversationId
    )[0];
    return conversation;
  }
});
