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
  currentConversation: null,
  updateCurrentConversation: function() {
    let currentConversation = this.get('currentConversation');
    this.get('model').conversations.forEach(
      (conversation, index) => {
        let isCurrentConversation = currentConversation && (conversation.data.id === currentConversation.id);
        Ember.set(conversation, 'selected', isCurrentConversation);
      }
    );
  }.observes('currentConversation'),
  actions: {
    showConversation: function(item) {
      let conversationId = item.data.id;
      this.transitionToRoute('conversation', conversationId);
    },
    startChat: function(item) {
      let user = item.data.user;
      // TODO: Start a new chat
    }
  }
});
