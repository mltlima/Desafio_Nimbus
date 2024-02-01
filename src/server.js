const http = require('http');

const getDamageSummaryByDateRoute = require('./get-damage-summary-by-date/route');

const server = http.Server();

module.exports = server;
