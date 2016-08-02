import DS from 'ember-data';

const { attr } = DS;
export default DS.Model.extend({
  from: attr(),
  to: attr(),
  subject: attr(),
  body: attr(),
  sentAt: attr('date'),
  readDate: attr('date'),
  trashedDate: attr('date'),
  starred: attr('boolean'),
  meta: attr()
});
