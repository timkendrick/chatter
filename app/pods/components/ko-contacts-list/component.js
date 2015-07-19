import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    chooseItem: function(item) {
      this.sendAction('action', item);
    }
  }
});
