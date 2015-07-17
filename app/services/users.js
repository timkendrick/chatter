import Ember from 'ember';

import users from '../stubs/users';

export default Ember.Service.extend({
  getUsers: function() {
    return users;
  },
  getCurrentUser: function() {
    return users[0];
  }
});
