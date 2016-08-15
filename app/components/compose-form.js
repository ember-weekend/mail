import Ember from 'ember';

const { get } = Ember;

export default Ember.Component.extend({
  actions: {
    submitForm() {
      const attrs = this.getProperties('to', 'subject', 'body');
      get(this, 'sendMail')(attrs).then(() => {
        get(this, 'close')();
      });
    }
  }
});
