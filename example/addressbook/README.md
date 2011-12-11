# Address book

A very simple address book usable from your mail client.

## Install

Install some dependencies.

    npm install elastical
    npm install seq

## Elastic search

Launch your elastic search

    elasticsearch

## Populate

Add some buddies, André, Benoit and Casimir.

    node fixture.js

## Serve

Start your ldap server

    node server.js

## Search

Search from OSX Address Book, Thunderbird, Evolution, or any other LDAP client.

* host: localhost
* port: 1389
* basedn: o=whitepages
