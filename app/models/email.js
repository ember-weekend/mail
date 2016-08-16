import Ember from 'ember';
import DS from 'ember-data';

const { get } = Ember;
const { attr } = DS;

export default DS.Model.extend({
  from: attr(),
  to: attr(),
  subject: attr(),
  body: attr(),
  sentAt: attr('date'),
  meta: attr(),
  tags: attr({ defaultValue: () => [] }),
  starred: Ember.computed('tags.[]', function() {
    return get(this, 'tags').contains('starred');
  }),
  trashed: Ember.computed('tags.[]', function() {
    return get(this, 'tags').contains('trashed');
  }),
});
