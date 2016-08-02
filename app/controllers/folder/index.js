import Ember from 'ember';

const { get, set } = Ember;

export default Ember.Controller.extend({
  mailLookup: Ember.inject.service(),
  currentFolderName: Ember.computed.alias('mailLookup.currentFolderName'),
  actions: {
    showEmail(email) {
      this.transitionToRoute('folder.mail', email);
    },
    trashBulk() {
      const results = get(this, 'model').filter(i => get(i, 'checked'));
      results.forEach(result => {
        set(result, 'trashedDate', new Date());
        set(result, 'checked', false);
        result.save();
      });
    },
    starEmail(email) {
      set(email, 'starred', !get(email, 'starred'));
      get(this, 'mailLookup').update();
    }
  }
});
