const express = require('express');
const { dbconnect } = require('./config/database');
const { config } = require("dotenv");
var cors = require('cors');
const Course = require('./models/CourseSchema');

config();
const app = express();

app.use(express.json());
app.use(express.urlencoded(
    {
        extended:true
    }
    ));
    app.use(
        cors({
            origin: [
                "http://localhost:3000",
                "http://localhost:3001",
                "http://localhost:4000",
                'http://127.0.0.1:5500'
                      ],
              credentials: true,
        })
      );
dbconnect();


module.exports= app;