const express = require('express');
const app = express(); 
const morgan = require('morgan');
const bodyParser = require('body-parser')
const path = require('path') //what is this?
const layout = require('./views/layout')
//these are required for error handling
const { errorPage, notFoundPage } = require('./views');
//(we don't actually need this here; why? is our API talking to the database? or is something else (router) talking to db?)
//A: yes, apis are connected to models, app.js sets up a server and tells the client where to go to find stuff
//const { db } = require('./models'); 
//const models = require('./models');


app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, './public'))); //serving up static files (e.g. css files)
//app.use(express.static(__dirname + "/public")); //deprecated

app.use(bodyParser.urlencoded({ extended: false }));
//app.use(express.urlencoded({extended: false})); - These do similar things, I'm not sure what the advantage of the badyParser library is
//what is url?
app.use(bodyParser.json());


app.use('/wiki', require('./routes/wiki'));
app.use('/user', require('./routes/user'));

//don't forget function keyword~!
// app.get("/", async (req, res) => {
//     await res.send(layout(''));
// })
app.get('/', function(req, res) {
  res.redirect('/wiki/');
});


// error handling
app.use((req, res) => {
  // var err = new Error('Not Found');
  res.status(404).send(notFoundPage());
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(errorPage(err));
});

// export
module.exports = app;

// this moves to bottom of server.js
// const init = async () => {
// 	await models.db.sync({force: true});
// 	console.log('it\'s working!')
// }
// init();
// const PORT = 3000;
// app.listen(PORT, () => {
//     console.log(`App is listening in port ${PORT}`);
// })

// also not necessary - are there any lines of code w/ db in this file? No, so we don't need it
/*db.authenticate().
then(() => {
  console.log('connected to the database');
})*/