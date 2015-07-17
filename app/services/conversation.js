import Ember from 'ember';

import conversations from '../stubs/conversations';

export default Ember.Service.extend({
  getConversations: function() {
    return conversations;
  },
  sendMessage: function(conversation, messageText) {
    var message = {
      user: 1,
      text: messageText
    };
    conversation.messages.pushObject(message);
  }
});
