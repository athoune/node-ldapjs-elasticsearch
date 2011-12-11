var es = require('elastical'),
    seq = require('seq');

var buddies = [
    {
        firstname: 'André',
        name: 'Dupond',
        surname: 'dédé',
        email: 'adupond@gmail.com'
    },
    {
        firstname: 'Benoit',
        name: 'Durand',
        surname: 'blob',
        email: 'b.durand@yahoo.com'
    },
    {
        firstname: 'Casimir',
        name: 'Perrier',
        surname: 'dinosaur',
        email: 'c.perrier@hotmail.com'
    }
];

function ldapisator(buddy) {
    return {
        cn: [
            buddy.surname,
            buddy.firstname + ' ' + buddy.name
            ],
        mail: buddy.email,
        sn: buddy.name
    };
}

var client = new es.Client();

seq(buddies).
    parEach(2, function(buddy) {
        var that = this;
        client.index(
            'addressbook', 'buddy',
            ldapisator(buddy), function(err, res) {
            that(err, res);
        });
    }).
    seq(function() {
        console.log('indexed', arguments);
    });
