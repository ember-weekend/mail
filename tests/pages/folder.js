import {
  create,
  visitable,
  collection,
  clickable,
  hasClass,
} from 'ember-cli-page-object';

export default create({
  visit: visitable('/inbox'),
  emails: collection({
    itemScope: 'table tr',
    item: {
      checked: clickable('td', { at: 0 }),
      star: clickable('td', { at: 1}),
      starred: hasClass('inbox-started', 'i', { scope: 'td:eq(1)'})
    }
  })
});
