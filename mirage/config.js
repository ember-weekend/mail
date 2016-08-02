import Ember from 'ember';

const { get } = Ember;

export default function() {
  this.namespace = 'api/v1';

  this.put('/emails/:id', ({ emails }, request) => {
    let attrs = this.normalizedRequestAttrs();

    return emails.find(id).update(attrs);
  });

  this.get('/emails', function({emails}, request) {
    const folderName = request.queryParams.folderName;

    const results = {};
    results['inbox'] = emails.where(i => !get(i, 'trashedDate'));
    results['trash'] = emails.where(i => get(i, 'trashedDate'));
    results['starred'] = emails.where(i => get(i, 'starred'));

    const json = this.serialize(results[folderName], 'email');

    json.meta = {
      inboxCount: results['inbox'].models.length,
      trashCount: results['trash'].models.length,
      starredCount: results['starred'].models.length
    };

    return json;
  });

}
