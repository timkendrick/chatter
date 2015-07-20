import Ember from 'ember';

export function fullName(params) {
  let user = params[0];
  if (!user) { return null; }
  return user.get('firstName') + ' ' + user.get('lastName');
}

export default Ember.Helper.helper(fullName);
