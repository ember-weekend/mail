import Ember from 'ember';

const { get, set, setProperties } = Ember;

export default Ember.Service.extend({
  store: Ember.inject.service(),
  currentFolder: Ember.computed('currentFolderName', function() {
    return get(this, get(this, 'currentFolderName'));
  }),
  update() {
    return this.retrieve(get(this, 'currentFolderName'));
  },
  retrieve(folderName) {
    return get(this, 'store').query('email', { folderName }).then((emails) => {
      setProperties(this, get(emails, 'meta'));
      set(this, folderName, emails);
      set(this, 'currentFolderName', folderName);

      return emails;
    });
  },
  addTag(tag, email) {
    set(email, tag, !get(email, tag));

    email.save().then((email) => {
      setProperties(this, get(email, 'meta'));
    });
  },
  removeItems(items) {
    const currentFolder = get(this, 'currentFolder');

    items.forEach(item => {
      set(item, 'trashedDate', new Date());
      set(item, 'checked', false);

      item.save().then((email) => {
        setProperties(this, get(email, 'meta'));
        currentFolder.removeObject(item);
      });
    });

  }

});
