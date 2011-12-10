var es = require('elastical'),
    seq = require('seq');

var buddies = [
    {
        firstname: "André",
        name:      "Dupond",
        email:     "adupond@gmail.com"
    },
    {
        firstname: "Benoit",
        name:      "Durand",
        email:     "b.durand@yahoo.com"
    },
    {
        firstname: "Casimir",
        name:      "Perrier",
        email:     "c.perrier@hotmail.com"
    }
];

var client = new es.Client();

seq(buddies).
    parEach(2, function(buddy) {
        var that = this;
        client.index('addressbook', 'buddy', buddy, function(err, res) {
            that(err, res);
        });
    }).
    seq(function() {
        console.log('indexed', arguments);
    });
