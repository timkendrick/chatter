import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    showConversation: function(item) {
      let conversationId = item.data.id;
      this.transitionToRoute('conversation', conversationId);
    },
    startChat: function(item) {
      let user = item.data.user;
      // TODO: Start a new chat
    }
  }
});
