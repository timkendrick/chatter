import DS from 'ember-data';

export default DS.Model.extend({
  participants: DS.hasMany('user', { async: true }),
  messages: DS.hasMany('conversation-message', { async: true })
});
