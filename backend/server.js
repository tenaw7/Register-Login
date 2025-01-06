const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const port = 5000;

const cors = require('cors');

// Enable CORS for all origins
app.use(cors());


// Middleware
app.use(bodyParser.json());

// MongoDB Configuration
const uri = 'mongodb://127.0.0.1:27017/'; // Change to your MongoDB Compass URI
const dbName = 'userDatabase'; // Replace with your database name

let db;

// Connect to MongoDB
MongoClient.connect(uri)
    .then((client) => {
        console.log('Connected to MongoDB');
        db = client.db(dbName);
    })
    .catch((error) => console.error('Failed to connect to MongoDB:', error));


// Routes

// Register User
app.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const usersCollection = db.collection('users');

        // Check if the user already exists
        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
            return res.status(400).send('User already exists');
        }

        // Insert new user
        await usersCollection.insertOne({ firstName, lastName, email, password });
        res.status(200).send('User registered successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error registering user');
    }
});

// Login User
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const usersCollection = db.collection('users');

        // Find user
        const user = await usersCollection.findOne({ email, password });
        if (!user) {
            return res.status(401).send('Invalid email or password');
        }

        // Return user data
        res.status(200).json({ firstName: user.firstName, lastName: user.lastName });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error logging in');
    }
});


// Password Recovery (Example)
app.post('/recover-password', async (req, res) => {
    try {
        const { email } = req.body;
        const usersCollection = db.collection('users');

        const user = await usersCollection.findOne({ email });
        if (!user) {
            return res.status(404).send('User not found');
        }

        // Simulate sending a password recovery email
        res.status(200).send(`Password recovery instructions sent to ${email}`);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error recovering password');
    }
});

// Start Server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});