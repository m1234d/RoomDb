var express = require('express')
var path = require('path');

var app = express()

function connect() {
  var mysql = require('mysql')
  var connection = mysql.createConnection({
    host     : 'roomdb.csn0djncqcl6.us-east-2.rds.amazonaws.com',
    user     : 'm1234d',
    password : 'masterpass123',
    database : 'cmuclasses'
  });
  return connection;
}
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(__dirname + '/dist'));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

app.get('/api/get_buildings/', (req, res) => {
  connection = connect();
  connection.connect()
  connection.query('SELECT  * from cmuclasses.buildings', function (err, rows, fields) {
    if (err) throw err
    res.json(rows);
  })
  connection.end()
});
app.get('/api/get_coursesections/', (req, res) => {
  connection = connect();
  connection.connect()
  connection.query("SELECT  * from cmuclasses.coursesections WHERE BuildingId != 'DNM'", function (err, rows, fields) {
    if (err) throw err
    res.json(rows);
  })
  connection.end()
});
app.get('/api/get_courses/', (req, res) => {
  connection = connect();
  connection.connect()
  connection.query('SELECT  * from cmuclasses.courses', function (err, rows, fields) {
    if (err) throw err
    console.log(rows[0]);
  })
  connection.end()
});
app.get('/api/get_floors_by_building', (req, res) => {
  connection = connect();
  connection.connect();
  console.log(req.query.id);
  connection.query("SELECT * from cmuclasses.coursesections WHERE BuildingId='" + req.query.id + "'", function (err, rows, fields) {
    if (err) throw err
    var floors = [];
    for (var i = 0; i < rows.length; i++) {
      var floor = rows[i].RoomId.substring(0, 1);
      var found = false;
      for(var j = 0; j < floors.length; j++) {
        if(floors[j] == floor) {
          found = true;
        }
      }
      if(found == false) {
        floors.push(floor);
      }
    }
    res.json(floors.sort());
  })
  connection.end();
});

app.get('/api/get_rooms_by_floor', (req, res) => {
  connection = connect();
  connection.connect();
  console.log(req.query.id);
  let floor = req.query.floor;
  let building = req.query.building;
  connection.query("SELECT * from cmuclasses.view_weekly WHERE BuildingId='" + building + "' AND RoomId LIKE '" + floor + "%'", function (err, rows, fields) {
    if (err) throw err
    var rooms = [];
    for (var i = 0; i < rows.length; i++) {
      var room = rows[i].RoomId
      var found = false;
      for(var j = 0; j < rooms.length; j++) {
        if(rooms[j] == room) {
          found = true;
        }
      }
      if(found == false) {
        rooms.push(room);
      }
    }
    res.json(rooms.sort());
  })
  connection.end();
});
app.get('/api/get_room_schedule', (req, res) => {
  connection = connect();
  connection.connect();
  console.log(req.query.id);
  let room = req.query.room;
  let building = req.query.building;
  connection.query("SELECT * from cmuclasses.view_weekly WHERE BuildingId='" + building + "' AND RoomId='" + room + "'", function (err, rows, fields) {
    if (err) throw err
    
    res.json(rooms.sort());
  })
  connection.end();
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
