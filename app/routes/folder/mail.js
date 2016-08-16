import Ember from 'ember';

const { set } = Ember;

export default Ember.Route.extend({
  mailLookup: Ember.inject.service(),
  tagging: Ember.inject.service(),
  model({ mailId }) {
    return this.store.find('email', mailId);
  },
  afterModel(model) {
    return this.get('tagging').addTag(model, 'read');
  },
  serialize(model) {
    return { mailId: model.id };
  },
});
