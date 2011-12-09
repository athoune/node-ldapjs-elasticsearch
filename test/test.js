var vows = require('vows'),
    assert = require('assert'),
    ldap = require('ldapjs'),
    filter = require('../lib/elasticsearch.js').filter;

vows.describe('Ldap').addBatch({

    'A ldap query': {
        topic: '(&(foo=bar)(zig=zag))',
        'should be parsed': function(query) {
            var f = ldap.filters.parseString(query);
            assert.deepEqual(
                {"bool":{"must":[{"term":{"zig":"zag"}},{"term":{"foo":"bar"}}]}},
                filter(f));
            //console.log(JSON.stringify(filter(f)));
        }
    }
}).run();
