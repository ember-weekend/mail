import Ember from 'ember';

const { get } = Ember;

export default Ember.Service.extend({
  store: Ember.inject.service(),
  mailLookup: Ember.inject.service(),
  modalOpen: false,
  sendEmail(email) {
    const store = get(this, 'store');
    const record = store.createRecord('email', email)
    return record.save().then((email) => {
      const meta = get(email, 'meta');
      const mailLookup = get(this,'mailLookup');

      mailLookup.setMeta(meta);
    });
  }
});
