import Ember from 'ember';

export default Ember.Component.extend({
  isCurrentUser: function() {
    return this.get('message').user.id === this.get('currentUser').id;
  }.property('user', 'currentUser')
});
