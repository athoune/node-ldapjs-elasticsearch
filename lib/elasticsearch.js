
var filter = function (fil) {
    var q, kv = {};
    switch (fil.type) {
        case 'and':
            var a = [];
            fil.filters.forEach(function(f) {
                a.push(filter(f));
            });
            return {'bool': { 'must': a } };
            break;
        case 'or':
            var s = [];
            fil.filters.forEach(function(f) {
                s.push(filter(f));
            });
            return {'bool': { 'should': s } };
            break;
        case 'substring':
            kv[fil.attribute] = fil.value;
            return {'prefix': kv };
            break;
        case 'equal':
            kv[fil.attribute] = fil.value;
            return {'term': kv};
            break;
        default:
            console.log(fil);
            break;
    }
};

exports.filter = filter;

