import Ember from 'ember';

export default Ember.Route.extend({
  usersService: Ember.inject.service('users'),
  model: function(params) {
    let usersService = this.get('usersService');
    let users = usersService.getUsers();
    let currentUser = usersService.getCurrentUser();
    let contacts = users.filter((user) => user.id !== currentUser.id);
    return {
      currentUser: currentUser,
      contacts: contacts
    };
  }
});
