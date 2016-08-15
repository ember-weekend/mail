import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  mailCounts: Ember.inject.service(),
  inboxCount: Ember.computed.alias('mailCounts.inboxCount'),
  trashCount: Ember.computed.alias('mailCounts.trashCount'),
  starredCount: Ember.computed.alias('mailCounts.starredCount')
});
