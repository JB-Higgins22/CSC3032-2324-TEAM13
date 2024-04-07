const bcrypt = require('bcrypt');
const { Pool } = require('pg');
const readline = require('readline');

// PostgreSQL connection configuration
const pool = new Pool ({
    user: "postgres",
    password: "troubletrouble",
    host: "localhost",
    port: 5432,
    database: "troubles-museum",
})

// Function to hash password
const hashFunction = (password) => {
  return bcrypt.hashSync(password, 10);
};

// Function to interactively get user input
const askQuestion = (rl, question) => {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
};

// Main function to get username and password and store in database
const main = async () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  try {
    // Get username
    const username = await askQuestion(rl, 'Enter username: ');

    // Get password
    const password = await askQuestion(rl, 'Enter password: ');
    const hashedPassword = hashFunction(password);

    // Insert user into database
    const queryText = 'INSERT INTO login (username, password) VALUES ($1, $2)';
    const queryParams = [username, hashedPassword];

    await pool.query(queryText, queryParams);
    console.log('User successfully added to the database.');
  } catch (error) {
    console.error('Error occurred:', error);
  } finally {
    rl.close();
    pool.end();
  }
};

// Run the main function
main();
