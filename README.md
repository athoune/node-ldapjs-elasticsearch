# Node ldap elasticsearch

Convert ldap query (from [ldapjs](http://ldpajs.org) project) to
[elastic search](http://www.elasticsearch.org/) query. With few code, you
create a ldap server wich ask question to your elastic search index.

Imagine querying from your mail client to your intranet data stored in a classic storage (mysql, mongodb …)

## What you can do
 * _or, and, equality, substr_ filters

## What you can't do
 * there is a bug with _not_
 * no authentification for now

## What will never work
 * no equivalent for \>= and \<=

## Install and test

    npm install .

    npm test

## Example

There is a simple example in the _example/addressbook_ folder.

## Dependencies

The example use [elastical](https://github.com/rgrove/node-elastical),
but the query conversion is agnostic.

## Licence

MIT.
