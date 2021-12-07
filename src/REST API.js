require ('dotenv').config();


import express from 'express';
import './server.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';

//enable CORS
app.use(cors());
//Parse application/json
app.use(bodyParser.json());
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended : true}));