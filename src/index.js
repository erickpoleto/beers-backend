const express = require('express');
const routes = require('./routes');
const cors = require('cors')
const mongoose = require('mongoose');
const requireDir = require('require-dir');
require("dotenv").config()

const app = express();
app.use(cors())
app.use(express.json());


//iniciando o db
mongoose.connect(
    process.env.MONGO_URL, 
    {useNewUrlParser: true, 
    useCreateIndex: true,
    useUnifiedTopology: true
    }
);
requireDir("./models")

app.use(routes)

app.listen(process.env.PORT || 3333);