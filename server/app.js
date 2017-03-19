const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

const pg = require('pg');
const pool = new pg.Pool({
	user: process.env.USERNAME,
	password: process.env.POSTGRES_PASSWORD,
	database: 'shortenerapp',
	host: process.env.APP_HOST,
	max: 10, // max number of clients in pool
	idleTimeoutMillis: 1000,
	port: 5432
});

// middleware
// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version"' +
	':status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// req body middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// backend routing
app.post('/api/shorten', (req, res) => {
	// insert id, longURL and construct shortURL from host:
	pool.connect((err, client, release) => {
		if (err) {
			throw err;
		}

		let shorturl = 'http://localhost:9000/' + req.body.id;

		let query = `INSERT INTO urllist (id, longurl, shorturl)
			VALUES ('${req.body.id}', '${req.body.longURL}', '${shorturl}')`;

		client.query(query, (err, result) => {
			if (err) {
				throw err;
			}

			release();
			if(result && result.rows) {
				res.send(result);
			}
		});
	});
});

app.get('/:id', (req, res) => {
	// check if there is a URL in the database with the id that matches req.params
	// if there is get its short url and send it back to the client

	pool.connect((err, client, release) => {
		if (err) {
			throw err;
		}

		let query = `SELECT longurl FROM urllist WHERE id = '${req.params.id}'`;
		client.query(query, (err, result) => {
			if (err) {
				throw err;
			}

			release();
			if(result && result.rows) {
				const redirectURL = result.rows[0].longurl;
				res.redirect(redirectURL);
			}
		});
	});
});

// react: Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;
