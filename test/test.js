var vows = require('vows'),
    assert = require('assert'),
    ldap = require('ldapjs'),
    filter = require('../lib/elasticsearch.js').filter;

var conversion = {
    '(foo=bar)': {"term": {"foo": "bar"}},
    //'foo~=bar'
    //'(!foo=bar)': {},
    '(&(foo=bar)(zig=zag))':
        {"bool":{"must":[{"term":{"zig":"zag"}},{"term":{"foo":"bar"}}]}},
    '(&(|(givenname=pl*)(sn=pl*)(mail=pl*)(cn=pl*)))':
        {"bool":{"must":[{"bool":{"should":[{"prefix":{"cn":"pl"}},{"prefix":{"mail":"pl"}},{"prefix":{"sn":"pl"}},{"prefix":{"givenname":"pl"}}]}}]}}

};

var v = vows.describe('Ldap');
Object.keys(conversion).forEach(function(key){
    var batch = {};
    batch[key] = {
        topic: ldap.filters.parseString(key),
        'should be parsed': function(query) {
            //console.log(key, JSON.stringify(filter(query)));
            assert.deepEqual(conversion[key], filter(query));
        }
    };
    v.addBatch(batch);
});
v.run();
