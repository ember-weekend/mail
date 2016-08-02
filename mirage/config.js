import Ember from 'ember';

const { get } = Ember;

function getEmailMetaCounts(emails){
  const results = {};
  results['inbox'] = emails.where(i => !get(i, 'trashedDate'));
  results['trash'] = emails.where(i => get(i, 'trashedDate'));
  results['starred'] = emails.where(i => get(i, 'starred'));

  const meta = {
    inboxCount: results['inbox'].models.length,
    trashCount: results['trash'].models.length,
    starredCount: results['starred'].models.length
  };

  return [meta, results];
}

export default function() {
  this.namespace = 'api/v1';

  this.patch('/emails/:id', function({ emails }, request){
    const id = request.params.id;
    const attrs = this.normalizedRequestAttrs();

    const json = this.serialize(emails.find(id).update(attrs));
    const [meta,] = getEmailMetaCounts(emails);

    // workaround because  `item.save()` returns an item that can't query its
    // requests' meta information
    json.data.attributes.meta = meta;

    return json;
  });

  this.get('/emails', function({emails}, request) {
    const folderName = request.queryParams.folderName;

    const [meta, results] = getEmailMetaCounts(emails);

    const json = this.serialize(results[folderName], 'email');


    json.meta = meta;

    return json;
  });

  this.get('/emails/:id', function({ emails }, request) {
    const id = request.params.id;
    const json = this.serialize(emails.find(id));
    const [meta,] = getEmailMetaCounts(emails);

    // workaround because  `item.save()` returns an item that can't query its
    // requests' meta information
    json.data.attributes.meta = meta;

    return json;
  });

}
