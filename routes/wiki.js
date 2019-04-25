const express = require('express');
const router = express.Router();
const db = require('../models');
const { addPage } = require('../views');
//add more views here
//const wikipage = require('../views/wikipage');
const layout = require('../views/layout')

router.get('/', (req, res, next) => {
	 res.send('hi');
});

// router.get("/", (req, res) => {
//     res.send(layout(''));
// })

// router.get('/add', async (req, res, next) => {
// 	await res.send(addPage());
// });

// router.post('/', (req, res, next) => {
// 	res.send('got to POST /wiki/')
// })

// router.get('/add', (req, res, next) => {
// 	res.send('got to GET /wiki/add')
// })

module.exports = router;