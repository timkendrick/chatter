import CompositeModel from './composite';
import ConversationStateModel from './conversation-state';

export default CompositeModel.extend({
  init: function() {
    this._super();
    if (!this.get('state')) {
      this.set('state', ConversationStateModel.create());
    }
  },
  collection: 'conversation'
});
