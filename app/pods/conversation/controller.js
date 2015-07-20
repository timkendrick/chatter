import Ember from 'ember';

export default Ember.Controller.extend({
  init: function() {
    this._super();
    let usersService = this.get('usersService');
    let currentUser = usersService.getCurrentUser();
    this.set('currentUser', currentUser);
  },
  model: null,
  currentUser: null,
  focused: false,
  usersService: Ember.inject.service('users'),
  conversationService: Ember.inject.service('conversation'),
  actions: {
    sendMessage: function(message) {
      let conversation = this.get('model');
      let conversationService = this.get('conversationService');
      conversationService.sendMessage(conversation, message);
      this.set('model.viewModel.draft', null);
    },
    close: function() {
      this.transitionToRoute('index');
    }
  }
});
