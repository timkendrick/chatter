import Ember from 'ember';

export default Ember.Component.extend({
  currentUser: function() {
    return this.get('user').id === this.get('currentUser').id;
  }
});
