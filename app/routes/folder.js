import Ember from 'ember';

const { get } = Ember;

export default Ember.Route.extend({
  mailLookup: Ember.inject.service(),
  tagging: Ember.inject.service(),

  model({ folderName }) {
    return this.get('mailLookup').fetch(folderName).then(() => {
      return { folderName };
    });
  },

  actions:  {
    moveToTrash(mail) {
      return get(this, 'mailLookup').addTag(mail, 'trashed').then(() => {
        this.transitionTo('application');
      });
    },
    toggleStar(mail) {
      return get(this, 'tagging').toggleTag(mail, 'starred');
    }
  }
});
