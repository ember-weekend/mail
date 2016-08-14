import Ember from 'ember';

const { get } = Ember;

export default Ember.Component.extend({
  actions: {
    submitForm(form) {
      const attrs = this.getProperties('email_address', 'subject', 'message');
      get(this, 'sendEmail')(attrs).then(() => {
        get(this, 'close')();
      });
    }
  }
});
