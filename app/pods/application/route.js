import Ember from 'ember';

export default Ember.Route.extend({
  usersService: Ember.inject.service('users'),
  conversationService: Ember.inject.service('conversation'),
  model: function(params) {
    let usersService = this.get('usersService');
    let conversationService = this.get('conversationService');
    return Ember.RSVP.hash({
      currentUser: usersService.getCurrentUser(),
      contacts: usersService.getUsers({ live: true }),
      conversations: conversationService.getConversations({ live: true })
    });
  }
});
