import Ember from 'ember';

import Conversation from '../models/conversation';
import ConversationMessage from '../models/conversation-message';

import conversationStubs from '../stubs/conversations';

let conversationRecordStubs = conversationStubs.map((conversationStub) => {
  return {
    id: conversationStub.id,
    participants: conversationStub.participants,
    messages: conversationStub.messages.mapBy('id')
  };
});

let conversationMessageRecordStubs = conversationStubs.reduce((messages, conversationStub) => {
  return messages.concat(conversationStub.messages.map((messageStub) => {
    return {
      id: messageStub.id,
      user: messageStub.user,
      text: messageStub.text,
      time: new Date(messageStub.time * 1000)
    };
  }));
}, []);

Conversation.reopenClass({
  FIXTURES: conversationRecordStubs
});

ConversationMessage.reopenClass({
  FIXTURES: conversationMessageRecordStubs
});

export default Ember.Service.extend({
  store: Ember.inject.service(),
  usersService: Ember.inject.service('users'),
  getConversation: function(conversationId) {
    let store = this.get('store');
    return store.findRecord('conversation', conversationId)
      .catch((error) => {
        return null;
      });
  },
  getConversations: function({
    live = false
  } = {}) {
    let store = this.get('store');
    return store.findAll('conversation')
      .then((conversationModels) => {
        if (!live) { return conversationModels; }
        return store.peekAll('conversation');
      });
  },
  createConversation: function(participants) {
    let store = this.get('store');
    let usersService = this.get('usersService');
    return usersService.getCurrentUser()
      .then((currentUser) => {
        let conversationParticipants = [currentUser].concat(participants);
        return findExistingConversation(store, conversationParticipants)
          .then((existingConversation) => {
            if (existingConversation) { return existingConversation; }
            let conversation = createConversation(store, conversationParticipants);
            return conversation;
          });
      });


    function findExistingConversation(store, participants) {
      let participantIds = participants.mapBy('id');
      return store.findAll('conversation')
        .then((conversationModels) => {
          return conversationModels.find(
            (conversationModel) => {
              let conversationParticipantIds = conversationModel.get('participants').mapBy('id');
              let hasSameParticipants = arraysContainSameItems(conversationParticipantIds, participantIds);
              return hasSameParticipants;
            }
          );


          function arraysContainSameItems(array1, array2) {
            if (array1.length !== array2.length) { return false; }
            return array1.every((item) => array2.contains(item));
          }
        });
    }

    function createConversation(store, participants) {
      let conversation = store.createRecord('conversation', {
        participants: participants
      });
      conversation.save();
      return conversation;
    }
  },
  sendMessage: function(conversation, messageText) {
    let store = this.get('store');
    let usersService = this.get('usersService');
    return usersService.getCurrentUser()
      .then((currentUser) => {
        let message = store.createRecord('conversation-message', {
          user: currentUser,
          text: messageText,
          time: new Date()
        });
        conversation.get('messages').pushObject(message);
      });
  }
});
