const { OrientDBClient } = require('orientjs');

let session;

async function connectToOrientDB() {
  const client = await OrientDBClient.connect({
    host: process.env.ORIENT_HOST || 'localhost',
    port: process.env.ORIENT_PORT || 2424,
  });

  session = await client.session({
    name: process.env.ORIENT_DB || 'health_records',
    username: process.env.ORIENT_USER || 'root',
    password: process.env.ORIENT_PASSWORD || 'root',
  });

  console.log('Connected to OrientDB');
}

function getDb() {
  if (!session) {
    throw new Error('OrientDB session not initialized. Call connectToOrientDB() first.');
  }
  return session;
}

module.exports = {
  connectToOrientDB,
  getDb,
};
