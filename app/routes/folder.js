import Ember from 'ember';

const { get } = Ember;

export default Ember.Route.extend({
  mailLookup: Ember.inject.service(),
  model(params) {
    return get(this, 'mailLookup').retrieve(params.folderName);
  }
});
