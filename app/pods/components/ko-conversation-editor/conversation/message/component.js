import Ember from 'ember';

export default Ember.Component.extend({
  message: null,
  currentUser: null,
  isCurrentUser: function() {
    return this.get('message.user.id') === this.get('currentUser.id');
  }.property('message.user', 'currentUser')
});
