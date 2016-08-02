import Ember from 'ember';

const { Controller } = Ember;

export default Controller.extend({
  mailLookup: Ember.inject.service(),
  inboxCount: Ember.computed.alias('mailLookup.inboxCount'),
  trashCount: Ember.computed.alias('mailLookup.trashCount'),
  starredCount: Ember.computed.alias('mailLookup.starredCount')
});
