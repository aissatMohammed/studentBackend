const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt=require("jsonwebtoken")

// Define schema with validation
const schemauser = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
});

// Define the User model before using it
const User = mongoose.model('User', schemauser);

// MongoDB connection URL (ensure to use the correct database name)
const url = 'mongodb://127.0.0.1:27017/your_database_name';

// Ensure Mongoose connection is handled properly
const connectToDatabase = () => {
  return mongoose.connect(url); // Remove deprecated options
};

exports.register = (username, email, password) => {
  return new Promise((resolve, reject) => {
    connectToDatabase() // Connect to the database
      .then(() => {
        // Now safely use the User model
        return User.findOne({ email: email });
      })
      .then((existingUser) => {
        if (existingUser) {
          return Promise.reject(new Error('Email already exists'));
        }
        return bcrypt.hash(password, 10); // Hash the password
      })
      .then((hashedPassword) => {
        const newUser = new User({
          username: username,
          email: email,
          password: hashedPassword
        });
        return newUser.save(); // Save the new user
      })
      .then((savedUser) => {
        mongoose.disconnect(); // Disconnect from the database
        resolve(savedUser); // Resolve with the saved user
      })
      .catch((err) => {
        mongoose.disconnect(); // Ensure disconnection on error
        reject(err); // Reject with the error
      });
  });
};
const privatekey = "this is my private key ibskoasfoauilsfcials"; // Your private key
exports.login = (email, password) => {
  return new Promise((resolve, reject) => {
    connectToDatabase()
      .then(() => User.findOne({ email: email })) // Find the user by email
      .then((existingUser) => {
        if (!existingUser) {
          mongoose.disconnect(); // Disconnect from the database
          return Promise.reject(new Error('We don\'t have this email in the database'));
        }
        return bcrypt.compare(password, existingUser.password) // Compare password
          .then((isMatch) => {
            if (isMatch) {
              // Generate JWT token
              const token = jwt.sign(
                { id: existingUser._id, username: existingUser.username },
                privatekey,
                { expiresIn: '1h' } // Token expiry (e.g., 1 hour)
              );

              mongoose.disconnect(); // Disconnect from the database
              resolve(token); // Resolve with the token
            } else {
              mongoose.disconnect(); // Disconnect from the database
              reject("Invalid password"); // Reject with the error
            }
          });
      })
      .catch((err) => {
        mongoose.disconnect(); // Ensure disconnection on error
        reject(err); // Reject with the error
      });
  });
};
