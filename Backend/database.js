const { Pool } = require("pg");

const pool = new Pool ({
    user: "postgres",
    password: "troubletrouble",
    host: "localhost",
    port: 5432,
    database: "troubles-museum",
})

// Table creation SQL script
const createTableQuery = `
CREATE TABLE IF NOT EXISTS reflections (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    location VARCHAR(100),
    content TEXT NOT NULL
);
`;

// Execute the table creation SQL script
pool.query(createTableQuery)
    .then(() => {
        console.log("Table 'reflections' created successfully");
    })
    .catch((err) => {
        console.error("Error creating table:", err);
    });

module.exports = pool;