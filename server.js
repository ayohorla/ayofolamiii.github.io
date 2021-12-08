require('dotenv').config();

import express from 'express';
import cors from 'cors';
import { json, urlencoded } from 'body-parser';
import { verify } from 'jsonwebtoken';
import { generateToken, getCleanUser } from './utils';
const app = express();
const port = process.env.PORT || 3000;

//Static user details
const userData = {
    userId: "789789",
    password: "123456",
    name: "Ayo Folami",
    username: "ayofolami",
    isAdmin: true
};

//enable CORS
app.use(cors());
//parse application/json
app.use(json());
//parse application/x-www-form-urlencoded
app.use(urlencoded({ extended: true}));

//middeware checks if jwt token exists, verifies it and 
//helps to know if the request is authenticated or not.
app.use(function (req, res, next) {
    var token = req.headers['authorization'];
    if (!token) return next(); //if no token, next

    token = token.replace('bearer ','');
    verify(token.replace, process.env.JWT_SECRET, function (err, user){
        if(err){
            return res.status(401).json({
                error: true,
                message: "Invalid user."
            });
        } else{
            req.user = user;
            next();
        }
    });
});

//request handlers
app.get('/', (req, res) =>{
    if (!req.user) 
    return res.status(401).json({
        success: false, 
        message: 'Invalid user cant have access'
    });
    res.send('Welcome to Square Loan ' + req.user.name);
});

// validate the user credentials
app.post('/users/signin', function (req, res) {
    const user = req.body.username;
    const pwd = req.body.password;

    // return 400 status if username/password dont exist
    if (!user || !pwd) {
        return res.status(400).json({
            error: true,
            message: "Username or Password required."
        });
    }
    // return 401 status if the credential is not match.
    if (user !== userData.username || pwd !== userData.password) {
        return res.status(401).json({
            error: true,
            message: "Username or Password is Wrong."
        });
    }
    // generate token
    const token = generateToken(userData);
    // get basic user details
    const userObj = getCleanUser(userData);
    // return the token along with user details
    return res.json({ user: userObj, token });
});

// verify the token and return it if it's valid
app.get('/verifyToken', function (req, res) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token;
    if (!token) {
        return res.status(400).json({
            error: true,
            message: "Token is required."
        });
    }
    // check token that was passed by decoding token using secret
    verify(token, process.env.JWT_SECRET, function (err, user) {
        if (err) return res.status(401).json({
            error: true,
            message: "Invalid token."
        });
        // return 401 status if the userId does not match.
        if (user.userId !== userData.userId) {
            return res.status(401).json({
                error: true,
                message: "Invalid user."
            });
        }
        // get basic user details
        var userObj = getCleanUser(userData);
        return res.json({ user: userObj, token });
    });
});
app.listen(port, () => {
    console.log('Server start on: ' +port);
});