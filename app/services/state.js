import Ember from 'ember';

export default Ember.Service.extend({
  init: function() {
    this._super();
    this.set('data', {});
    this.set('defaults', {});
  },
  data: null,
  defaults: null,
  setDefaultModelState: function(type, defaultStateClass) {
    let defaultStateClasses = this.get('defaults');
    defaultStateClasses[type] = defaultStateClass;
  },
  getRecordState: function(record) {
    let data = this.get('data');
    let stateKey = getStateKey(record);
    if (stateKey in data) { return data[stateKey]; }
    let state = createRecordState(record, this.get('defaults'));
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

function createRecordState(record, defaults) {
  let type = getRecordTypeName(record);
  let stateClass = defaults[type] || Ember.Object;
  let state = stateClass.create();
  return state;
}

function getRecordTypeName(record) {
  return record.constructor.modelName;
}
