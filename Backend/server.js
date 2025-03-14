const express = require("express");
const cors = require("cors");
const pool = require("./database");
const bcrypt = require("bcrypt");
const app = express();
const jwt = require("jsonwebtoken");

require('dotenv').config();
const config = require('./config.js');


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
            console.log(response.rows[0]);
            res.status(201).json(response.rows[0]); // Send the inserted reflection data back as response
        })
        .catch((err) => {
            console.error("Error saving reflection:", err);
            res.status(500).send("Error saving reflection");
        });
});

app.get("/checkUser", authenticateToken, (req,res)=>{
    res.status(200).json({boolean: true});
})

app.get("/reflections", authenticateToken,(req, res) => {

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


app.post("/approvereflection",authenticateToken,(req, res) => {
    const reflectionUsername = req.body["userName"];
    const reflectionLocation = req.body["userLocation"];
    const reflectionContent = req.body["userReflection"];

    // Use parameterized queries to prevent SQL injection
    const insertReflectionCommand = `INSERT INTO approvedReflections (username, location, content) VALUES ($1, $2, $3) RETURNING *`;
    
    pool
        .query(insertReflectionCommand, [reflectionUsername, reflectionLocation, reflectionContent])
        .then((response) => {
            console.log("Reflection Saved");
            console.log(response.rows[0]);
            res.status(201).json(response.rows[0]); // Send the inserted reflection data back as response
        })
        .catch((err) => {
            console.error("Error saving reflection:", err);
            res.status(500).send("Error saving reflection");
        });
});

app.get("/getapprovedreflections",  (req, res) => {
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

app.delete("/removeapprovedreflections",authenticateToken, (req, res) => {
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


app.delete("/deletereflection/:reflectionId",authenticateToken, (req, res) => {
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
                console.log(response.rows[0]);
                res.status(200).json(response.rows[0]); // Send the deleted reflection data back as response
            }
        })
        .catch((err) => {
            console.error("Error deleting reflection:", err);
            res.status(500).send("Error deleting reflection");
        });
});

// Endpoint for user login
app.post("/login", (req, res) => {
    const { username, password } = req.body;
const checkPassword = 'Select password FROM login WHERE username = $1';
    const payload = {
        userId:'1',
        username: 'admin',
        role:'admin',
        date: Date.now()
    };
    
    pool
        .query(checkPassword, [username])
        .then((response) => {
            if (response.rows.length > 0) {
                for(let row =0; row <response.rows.length; row++){
                const hashedPasswordFromDB = response.rows[row].password;
                matchedPassword = compareHash(password, hashedPasswordFromDB);
                if (matchedPassword) break;
            }
            if(matchedPassword){
                // If login credentials are valid, send a success message along with jwt token for authentication.
                // this will allow user to use the authorised endpoints. 
                const token = generateJWT(payload);
                //console.log(token);
                
                res.status(200).json({ message: 'Login successful', token: token});

            } else {
                // If login credentials are invalid, send an error message
                res.status(401).json({ message: 'Invalid username or password' });
            }
            
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

// Endpoint to add a new issue
app.post("/addissue", authenticateToken,(req, res) => {
    // Extract issue data from request body
    const { name, descriptionOne, descriptionTwo, imageURL, numberOfOptions, selectedOption,
            optionA, optionANationalistWeight, optionANationalistPerspective, optionAUnionistWeight, optionAUnionistPerspective,
            optionB, optionBNationalistWeight, optionBNationalistPerspective, optionBUnionistWeight, optionBUnionistPerspective,
            optionC, optionCNationalistWeight, optionCNationalistPerspective, optionCUnionistWeight, optionCUnionistPerspective } = req.body;

    // Use parameterized queries to prevent SQL injection
    const insertIssueCommand = `
        INSERT INTO issues (
            name, description_one, description_two, image_url, number_of_options, selected_option,
            option_a, option_a_nationalist_weight, option_a_nationalist_perspective, option_a_unionist_weight, option_a_unionist_perspective,
            option_b, option_b_nationalist_weight, option_b_nationalist_perspective, option_b_unionist_weight, option_b_unionist_perspective,
            option_c, option_c_nationalist_weight, option_c_nationalist_perspective, option_c_unionist_weight, option_c_unionist_perspective
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21) RETURNING *`;

    // Execute the query
    pool
        .query(insertIssueCommand, [
            name, descriptionOne, descriptionTwo, imageURL, numberOfOptions, selectedOption,
            optionA, optionANationalistWeight, optionANationalistPerspective, optionAUnionistWeight, optionAUnionistPerspective,
            optionB, optionBNationalistWeight, optionBNationalistPerspective, optionBUnionistWeight, optionBUnionistPerspective,
            optionC, optionCNationalistWeight, optionCNationalistPerspective, optionCUnionistWeight, optionCUnionistPerspective
        ])
        .then((response) => {
            console.log("Issue Added");
            res.status(201).json(response.rows[0]); // Send the inserted issue data back as response
        })
        .catch((err) => {
            console.error("Error adding issue:", err);
            res.status(500).send("Error adding issue");
        });
});


// Endpoint to get all issues
app.get("/issues", (req, res) => {
    pool
        .query("SELECT * FROM issues")
        .then((response) => {
            res.status(200).json(response.rows); // Send the retrieved issues as response
            console.log("Issues Retrieved");
        })
        .catch((err) => {
            console.error("Error retrieving issues:", err);
            res.status(500).send("Error retrieving issues");
        });
});

// Endpoint to get the number of rows in the issues table
app.get("/issueCount", (req, res) => {
    const countQuery = "SELECT COUNT(*) FROM issues";
    
    pool
        .query(countQuery)
        .then((response) => {
            // Extract the count from the response
            const rowCount = response.rows[0].count;
            res.status(200).json({ count: rowCount });
        })
        .catch((err) => {
            console.error("Error retrieving issue count:", err);
            res.status(500).send("Error retrieving issue count");
        });
});

app.listen(4000, () => console.log("Server on localhost:4000"));


//call when checking password
const compareHash = (password,hashFromDB) => {
    result = bcrypt.compareSync(password, hashFromDB);
    return result;
}
// call at login to generate jwt token for user
function generateJWT (payload){
    const options= {expiresIn: '1h'};
    const token = jwt.sign(payload,config.jwtSecret,options);
    return token;
}
// call when recieving a request

function authenticateToken(req, res, next) {
    const authHeader = req.headers["token"];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, config.jwtSecret, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        console.log("Authenticated")
        next();
    });
}
