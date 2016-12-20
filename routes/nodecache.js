var NodeCache = require( "node-cache" );
var inventorycache = new NodeCache({ stdTTL: 0, checkperiod: 0 } );
module.exports = inventorycache;
