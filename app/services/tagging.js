import Ember from 'ember';

const { get, set, RSVP } = Ember;

export default Ember.Service.extend({
  mailCounts: Ember.inject.service(),

  addTag(mail, tag) {
    return this.updateTags(mail, (tags) => {
      tags.addObject(tag);
      return tags;
    });
  },

  addTagAll(mail, tag) {
    return new RSVP.all(mail.map((m) => this.addTag(m, tag)));
  },

  removeTag(mail, tag) {
    return this.updateTags(mail, (tags) => {
      tags.removeObject(tag);
      return tags;
    });
  },

  hasTag(mail, tag) {
    const tags = get(mail, 'tags');
    return tags.contains(tag);
  },

  updateTags(mail, callback) {
    let tags = get(mail, 'tags');
    tags = callback(tags);
    set(mail, 'tags', tags);
    return mail.save().then((mail) => {
      get(this, 'mailCounts').extractMeta(mail);
      return mail;
    });
  },

  toggleTag(mail, tag) {
    if (this.hasTag(mail, tag)) {
      return this.removeTag(mail, tag);
    } else {
      return this.addTag(mail, tag);
    }
  },

  filterByTags(mail, { include = [], exclude = [] }) {
    return mail.filter((m) => {
      let passed = include.length === 0 ? true : false;
      include.forEach((i) => passed = passed || get(m, 'tags').contains(i));
      exclude.forEach((e) => passed = passed && !get(m, 'tags').contains(e));
      return passed;
    });
  },
});
