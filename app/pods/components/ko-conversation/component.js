import Ember from 'ember';

export default Ember.Component.extend({
  initialize: function() {
    Ember.run.schedule('afterRender', () => {
      this.scrollToBottom({ animate: false });
      let $messagesElement = this.$().find('.Conversation-messages');
      $messagesElement.prop({ scrollTop: $messagesElement.prop('scrollHeight') });
    });
  }.on('init'),
  messagesChanged: function() {
    Ember.run.schedule('afterRender', () => {
      this.scrollToBottom({ animate: true });
    });
  }.observes('conversation.messages.@each'),
  scrollToBottom: function({
    animate = false
  } = {}) {
      let $messagesElement = this.$().find('.Conversation-messages');
      let maxScroll = $messagesElement.prop('scrollHeight');
      if (animate) {
        $messagesElement.animate({ scrollTop: maxScroll });
      } else {
        $messagesElement.prop({ scrollTop: maxScroll });
      }
  }
});
