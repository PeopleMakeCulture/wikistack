const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const layout = require('./views/layout')
const { db } = require('./models'); 
const app = express();
const models = require('./models');
//plugging in router



//we've required models folder, but we're only getting the db file from models


//app.use('wiki', wikiRouter);



//extended: false prevents us from posting a nested object.
app.use(express.urlencoded({extended: false}));

// __dirname refers to wikistack, at least to our understanding
app.use(express.static(__dirname + "/public"));


app.use('/wiki', require('./routes/wiki'));
//app.use('/user', require('./routes/user'));

// app.get("/", (req, res) => {
//     res.send(layout(''));
// })

db.authenticate().
then(() => {
  console.log('connected to the database');
})

// const PORT = 3000;

const init = async () => {

	await models.db.sync({force: true});
	console.log('it\'s working!')

	// app.listen(PORT, () => {
 //    	console.log(`App is listening in port ${PORT}`);
	// })

}



init();



const PORT = 3000;

app.listen(PORT, () => {
    console.log(`App is listening in port ${PORT}`);
})