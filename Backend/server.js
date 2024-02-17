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

app.listen(4000, () => console.log("Server on localhost:4000"));
