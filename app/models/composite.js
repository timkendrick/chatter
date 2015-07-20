import Ember from 'ember';

export default Ember.Object.extend({
  id: Ember.computed.alias('model.id'),
  collection: null,
  model: null,
  state: null
});
