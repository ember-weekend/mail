import Ember from 'ember';

const { set } = Ember;

export default Ember.Route.extend({
  mailLookup: Ember.inject.service(),
  model({ mailId }) {
    return this.store.find('email', mailId);
  },
  afterModel(model) {
    set(model, 'readDate', new Date());
  },
  serialize(model) {
    return { mailId: model.id };
  },
});
