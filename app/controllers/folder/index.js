import Ember from 'ember';

const { get, set } = Ember;

export default Ember.Controller.extend({
  mailLookup: Ember.inject.service(),
  tagging: Ember.inject.service(),

  folderName: Ember.computed.alias('model.folderName'),

  mail: Ember.computed('model.folderName', 'mailLookup.mail.@each.tags', function() {
    return this.get('mailLookup').mailForFolder(this.get('model.folderName'));
  }),

  actions: {
    showEmail(email) {
      this.transitionToRoute('folder.mail', email);
    },
    trashSelected() {
      const mail = get(this, 'mail');
      const checked = mail.filter(m => get(m, 'checked'));
      return get(this, 'tagging').addTagAll(checked, 'trashed').then(() => {
        checked.forEach((m) => set(m, 'checked', false));
      });
    },
  }
});
