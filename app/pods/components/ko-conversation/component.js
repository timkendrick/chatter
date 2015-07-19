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
      if (animate) {
        $messagesElement.animate({ scrollTop: maxScroll });
      } else {
        $messagesElement.prop({ scrollTop: maxScroll });
      }
  }
});
