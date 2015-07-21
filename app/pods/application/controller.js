import Ember from 'ember';
import { fullName } from '../../helpers/full-name';

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
      let currentRoute = routes.findBy('name', currentPath);
      let routeModel = currentRoute.handler.context;
      let currentConversation = routeModel;
      this.set('currentConversation', currentConversation);
    });
  },
  conversationService: Ember.inject.service('conversation'),
  currentConversation: null,
  model: null,

  contactListItems: function() {
    let users = this.get('model.contacts') || [];
    let currentUser = this.get('model.currentUser') || null;
    let listItems = users
      .filter((user) => user.get('id') !== currentUser.get('id'))
      .map((user) => {
        let userId = user.get('id');
        let contactImage = user.get('image');
        let contactName = fullName([user]);
        let contactIsOnline = true;
        let contactIcon = (contactIsOnline ? 'fa fa-circle text-success text-xs' : null);
        return Ember.Object.create({
          key: userId,
          image: contactImage,
          text: contactName,
          icon: contactIcon,
          disabled: !contactIsOnline,
          selected: false,
          data: {
            user: user
          }
        });
      });
    return listItems;
  }.property('model.users.@each', 'model.currentUser'),
  conversationListItems: function() {
    let conversations = this.get('model.conversations') || [];
    let currentUser = this.get('model.currentUser') || null;
    let currentConversation = this.get('currentConversation');
    return conversations.map((conversation) => {
      let conversationId = conversation.get('id');
      let conversationParticipants = conversation.get('participants');
      let firstParticipant = conversationParticipants.objectAt(0);
      let hasParticipants = Boolean(firstParticipant);
      let conversationImage = hasParticipants ? firstParticipant.get('image') : currentUser.get('image');
      let conversationName = conversationParticipants
        .filter((user) => user.get('id') !== currentUser.get('id'))
        .map(
          (user) => user.get('firstName')
        ).join(', ');
      let conversationIcon = 'zmdi zmdi-comment-alt-text text-muted';
      let isCurrentConversation = currentConversation && (conversationId === currentConversation.get('id'));
      return Ember.Object.create({
        key: conversationId,
        image: conversationImage,
        text: conversationName,
        icon: conversationIcon,
        disabled: !hasParticipants,
        selected: isCurrentConversation,
        data: {
          id: conversationId
        }
      });
    });
  }.property('model.conversations.@each', 'model.currentUser', 'currentConversation'),

  actions: {
    showConversation: function(item) {
      let conversationId = item.get('data').id;
      this.transitionToRoute('conversation', conversationId);
    },
    startChat: function(item) {
      let conversationService = this.get('conversationService');
      let targetUser = item.get('data').user;
      let participants = [targetUser];
      conversationService.createConversation(participants)
        .then((conversation) => {
          this.transitionToRoute('conversation', conversation);
        });
    }
  }
});
