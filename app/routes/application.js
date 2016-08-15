import Ember from 'ember';

const { get } = Ember;

export default Ember.Route.extend({
  composer: Ember.inject.service(),
  actions: {
    toggleCompose() {
      const composer = get(this, 'composer');
      composer.toggleProperty('modalOpen');
    },
    sendMail(mail) {
      const composer = get(this, 'composer');
      return composer.sendMail(mail);
    }
  }
});
