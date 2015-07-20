import Ember from 'ember';

import userStubs from '../stubs/users';
import UserModel from '../models/user';

export default Ember.Service.extend({
  init: function() {
    this._super();
    let users = createUserModels(userStubs);
    this.set('users', users);
  },
  users: null,
  getCurrentUser: function() {
    return this.get('users')[0];
  }
});

function createUserModels(userStubs) {
  return userStubs.map(
    (userStub) => UserModel.create(userStub)
  );
}
