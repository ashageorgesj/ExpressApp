const express = require('express'),
     http = require('http');
const fs = require('fs');

const bodyParser = require('body-parser');

const hostname = 'localhost';
const port = 3000;

const app = express();
app.use(bodyParser.json());

var doctors = ['Algernop Krieger','Julius Hibert','Nick Riviera'];
var appointments = {'Algernop Krieger':
{'2018-04-02 8:15AM':[{'id': 1,'firstName': 'Sterling','lastName':'Archer'},{'id': 2,'firstName':'Cyril','lastName':'Figis' }],
'2018-04-02 8:30AM':[{'id': 3,'firstName': 'Mathew','lastName':'Fleming'},{'id': 4,'firstName':'Ray','lastName':'Hoagen' }]},
'Julius Hibert':{'2018-04-03 8:15AM':[{'id': 5,'firstName': 'Jennifer','lastName':'Hudson'},{'id': 6,'firstName':'Kate','lastName':'Winslet' }]}
};

app.get('/',(req,res) =>{
	res.statusCode = 400;
	//res.setHeader('Content-Type','text/plain');
	res.send('Please specify endpoint.');
});

app.get('/doctors',(req,res) =>{
	//console.log(doctors);
	res.statusCode = 200;
	res.setHeader('Content-Type','text/plain');
	res.send(doctors);
});

app.get('/doctor/:name',(req,res) =>{
	
	var value = req.params.name;
	var values  = value.split(" ");
	var myKey = values[0].substring(1) + " " + values[1]
	
	//console.log(appointments[values[0].substring(1) + " " + values[1]]);
	res.statusCode = 200;
	res.setHeader('Content-Type','text/plain');
	for (var key in appointments){
		var keys = key.split(" ");
		

		if ((keys[0] === values[0].substring(1)) && (keys[1]===values[1])){
			console.log('Same')
			res.send(appointments[key]);
		}

	};
	//res.send('Done')
	//res.send(appointments[values[0].substring(1) + " " + values[1]]);
});

app.get('/doctor/:name/:date',(req,res) =>{
	
	var value = req.params.name;
	var date = req.params.date;
	var display = []
	console.log(date);
	var values  = value.split(" ");
	//var myKey = values[0].substring(1) + " " + values[1]
	
	//console.log(appointments[values[0].substring(1) + " " + values[1]]);
	res.statusCode = 200;
	res.setHeader('Content-Type','text/plain');
	for (var key in appointments){
		var keys = key.split(" ");
		

		if ((keys[0] === values[0].substring(1)) && (keys[1]===values[1])){
			//console.log('Same')
			//res.send(appointments[key]);
			var myList=appointments[key];

			for (var member in myList){
				var splitDate = member.split(" ");
				if (splitDate[0] === date.substring(1)){
					display.push(myList[member])
				}
			}
		}

	};
	res.send(display);
	//res.send(appointments[values[0].substring(1) + " " + values[1]]);
});

/*app.use(express.static(__dirname + '/public'))

app.all('/dishes',(req,res,next) =>{
	res.statusCode = 200;
	res.setHeader('Content-Type','text/plain')
	next()

});

app.get('/dishes',(req,res) =>{
	//fs.createW
	res.send("Will send dishes to you")
});

app.use((req, res, next) => {
  console.log(req.headers);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<html><body><h1>This is an Express Server</h1></body></html>');
  next()
});*/

/*app.get('/dishes',(req,res) =>{
	//fs.createW
	res.send("Will send dishes to you")
});*/

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});