import Ember from 'ember';

const { set } = Ember;

export default Ember.Route.extend({
  model({ mailId }) {
    return this.modelFor('folder')[mailId-1];
  },
  afterModel(model) {
    set(model, 'readDate', new Date());
  },
  serialize(model) {
    return { mailId: model.id };
  }
});
