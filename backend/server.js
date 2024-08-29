const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors')

const app = express();
app.use(cors());

app.listen(5000,()=>console.log('Server listening on port 5000'))