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
  usersService: Ember.inject.service('users'),
  conversations: conversations,
  getConversations: function() {
    return conversations;
  },
  getConversation: function(conversationId) {
    return conversations.filter(
      (conversation) => conversation.id === conversationId
    )[0] || null;
  },
  createConversation: function(participants) {
    let usersService = this.get('usersService');
    let conversationId = conversations.length + 1;
    let currentUser = usersService.getCurrentUser();
    let conversationParticipants = [currentUser].concat(participants);
    let conversationMessages = [];
    let conversation = {
      id: conversationId,
      participants: conversationParticipants,
      messages: conversationMessages
    };
    conversations.pushObject(conversation);
    return conversation;
  },
  sendMessage: function(conversation, messageText) {
    let usersService = this.get('usersService');
    let currentUser = usersService.getCurrentUser();
    let message = {
      user: currentUser,
      text: messageText,
      time: new Date()
    };
    conversation.messages.pushObject(message);
  }
});
