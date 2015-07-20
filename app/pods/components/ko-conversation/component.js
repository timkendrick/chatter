import Ember from 'ember';

export default Ember.Component.extend({
  messagesLoaded: function() {
    Ember.run.schedule('afterRender', () => {
      this.scrollToBottom({ animate: false });
    });
    let messages = this.get('conversation.messages');
    let onMessagesUpdated = () => {
      this.scrollToBottom({ animate: true });
    };
    let onMessagesChanged = () => {
      messages.removeObserver('@each', onMessagesUpdated);
      this.removeObserver('conversation.messages', onMessagesChanged);
    };
    messages.addObserver('@each', onMessagesUpdated);
    this.addObserver('conversation.messages', onMessagesChanged);
  }.observes('conversation.messages'),
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
