import Ember from 'ember';

const { get } = Ember;

export default Ember.Service.extend({
  store: Ember.inject.service(),
  mailCounts: Ember.inject.service(),
  modalOpen: false,
  sendMail(email) {
    const store = get(this, 'store');
    email.tags = ['sent'];
    const record = store.createRecord('email', email);
    return record.save().then((email) => {
      get(this, 'mailCounts').extractMeta(email);
      return email;
    });
  }
});
