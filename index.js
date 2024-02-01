const server = require('./src/server');

const port = process.env.PORT || 3333;
server.listen(port, () => console.log(`Running server on port ${port}`));
