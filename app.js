const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const app = express(); 
const layout = require('./views/layout')
//(we don't actually need this here; why? is our API talking to the database? or is something else (router) talking to db?)
//const { db } = require('./models'); 
const models = require('./models');
//const path = require('path');


//extended: false prevents us from posting a nested object; unrolls the object?
app.use(morgan('dev'));
app.use(express.static(__dirname + "/public"));
//is this the same as below?
//app.use(express.urlencoded({extended: false}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/wiki', require('./routes/wiki'));
app.use('/user', require('./routes/user'));

//don't forget function keyword~!
app.get("/", function (req, res) => {
    res.send(layout(''));
})

db.authenticate().
then(() => {
  console.log('connected to the database');
})

//this moves to bottom of server.js
// const init = async () => {
// 	await models.db.sync({force: true});
// 	console.log('it\'s working!')
// }
// init();

//this moves to server.js?
// const PORT = 3000;
// app.listen(PORT, () => {
//     console.log(`App is listening in port ${PORT}`);
// })