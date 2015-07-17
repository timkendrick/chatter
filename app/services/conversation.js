import Ember from 'ember';

import conversations from '../stubs/conversations';
import users from '../stubs/users';

conversations.forEach((conversation) => {
  conversation.participants = conversation.participants.map((participant) => {
    return users.filter((user) => user.id === participant.id)[0] || participant;
  });
  conversation.messages.forEach((message) => {
    message.user = conversation.participants.filter(
      (user) => user.id === message.user.id
    )[0] || message.user;
    message.time = new Date(message.time * 1000);
  });
});

export default Ember.Service.extend({
  getConversations: function() {
    return conversations;
  },
  getConversation: function(conversationId) {
    return conversations.filter(
      (conversation) => conversation.id === conversationId
    )[0] || null;
  },
  sendMessage: function(conversation, messageText) {
    var currentUser = users[0];
    var message = {
      user: currentUser,
      text: messageText,
      time: new Date()
    };
    conversation.messages.pushObject(message);
  }
});
