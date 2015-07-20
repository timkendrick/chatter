import Ember from 'ember';
import { fullName } from '../../helpers/full-name';

export default Ember.Route.extend({
  usersService: Ember.inject.service('users'),
  conversationService: Ember.inject.service('conversation'),
  model: function(params) {
    let usersService = this.get('usersService');
    let conversationService = this.get('conversationService');

    let appModel = Ember.Object.create({
      currentUser: getCurrentUser(usersService),
      contacts: getContactListItems(usersService),
      conversations: getConversationListItems(conversationService, usersService)
    });

    conversationService.addObserver('conversations.@each', () => {
      Ember.set(appModel, 'conversations', getConversationListItems(conversationService, usersService));
    });

    return appModel;


    function getCurrentUser(usersService) {
      return usersService.getCurrentUser();
    }

    function getContactListItems(usersService) {
      let users = usersService.get('users');
      let currentUser = usersService.getCurrentUser();
      let contacts = users.filter((user) => user.get('id') !== currentUser.get('id'))
        .map((user) => {
          let contactImage = user.get('image');
          let contactName = getUserName(user);
          let contactIsOnline = true;
          let contactIcon = (contactIsOnline ? 'fa fa-circle text-success text-xs' : null);
          return Ember.Object.create({
            image: contactImage,
            text: contactName,
            icon: contactIcon,
            disabled: !contactIsOnline,
            selected: false,
            data: {
              user: user
            }
          });
        });
      return contacts;
    }

    function getConversationListItems(conversationService, usersService) {
      let currentUser = usersService.getCurrentUser();
      let conversations = conversationService.get('conversations')
        .map((conversation) => {
          let conversationId = conversation.id;
          let conversationImage = conversation.participants[0].image;
          let conversationName = conversation.participants
            .filter((user) => user.get('id') !== currentUser.get('id'))
            .map(
              (user) => user.get('firstName')
            ).join(', ');
          let conversationIcon = 'zmdi zmdi-comment-alt-text text-muted';
          return Ember.Object.create({
            image: conversationImage,
            text: conversationName,
            icon: conversationIcon,
            disabled: false,
            selected: false,
            data: {
              id: conversationId
            }
          });
        });
      return conversations;
    }
  }
});

function getUserName(user) {
  return fullName([user]);
}
