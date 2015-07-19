import Ember from 'ember';
import { fullName } from '../../helpers/full-name';

export default Ember.Route.extend({
  usersService: Ember.inject.service('users'),
  conversationService: Ember.inject.service('conversation'),
  model: function(params) {
    let usersService = this.get('usersService');
    let conversationService = this.get('conversationService');
    let users = usersService.getUsers();
    let currentUser = usersService.getCurrentUser();
    let contacts = users.filter((user) => user.id !== currentUser.id)
      .map((user) => {
        let contactImage = user.image;
        let contactName = getUserName(user);
        let contactIsOnline = true;
        let contactIcon = (contactIsOnline ? 'fa fa-circle text-success text-xs' : null);
        return {
          image: contactImage,
          text: contactName,
          icon: contactIcon,
          disabled: !contactIsOnline,
          selected: false,
          data: {
            user: user
          }
        };
      });
    let conversations = conversationService.getConversations()
      .map((conversation) => {
        let conversationId = conversation.id;
        let conversationImage = conversation.participants[0].image;
        let conversationName = conversation.participants
          .filter((user) => user.id !== currentUser.id)
          .map(
            (user) => user.firstName
          ).join(', ');
        let conversationIcon = 'md md-comment text-muted';
        return {
          image: conversationImage,
          text: conversationName,
          icon: conversationIcon,
          disabled: false,
          selected: false,
          data: {
            id: conversationId
          }
        };
      });
    return {
      currentUser: currentUser,
      contacts: contacts,
      conversations: conversations
    };
  }
});

function getUserName(user) {
  return fullName([user]);
}
