import Ember from 'ember';

import conversationStubs from '../stubs/conversations';

import ConversationModel from '../models/conversation';
import ConversationViewModel from '../models/conversation-view';
import ConversationMessageModel from '../models/conversation-message';
import UserModel from '../models/user';

export default Ember.Service.extend({
  init: function() {
    this._super();
    let usersService = this.get('usersService');
    let users = usersService.get('users');
    let conversationModels = createConversationModels(conversationStubs, users);
    let conversations = conversationModels.map(
      (conversationModel) => {
        let conversationId = conversationModel.get('id');
        let conversationViewModel = ConversationViewModel.create();
        return Ember.Object.create({
          id: conversationId,
          model: conversationModel,
          viewModel: conversationViewModel
        });
      }
    );
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


    function findExistingConversation(participants, conversationModels) {
      let sortedParticipants = participants.slice().sort(
        (user1, user2) => user1.get('id') - user2.get('id')
      );
      return conversationModels.filter(
        (conversation) => {
          let conversationModel = conversation.get('model');
          let conversationParticipants = conversationModel.get('participants');
          let hasSameParticipants =
            (conversationParticipants.length === participants.length) &&
            conversationParticipants.slice().sort(
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
      let conversationModel = ConversationModel.create({
        id: conversationId,
        participants: participants,
        messages: conversationMessages
      });
      return Ember.Object.create({
        id: conversationId,
        model: conversationModel,
        viewModel: ConversationViewModel.create()
      });
    }
  },
  sendMessage: function(conversation, messageText) {
    let usersService = this.get('usersService');
    let currentUser = usersService.getCurrentUser();
    let message = ConversationMessageModel.create({
      user: currentUser,
      text: messageText,
      time: new Date()
    });
    conversation.get('model').messages.pushObject(message);
  }
});

function createConversationModels(conversationStubs, users) {
  let conversations = conversationStubs.map((conversationStub) => {
    let conversationId = conversationStub.id;
    let conversationParticipants = conversationStub.participants.map((participantStub) => {
      return users.filter(
        (user) => user.get('id') === participantStub.id
      )[0] || UserModel.create(participantStub);
    });
    let conversationMessages = conversationStub.messages.map((messageStub) => {
      let messageUser = conversationParticipants.filter(
        (user) => user.get('id') === messageStub.user.id
      )[0] || UserModel.create(messageStub.user);
      let messageText = messageStub.text;
      let messageTime = new Date(messageStub.time * 1000);
      let message = ConversationMessageModel.create({
        user: messageUser,
        text: messageText,
        time: messageTime
      });
      return message;
    });
    let conversation = ConversationModel.create({
      id: conversationId,
      participants: conversationParticipants,
      messages: conversationMessages
    });
    return conversation;
  });
  return conversations;
}
