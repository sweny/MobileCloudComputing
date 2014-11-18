
var mysql = require('mysql');
var http = require('http');
var url = require('url');

http.createServer(function (request,response){
	 console.log("in create server ");
	var formdata = "";
	request.on("data", function(data){
	formdata += data;
	 console.log("in req.on func ");
	});
	
	request.on('end', function(){
		 console.log("in req.on end func1 ");
		try {
		var dataObj = JSON.parse(formdata);
		var storage = JSON.stringify(dataObj.storage);
		var memory = JSON.stringify(dataObj.memory);
		var cpu = JSON.stringify(dataObj.cpu);
	}
	catch(err)
	{
		console.log("error with json.parse"+err);
	}


		function db1(){
		var connection = mysql.createConnection( {host: 'localhost', user: 'root', password: 'root', port: 3305, database: 'test'}); return connection;}
		var objectDataB = db1();
		console.log("in db1 method..connection establshd ");

	objectDataB.query("INSERT INTO userresources(storage, memory, cpu) VALUES ('"+storage+"','"+memory+"','"+cpu+"');", function (err){
		objectDataB.end();
		if(err) throw err;
		response.writeHead(	200, {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Methods': 'GET, POST'});

		//response.end("database enrty made");
	});
});
}).listen(8888);
	console.log("server is listening to port 8888");		
