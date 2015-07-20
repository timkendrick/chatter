import Ember from 'ember';

export default Ember.Object.extend({
  id: Ember.computed.alias('model.id'),
  model: null,
  state: null
});
