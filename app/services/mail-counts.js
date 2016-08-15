import Ember from 'ember';

const { get, setProperties } = Ember;

export default Ember.Service.extend({
  extractMeta(model) {
    setProperties(this, get(model, 'meta'));
    return model;
  }
});
