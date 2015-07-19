import Ember from 'ember';

export default Ember.Component.extend({
  messagesLoaded: function() {
    Ember.run.schedule('afterRender', () => {
      this.scrollToBottom({ animate: false });
    });
    this.addObserver('conversation.messages.@each', this, 'messagesUpdated');
  }.observes('conversation.messages'),
  messagesUpdated: function() {
    this.scrollToBottom({ animate: true });
  },
  scrollToBottom: function({
    animate = false
  } = {}) {
      let $messagesElement = this.$('.Conversation-messages');
      let maxScroll = $messagesElement.prop('scrollHeight');
      if (maxScroll <= 0) { return; }
      let currentScrollPosition = $messagesElement.prop('scrollTop');
      let isAlreadyAtBottom = currentScrollPosition >= maxScroll;
      if (isAlreadyAtBottom) { return; }
      if (animate) {
        $messagesElement.animate({ scrollTop: maxScroll });
      } else {
        $messagesElement.prop({ scrollTop: maxScroll });
      }
  },
  actions: {
    onClose: function() {
      this.sendAction('close');
    }
  }
});
