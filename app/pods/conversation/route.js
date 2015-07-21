import Ember from 'ember';

export default Ember.Route.extend({
  conversationService: Ember.inject.service('conversation'),
  usersService: Ember.inject.service('users'),
  stateService: Ember.inject.service('state'),
  state: null,
  currentUser: null,
  model: function(params) {
    let conversationService = this.get('conversationService');
    let conversationId = params.conversation_id;
    return conversationService.getConversation(conversationId)
      .then((conversation) => {
        if (!conversation) {
          this.transitionTo('index');
          return null;
        }
        return conversation;
      });
  },
  afterModel: function(model) {
    let usersService = this.get('usersService');
    return usersService.getCurrentUser()
      .then((currentUser) => {
        this.set('currentUser', currentUser);
      });
  },
  setupController: function(controller, model) {
    let stateService = this.get('stateService');
    let state = stateService.getRecordState(model);
    controller.set('model', model);
    controller.set('state', state);
    controller.set('currentUser', this.get('currentUser'));
  }
});
