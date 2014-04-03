var key = '549518c2-a1c1-40c5-897a-68bd37e9f04b';

var db = require('orchestrate')(key);

db.get('Users', '1')
.then( function(result){ 
	console.log(result.body);
});
