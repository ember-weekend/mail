import { test } from 'qunit';
import moduleForAcceptance from 'mail/tests/helpers/module-for-acceptance';

import folderPage from 'mail/tests/pages/folder';

moduleForAcceptance('Acceptance | favorites');

test('User favorites email from inbox', function(assert) {
  server.create('email', { tags: [] });
  folderPage.visit();
  folderPage.emails(0).star();

  andThen(function() {
    assert.ok(folderPage.emails(0).starred, 'email was not favorited');
  });
});
