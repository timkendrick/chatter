import Ember from 'ember';

export default Ember.Controller.extend({
  init: function() {
    this._super();
    let router = this.container.lookup('router:main');
    router.on('didTransition', () => {
      let currentPath = this.get('currentPath');
      if (currentPath !== 'conversation') {
        this.set('currentConversation', null);
        return;
      }
      let routes = router.get('router.currentHandlerInfos');
      let currentRoute = routes.filter(
        (route) => route.name === currentPath
      )[0] || null;
      let routeModel = currentRoute.handler.context;
      let currentConversation = routeModel;
      this.set('currentConversation', currentConversation);
    });
  },
  conversationService: Ember.inject.service('conversation'),
  usersService: Ember.inject.service('users'),
  currentConversation: null,
  model: null,
  updateCurrentConversation: function() {
    let currentConversation = this.get('currentConversation');
    this.get('model').conversations.forEach(
      (conversationItem, index) => {
        let isCurrentConversation = currentConversation && (conversationItem.get('data').id === currentConversation.get('id'));
        conversationItem.set('selected', isCurrentConversation);
      }
    );
  }.observes('currentConversation'),
  actions: {
    showConversation: function(item) {
      let conversationId = item.get('data').id;
      this.transitionToRoute('conversation', conversationId);
    },
    startChat: function(item) {
      let conversationService = this.get('conversationService');
      let targetUser = item.get('data').user;
      let participants = [targetUser];
      let conversation = conversationService.createConversation(participants);
      this.transitionToRoute('conversation', conversation.id);
    }
  }
});
