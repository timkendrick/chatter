import FixtureAdapter from 'ember-data-fixture-adapter';

export default FixtureAdapter.extend({
  shouldReloadRecord: function() {
    return true;
  },
  shouldReloadAll: function() {
    return true;
  },
  generateIdForRecord: function(store, modelName, inputProperties) {
    let type = store.modelFor(modelName);
    let typeMap = store.typeMapFor(type);
    let existingIds = typeMap.records.map((record) => record.id);
    let maxId = existingIds.map((id) => Number(id))
      .reduce((max, id) => Math.max(max, id), 0);
    return maxId + 1;
  }
});
