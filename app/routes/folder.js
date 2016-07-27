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
  trashedDate: null
}, {
  id: 2,
  from: 'spam@twitter.com',
  to: 'dev@me.com',
  subject: 'You may like these ads',
  body: 'Some irrelevant ads',
  sentAt: moment(new Date()).subtract(1, 'day').toDate(),
  readDate: null,
  trashedDate: null
}];

const { get } = Ember;

export default Ember.Route.extend({
  model() {
    return fixtures.filter(function(item) {
      return !get(item, 'trashedDate');
    });
  }
});
