import DS from 'ember-data';

export default DS.Model.extend({
  conversation: DS.belongsTo('conversation', { async: true }),
  user: DS.belongsTo('user', { async: true }),
  text: DS.attr('string'),
  time: DS.attr('date')
});
