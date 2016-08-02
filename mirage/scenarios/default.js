export default function(server) {
  server.create('email', {
    id: 1,
    from: 'recruiter@startup.com',
    to: 'dev@me.com',
    subject: 'Opportunity',
    body: 'Dear {{firstName}}, ...',
    sentAt: moment(new Date()).subtract(2, 'minute').toDate(),
    readDate: null,
    trashedDate: null,
    starred: null
  })

  server.create('email', {
    id: 2,
    from: 'spam@twitter.com',
    to: 'dev@me.com',
    subject: 'You may like these ads',
    body: 'Some irrelevant ads',
    sentAt: moment(new Date()).subtract(1, 'day').toDate(),
    readDate: null,
    trashedDate: null,
    starred: null
  });
}
