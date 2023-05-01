const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'mysql8.cxia4stoumt3.us-east-1.rds.amazonaws.com',
  user: 'admin',
  password: '0996286167Earth',
  database: 'ProjectCloud',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;