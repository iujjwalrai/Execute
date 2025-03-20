const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");  
const { loginUser, registerUser } = require('../controllers/authControllers');
const { isLoggedIn } = require("../middlewares/isLoggedIn");
const userModel = require("../models/userModel");
const multer = require("multer");
const dotenv = require("dotenv");
dotenv.config();
const upload = multer();  

let analyzeCareer;
// Dynamic import of the ES module
import('../ai_path.mjs').then(module => {
    analyzeCareer = module.analyzeCareer;
}).catch(err => {
    console.error('Error importing ai_path.mjs:', err);
});

// Login Routes
router.post("/login", loginUser);

// Signup Route
router.post("/signup", registerUser);
