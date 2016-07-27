import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return [{
      id: 1,
      from: 'recruiter@startup.com',
      to: 'dev@me.com',
      subject: 'Opportunity',
      body: 'Dear {{firstName}}, ...',
      sentAt: new Date(),
      readDate: null
    }, {
      id: 2,
      from: 'spam@twitter.com',
      to: 'dev@me.com',
      subject: 'You may like these ads',
      body: 'Some irrelevant ads',
      sentAt: new Date(),
      readDate: null
    }];
  }
});
