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

// Table creation SQL script
const createTableQueryIssues = `
CREATE TABLE IF NOT EXISTS issues (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description_one TEXT NOT NULL,
    description_two TEXT,
    image_url VARCHAR(255),
    number_of_options INTEGER NOT NULL,
    selected_option VARCHAR(1),
    option_a VARCHAR(255),
    option_a_nationalist_weight INTEGER,
    option_a_nationalist_perspective TEXT,
    option_a_unionist_weight INTEGER,
    option_a_unionist_perspective TEXT,
    option_b VARCHAR(255),
    option_b_nationalist_weight INTEGER,
    option_b_nationalist_perspective TEXT,
    option_b_unionist_weight INTEGER,
    option_b_unionist_perspective TEXT,
    option_c VARCHAR(255),
    option_c_nationalist_weight INTEGER,
    option_c_nationalist_perspective TEXT,
    option_c_unionist_weight INTEGER,
    option_c_unionist_perspective TEXT
);
`;

// Execute the table creation SQL script
pool.query(createTableQueryIssues)
    .then(() => {
        console.log("Table 'issues' created successfully");
    })
    .catch((err) => {
        console.error("Error creating table:", err);
    });

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