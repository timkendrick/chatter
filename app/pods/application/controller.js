import Ember from 'ember';

export default Ember.Controller.extend({
  init: function() {
    this._super();
    let router = this.container.lookup('router:main');
    router.on('didTransition', () => {
      let currentPath = this.get('currentPath');
      let routes = router.get('router.currentHandlerInfos');
      let currentRoute = routes.filter(
        (route) => route.name === currentPath
      )[0] || null;
      let routeParams = currentRoute.handler.context;
      let currentConversation = routeParams.conversation;
      this.set('currentConversation', currentConversation);
    });
  },
  conversationService: Ember.inject.service('conversation'),
  currentConversation: null,
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
      let user = item.get('data').user;
      let participants = [user];
      let conversation = conversationService.createConversation(participants);
      this.transitionToRoute('conversation', conversation.id);
    }
  }
});
