var ldapjs = require('ldapjs'),
    es = require('../../lib/elasticsearch.js'),
    elastical = require('elastical');

var ldap = ldapjs.createServer();
var client = new elastical.Client();

var BASEDN = 'o=whitepages';

ldap.bind(BASEDN, function(req, res, next) {
    //come on, it's open
    return next();

});

ldap.search(BASEDN, function(req, res, next) {
    var q = es.filter(req.filter);
    client.search({query: q}, function(err, result, resp) {
        if (result.total > 0) {
            result.hits.forEach(function(hit) {
                res.send({
                    dn: 'mail=' + hit._source.mail + ',' + BASEDN,
                    attributes: hit._source});
            });
        }
        res.end();
        return next();
    });
});

ldap.listen(1389, '127.0.0.1', function() {
    console.log('ldap://127.0.0.1:1389');
});
