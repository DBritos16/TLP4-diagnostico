const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const conectDB = require('./src/databases/db');
require('dotenv').config();
conectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use(require('./src/routers/task.routes'));


app.listen(3000, ()=>console.log('Servidor corriendo en el puerto 3000'));