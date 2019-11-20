var amqp = require('amqp');

var connection = amqp.createConnection({
	host : '127.0.0.1'
});
var rpc_json = new (require('./amqprpc'))(connection, 'application/json', 'utf-8');
var rpc_csv = new (require('./amqprpc'))(connection, 'text/csv', 'utf-8');

function make_json_request(queue_name, msg_payload, callback) {

	rpc_json.makeRequest(queue_name, msg_payload, function(err, response) {
		if (err)
			console.error(err);
		else {
			console.log("response", response);
			callback(null, response);
		}
		// connection.end();
	});
}

function make_csv_request(queue_name, msg_payload, callback) {

	rpc_json.makeRequest(queue_name, msg_payload, function(err, response) {
		if (err)
			console.error(err);
		else {
			console.log("response", response);
			callback(null, response);
		}
		// connection.end();
	});
}


exports.make_json_request = make_json_request;
exports.make_csv_request = make_csv_request;
