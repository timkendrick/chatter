import Ember from 'ember';

import User from '../models/user';
import userStubs from '../stubs/users';

User.reopenClass({
  FIXTURES: userStubs
});

export default Ember.Service.extend({
  store: Ember.inject.service(),
  getCurrentUser: function() {
    let store = this.get('store');
    return store.findRecord('user', 1);
  },
  getUsers: function({
    live = false
  } = {}) {
    let store = this.get('store');
    return store.findAll('user')
      .then((results) => {
        if (!live) { return results; }
        return store.peekAll('user');
      });
  }
});
