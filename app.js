const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const layout = require('./views/layout')
const { db } = require('./models'); 
const app = express();

//we've required models folder, but we're only getting the db file from models
db.authenticate().
then(() => {
  console.log('connected to the database');
})


//extended: false prevents us from posting a nested object.
app.use(express.urlencoded({extended: false}));

// __dirname refers to wikistack, at least to our understanding
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    res.send(layout(''));
})

//We need to use async along with this await function, but we're not sure how to implement and if this is the right location.
// await User.sync();
// await Post.sync();

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`App is listening in port ${PORT}`);
})