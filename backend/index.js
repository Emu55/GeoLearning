const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const appRoutes = require('./routes/appRoutes'); // Import the routes

const app = express();
const port = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB successfully');
}).catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
});

// Use routes from appRoutes.js
app.use('/', appRoutes);

// Start the server
http.createServer(app).listen(port, () => {
    console.log(`Backend running on port ${port}`);
});
