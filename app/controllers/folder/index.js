import Ember from 'ember';

const { get } = Ember;

export default Ember.Controller.extend({
  mailLookup: Ember.inject.service(),
  currentFolderName: Ember.computed.alias('mailLookup.currentFolderName'),
  actions: {
    showEmail(email) {
      this.transitionToRoute('folder.mail', email);
    },
    trashBulk() {
      const results = get(this, 'model').filter(i => get(i, 'checked'));
      get(this, 'mailLookup').removeItems(results);
    },
    starEmail(email) {
      get(this, 'mailLookup').addTag('starred', email);
    }
  }
});
