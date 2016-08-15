import Ember from 'ember';

const { get } = Ember;

export default Ember.Service.extend({
  store: Ember.inject.service(),
  mailCounts: Ember.inject.service(),
  tagging: Ember.inject.service(),

  fetch(folderName) {
    return get(this, 'store').query('email', {
      folderName
    }).then((mail) => {
      get(this, 'mailCounts').extractMeta(mail);
      return mail;
    });
  },

  mail: Ember.computed('store.email.@each', function() {
    return get(this, 'store').peekAll('email');
  }),

  mailForFolder(folderName) {
    const mail = get(this, 'mail');
    const tagging = get(this, 'tagging');
    return {
      inbox: () => tagging.filterByTags(mail, { exclude: ['trashed'] }),
      trash: () => tagging.filterByTags(mail, { include: ['trashed'] }),
      starred: () => tagging.filterByTags(mail, { include: ['starred'] }),
    }[folderName]();
  },
});
