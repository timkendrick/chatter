import Ember from 'ember';

export default Ember.Service.extend({
  init: function() {
    this._super();
    this.set('data', {});
  },
  data: null,
  getRecordState: function(record) {
    let data = this.get('data');
    let stateKey = getStateKey(record);
    if (stateKey in data) { return data[stateKey]; }
    let state = Ember.Object.create();
    data[stateKey] = state;
    return state;
  },
  setRecordState: function(record, state) {
    let data = this.get('data');
    let stateKey = getStateKey(record);
    data[stateKey] = state;
  },
  deleteRecordState: function(record) {
    let data = this.get('data');
    let stateKey = getStateKey(record);
    delete data[stateKey];
  }
});

function getStateKey(record) {
  return getRecordTypeName(record) + ':' + record.get('id');
}

function getRecordTypeName(record) {
  return record.constructor.modelName;
}
