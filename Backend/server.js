const express = require("express");
const cors = require("cors");
const pool = require("./database");

const app = express();

app.use(express.json());
app.use(cors());

// ENDPOINTS
app.post("/addreflection", (req, res) => {
    const reflectionUsername = req.body["userName"];
    const reflectionLocation = req.body["userLocation"];
    const reflectionContent = req.body["userReflection"];

    // Use parameterized queries to prevent SQL injection
    const insertReflectionCommand = `INSERT INTO reflections (username, location, content) VALUES ($1, $2, $3) RETURNING *`;
    
    pool
        .query(insertReflectionCommand, [reflectionUsername, reflectionLocation, reflectionContent])
        .then((response) => {
            console.log("Reflection Saved");
            console.log(response.rows[0]); // Assuming you want to log the inserted reflection data
            res.status(201).json(response.rows[0]); // Send the inserted reflection data back as response
        })
        .catch((err) => {
            console.error("Error saving reflection:", err);
            res.status(500).send("Error saving reflection");
        });
});


app.get("/reflections", (req, res) => {
    pool
        .query("SELECT * FROM reflections")
        .then((response) => {
            res.status(200).json(response.rows); // Send the retrieved reflections as response
        })
        .catch((err) => {
            console.error("Error retrieving reflections:", err);
            res.status(500).send("Error retrieving reflections");
        });
});


app.post("/approvereflection", (req, res) => {
    const reflectionUsername = req.body["userName"];
    const reflectionLocation = req.body["userLocation"];
    const reflectionContent = req.body["userReflection"];

    // Use parameterized queries to prevent SQL injection
    const insertReflectionCommand = `INSERT INTO approvedReflections (username, location, content) VALUES ($1, $2, $3) RETURNING *`;
    
    pool
        .query(insertReflectionCommand, [reflectionUsername, reflectionLocation, reflectionContent])
        .then((response) => {
            console.log("Reflection Saved");
            console.log(response.rows[0]); // Assuming you want to log the inserted reflection data
            res.status(201).json(response.rows[0]); // Send the inserted reflection data back as response
        })
        .catch((err) => {
            console.error("Error saving reflection:", err);
            res.status(500).send("Error saving reflection");
        });
});

app.get("/getapprovedreflections", (req, res) => {
    pool
        .query("SELECT * FROM approvedReflections")
        .then((response) => {
            res.status(200).json(response.rows); // Send the retrieved reflections as response
        })
        .catch((err) => {
            console.error("Error retrieving reflections:", err);
            res.status(500).send("Error retrieving reflections");
        });
});

app.delete("/removeapprovedreflections", (req, res) => {
    const deleteAllApprovedReflectionsCommand = `DELETE FROM approvedReflections`;
    
    pool
        .query(deleteAllApprovedReflectionsCommand)
        .then(() => {
            console.log("All approved reflections deleted");
            res.status(200).send("All approved reflections deleted");
        })
        .catch((err) => {
            console.error("Error deleting all approved reflections:", err);
            res.status(500).send("Error deleting all approved reflections");
        });
});


app.delete("/deletereflection/:reflectionId", (req, res) => {
    const reflectionId = req.params.reflectionId;

    // Use parameterized queries to prevent SQL injection
    const deleteReflectionCommand = `DELETE FROM reflections WHERE id = $1 RETURNING *`;
    
    pool
        .query(deleteReflectionCommand, [reflectionId])
        .then((response) => {
            if (response.rows.length === 0) {
                // If no reflection was found with the provided ID
                res.status(404).send("Reflection not found");
            } else {
                console.log("Reflection Deleted");
                console.log(response.rows[0]); // Assuming you want to log the deleted reflection data
                res.status(200).json(response.rows[0]); // Send the deleted reflection data back as response
            }
        })
        .catch((err) => {
            console.error("Error deleting reflection:", err);
            res.status(500).send("Error deleting reflection");
        });
});


app.post("/addlogin", (req, res) => {
    const loginUsername = req.body["loginUsername"];
    const loginPassword = req.body["loginPassword"];

    // Use parameterized queries to prevent SQL injection
    const insertLoginCommand = `INSERT INTO login (username, password) VALUES ($1, $2) RETURNING *`;
    
    pool
        .query(insertLoginCommand, [loginUsername, loginPassword])
        .then((response) => {
            console.log("Login details Saved");
            console.log(response.rows[0]); // Assuming you want to log the inserted login data
            //res.status(201).json(response.rows[0]); // Send the inserted login data back as response
        })
        .catch((err) => {
            console.error("Error saving login:", err);
            res.status(500).send("Error saving login");
        });
});

app.get("/login", (req, res) => {
    pool
        .query("SELECT * FROM login")
        .then((response) => {
            res.status(200).json(response.rows); // Send the retrieved logins as response
        })
        .catch((err) => {
            console.error("Error retrieving login details:", err);
            res.status(500).send("Error retrieving login details");
        });
});

// Endpoint for user login
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    // Query the database to check if the username and password match
    const checkLoginQuery = `SELECT * FROM login WHERE username = $1 AND password = $2`;
    
    pool
        .query(checkLoginQuery, [username, password])
        .then((response) => {
            if (response.rows.length > 0) {
                // If login credentials are valid, send a success message
                res.status(200).json({ message: 'Login successful' });
            } else {
                // If login credentials are invalid, send an error message
                res.status(401).json({ message: 'Invalid username or password' });
            }
        })
        .catch((err) => {
            console.error("Error checking login credentials:", err);
            res.status(500).json({ message: 'Error checking login credentials' });
        });
});

app.listen(4000, () => console.log("Server on localhost:4000"));

