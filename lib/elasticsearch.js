
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
        case 'not':
            //FIXME bug in ldapjs string parser
            console.log(fil);
            break;
        case 'substring':
            //FIXME handling *popo popo* *popo*
            kv[fil.attribute] = fil.initial;
            return {'prefix': kv };
            break;
        //FIXME presence
        case 'equal':
            kv[fil.attribute] = fil.value;
            return {'term': kv};
            break;
        //FIXME approx
        default:
            console.log(fil);
            break;
    }
};

exports.filter = filter;

