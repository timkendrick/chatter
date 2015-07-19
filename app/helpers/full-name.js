import Ember from 'ember';

export function fullName(params) {
  let user = params[0];
  if (!user) { return null; }
  return user.firstName + ' ' + user.lastName;
}

export default Ember.Helper.helper(fullName);
