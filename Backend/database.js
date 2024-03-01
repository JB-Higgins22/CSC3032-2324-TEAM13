const { Pool } = require("pg");

const pool = new Pool ({
    user: "postgres",
    password: "troubletrouble",
    host: "localhost",
    port: 5432,
    database: "troubles-museum",
})

// Table creation SQL script
const createTableQueryReflections = `
CREATE TABLE IF NOT EXISTS reflections (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    location VARCHAR(100),
    content TEXT NOT NULL
);
`;

const createApprovedTableQuery = `
CREATE TABLE IF NOT EXISTS approvedReflections (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    location VARCHAR(100),
    content TEXT NOT NULL
);
`;

// Execute the table creation SQL script
pool.query(createTableQueryReflections)
    .then(() => {
        console.log("Table 'reflections' created successfully");
    })
    .catch((err) => {
        console.error("Error creating table:", err);
    });

pool.query(createApprovedTableQuery)
    .then(() => {
        console.log("Table 'approvedReflections' created successfully");
    })
    .catch((err) => {
        console.error("Error creating table:", err);
    });


// Table creation SQL script
const createTableQueryLogin = `
CREATE TABLE IF NOT EXISTS login (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL
);
`;

pool.query(createTableQueryLogin)
    .then(() => {
        console.log("Table 'login' created successfully");
    })

pool.query(createApprovedTableQuery)
    .then(() => {
        console.log("Table 'approvedReflections' created successfully");
    })
    .catch((err) => {
        console.error("Error creating table:", err);
    });

module.exports = pool;