const express = require('express');
const http = require('http');
const getDamageSummaryByDateRoute = require('./get-damage-summary-by-date/route');

const app = express();
// Middleware para interpretar JSON
app.use(express.json());

app[getDamageSummaryByDateRoute.method](getDamageSummaryByDateRoute.path, getDamageSummaryByDateRoute.fn);

const server = http.createServer(app);

module.exports = server;
