import Ember from 'ember';

import conversationStubs from '../stubs/conversations';

export default Ember.Service.extend({
  init: function() {
    this._super();
    let usersService = this.get('usersService');
    let users = usersService.get('users');
    let conversations = createConversationModels(conversationStubs, users);
    this.set('conversations', conversations);
  },
  usersService: Ember.inject.service('users'),
  conversations: null,
  getConversation: function(conversationId) {
    let conversations = this.get('conversations');
    return conversations.filter(
      (conversation) => conversation.get('id') === conversationId
    )[0] || null;
  },
  createConversation: function(participants) {
    let usersService = this.get('usersService');
    let conversations = this.get('conversations');
    let currentUser = usersService.getCurrentUser();
    participants = [currentUser].concat(participants);
    let existingConversation = findExistingConversation(participants, conversations);
    if (existingConversation) {
      return existingConversation;
    }
    let conversation = createConversation(participants, conversations);
    conversations.pushObject(conversation);
    return conversation;


    function findExistingConversation(participants, conversations) {
      let sortedParticipants = participants.slice().sort(
        (user1, user2) => user1.get('id') - user2.get('id')
      );
      return conversations.filter(
        (conversation) => {
          let hasSameParticipants =
            (conversation.participants.length === participants.length) &&
            conversation.participants.slice().sort(
              (user1, user2) => user1.get('id') - user2.get('id')
            ).every(
              (participant, index) => participant.get('id') === sortedParticipants[index].get('id')
            );
          return hasSameParticipants;
        }
      )[0] || null;
    }

    function createConversation(participants, conversations) {
      let conversationId = conversations.length + 1;
      let conversationMessages = [];
      let conversation = Ember.Object.create({
        id: conversationId,
        participants: participants,
        messages: conversationMessages
      });
      return conversation;
    }
  },
  sendMessage: function(conversation, messageText) {
    let usersService = this.get('usersService');
    let currentUser = usersService.getCurrentUser();
    let message = Ember.Object.create({
      user: currentUser,
      text: messageText,
      time: new Date()
    });
    conversation.messages.pushObject(message);
  }
});

function createConversationModels(conversationStubs, users) {
  let conversations = conversationStubs.map((conversationStub) => {
    let conversationId = conversationStub.id;
    let conversationParticipants = conversationStub.participants.map((participantStub) => {
      return users.filter(
        (user) => user.get('id') === participantStub.id
      )[0] || Ember.Object.create(participantStub);
    });
    let conversationMessages = conversationStub.messages.map((messageStub) => {
      let messageUser = conversationParticipants.filter(
        (user) => user.get('id') === messageStub.user.id
      )[0] || Ember.Object.create(messageStub.user);
      let messageText = messageStub.text;
      let messageTime = new Date(messageStub.time * 1000);
      let message = Ember.Object.create({
        user: messageUser,
        text: messageText,
        time: messageTime
      });
      return message;
    });
    let conversation = Ember.Object.create({
      id: conversationId,
      participants: conversationParticipants,
      messages: conversationMessages
    });
    return conversation;
  });
  return conversations;
}
