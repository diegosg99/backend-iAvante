//-------------------------------- SETTINGS --------------------------------

const express = require("express");
const cors = require("cors");
const mysql = require('mysql');
const moment = require('moment');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const morgan = require('morgan');

//const {connection,adminDB} = require ('./database');  --------------------> externalizacion de BD pero da error

            //---------------------- CONSTS
const formatComplete = 'YYYY-MM-DD HH:mm:ss'
const PORT = 3003;
const SECRET = "614f4f4a6568e9ae881c76e8753f65c9";

const app = express();
app.set('port', process.env.PORT || PORT);

app.use(express.json({limit: '500mb'}));
app.use(cors());
app.use(morgan('dev'));


            //----------------------BD Alumnos
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'asistencia'
});
            //----------------------BD Admin
const adminDB = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'iavante'
});

connection.connect(err => {
  err ?console.error('error connecting: ' + err.stack)
  :console.log('connected as id ' + connection.threadId);
});
adminDB.connect(err => {
  err ?console.error('error connecting: ' + err.stack)
      :console.log('connected as id ' + connection.threadId);
});

//--------------------------------------- MIDDLEWARES --------------------------------------

          //-------------Encode/Decode Passwords------------------

encodePassword = async (password) => {
const hash = await bcrypt.hash(password, 10);
return hash;
}

comparePassword = async (plaintextPassword, hash) => {
const result = await bcrypt.compare(plaintextPassword, hash);
return result;
}

//--------------------------------------- ROUTES -------------------------------------------

app.use(require('./routes/admins.routes'));

app.use(require('./routes/students.routes'));

app.use(require('./routes/courses.routes'));

app.use(require('./routes/survey.routes'));

//-------------------- Start Server ------------------------------------
app.listen(app.get('port'), () =>
console.log(`¡Aplicación escuchando en el puerto ${app.get('port')}!`),
);