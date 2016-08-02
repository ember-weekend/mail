import Ember from 'ember';
import moment from 'moment';

const fixtures = [{
  id: 1,
  from: 'recruiter@startup.com',
  to: 'dev@me.com',
  subject: 'Opportunity',
  body: 'Dear {{firstName}}, ...',
  sentAt: moment(new Date()).subtract(2, 'minute').toDate(),
  readDate: null,
  trashedDate: null,
  starred: null
}, {
  id: 2,
  from: 'spam@twitter.com',
  to: 'dev@me.com',
  subject: 'You may like these ads',
  body: 'Some irrelevant ads',
  sentAt: moment(new Date()).subtract(1, 'day').toDate(),
  readDate: null,
  trashedDate: null,
  starred: null
}];

const { get, set } = Ember;

export default Ember.Service.extend({
  lookupFilters: {
    inbox: i => !get(i, 'trashedDate'),
    trash: i => get(i, 'trashedDate'),
    starred: i => get(i, 'starred')
  },
  update() {
    return this.retrieve(get(this, 'currentFolderName'));
  },
  retrieve(folderName) {
    return new Ember.RSVP.Promise((resolve) => {
      const lookupFilters = get(this, 'lookupFilters');

      for(var fn in lookupFilters) {
        const filter = lookupFilters[fn];
        const result = fixtures.filter(filter);

        set(this, `${fn}Count`, result.length);
        set(this, fn, result);
      }

      set(this, 'currentFolderName', folderName);

      resolve(get(this, folderName));
    });
  }

});
