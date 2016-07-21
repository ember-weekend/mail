# Day 1

## Create an app

```
$ ember new mail
$ cd mail
```

Start the server
```
$ ember server
$ ember s
```

Visit `localhost:4200`

### Congratulations, you made it!

Remove `ember-welcome-page` addon from `package.json`

Bounce server

Blank screen?

```
$ ember g template index
```

open `app/templates/index.hbs`

Add the text `<h1>Mail</h1>`

## Show some email data

```
$ ember g route index
installing route
? Overwrite app/templates/index.hbs? No, skip
  create app/routes/index.js
  skip app/templates/index.hbs
installing route-test
  create tests/unit/routes/index-test.js
```

Don't override `index.hbs`

Open the test

Run the tests

```
$ ember test
...
1..11
# tests 11
# pass  11
# skip  0
# fail  0

# ok
```

JSHints are added automatically

We'll come back to tests later

open `index.js`

add model hook and return email array:

```
import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return [{
      from: 'recruiter@startup.com',
      to: 'dev@me.com',
      subject: 'Opportunity',
      body: 'Dear {{firstName}}, ...',
      sentAt: new Date()
    }];
  }
});
```

Notice:

* various hooks we will go over
* `model() { ... }` ES6 syntax
* POJO returned is sent to template

Open the template and add:

```
<h1>Mail</h1>

<ul>
{{#each model as |email|}}
  <li>
    <h2>{{email.from}}</h2>
    <h2>{{email.subject}}</h2>
    <h2>{{email.body}}</h2>
    <h2>{{email.sentAt}}</h2>
  </li>
{{/each}}
</ul>
```

Notice:

* use of `model`
* Handlebars syntax `{{foo}}` and `{{#foo}}content{{/foo}}`
* `each` helper

## Initial Styles

Lets add some styles to make this "Pop!"

... TODO - get styles from designer

## Add navigation

**`inbox(1)`** item

Add this to the `index.hbs`:

```
<nav>
  <ul>
    <li>{{link-to 'Inbox (1)' 'index'}}</li>
  </ul>
</nav>
```

Notice:
* `link-to` helper
* alternate block syntax

```
<nav>
  <ul>
    <li>{{#link-to 'index'}}Inbox (1){{/link-to}}</li>
  </ul>
</nav>
```
### Make email count dynamic

```
{{#link-to 'index'}}Inbox ({{model.length}}){{/link-to}}
```

Add another email and see that it changes

What if we don't want to show parens for zero?

```
{{#link-to 'index'}}Inbox {{#if model.length}}({{model.length}}){{/if}}{{/link-to}}
```

## Scaffold the email model

Our first story is a list of emails

```
$ ember generate model email from to subject body sentAt:date
installing model
  create app/models/email.js
installing model-test
  create tests/unit/models/email-test.js
```


open the model

notice the `attr()`s default to string

we have no relationships yet so we don't need `belongsTo` and `hasMany` yet
