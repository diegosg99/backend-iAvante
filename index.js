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

// const corsOptions = {
//   origin: "*", // Reemplaza "*" con el dominio o dominios permitidos en tus aplicaciones cliente
//   methods: "GET, POST, PUT, DELETE", // Métodos HTTP permitidos
//   allowedHeaders: "Content-Type, Authorization", // Encabezados permitidos
// };

const app = express();

//const router = express.Router();

app.set('port', process.env.PORT || PORT);

app.use(express.json({limit: '500mb'}));
//app.use(cors(corsOptions));
app.use(morgan('dev'));


            //----------------------BD Alumnos
const connection = mysql.createConnection({
  host     : '127.0.0.1',
  port     : '33060',
  user     : 'admin',
  password : 'Kiro&doddy1',
  database : 'iavante'
});
            //----------------------BD Admin
// const adminDB = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '',
//   database : 'iavante'
// });

connection.connect(err => {
  err ?console.error('error connecting: ' + err.stack)
  :console.log('connected as id ' + connection.threadId);
});
// adminDB.connect(err => {
//   err ?console.error('error connecting: ' + err.stack)
//       :console.log('connected as id ' + connection.threadId);
// });

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

//app.use(require('./routes/admins.routes'));

//app.use(require('./routes/students.routes'));

//app.use(require('./routes/courses.routes'));

//app.use(require('./routes/survey.routes'));

//--------------------STUDENTS-----------------------------------------

app.put('/student/update',(req,res) => {
  try{
    let data = req.body;
  
    let timestamp = moment().unix();
  
    let sql = `UPDATE alumnos 
                  SET dni='${data.dni}',
                  name='${data.name}',
                  surname='${data.surname}',
                  email='${data.email}',
                  phone='${data.phone}',
                  details='${data.details}',
                  rights='${data.rights}',
                  entry='${moment.unix(timestamp).format("YYYY-MM-DD HH:mm:ss")}'
                  WHERE dni = '${data.dni}';`;
  
    connection.query(sql, function(err, rows, fields) {
        if (err) throw err;
        res.status(200).send(data);
        });
  }catch(error) {
    res.status(400).send(req);
  }
  })

app.get('/students/course/:id',(req,res) => {
try{
  let data = req.params.id;
  let sql = `SELECT dni,name,surname FROM alumnos WHERE course = '`+data+`';`;
  connection.query(sql, function(err, rows, fields) {
      if (err) throw err;
      res.status(200).send({rows});
      });
}catch(error){
  res.status(400).send({msg:"Error"});
}
})

app.get('/students',(req,res) => {
try{
  let sql = `SELECT * FROM alumnos;`;
  connection.query(sql, function(err, rows, fields) {
      if (err) throw err;
      res.status(200).send({rows});
      });
}catch(error){
  res.status(400).send({msg:"Error"});
}
})

app.get('/student/data/:id',(req,res) => {
try{
  let data = req.params.id;
  let sql = `SELECT * FROM alumnos WHERE dni = '`+data+`';`;
  connection.query(sql, function(err, rows, fields) {
      if (err) throw err;
      res.status(200).send({rows});
      });
}catch(error){
  res.status(400).send({msg:"Error"});
}
})

app.post('/students/uploadExcel',(req,res) => {
  try{
    let data = req.body;
  
    data.forEach(item =>{
      let sql = `INSERT IGNORE INTO alumnos VALUES ('${item.dni}','${item.name}','${item.surname}','${item.email}',${item.phone},'${item.details}','${item.course}','${item.rights}','${item.entry}','${item.exit}')`;
  
    connection.query(sql, function(err, rows, fields) {
        if (err) throw err;
        //res.status(200).send("exito");
        });
    })
  }catch(error) {
    res.status(400).send(req);
  }
  })
//---------------------------------COURSES---------------------------------------
app.get('/courses/name',(req,res) => {
  try{
      let sql = `SELECT code,name FROM cursos;`;
      connection.query(sql, function(err, rows, fields) {
          if (err) throw err;
          res.status(200).send({rows});
          });
  }catch(error){
      res.status(400).send({msg:"Error"});
  }
})

app.get('/courses',(req,res) => {
  try{
      let sql = `SELECT * FROM cursos;`;
      connection.query(sql, function(err, rows, fields) {
          if (err) throw err;
          res.status(200).send({rows});
          });
  }catch(error){
      res.status(400).send({msg:"Error"});
  }
  })

app.get('/course/documentation/:courseCode',(req,res) => {
let courseCode = req.params.courseCode;
try{
    let sql = `SELECT documentationUrl FROM cursos WHERE code = '${courseCode}';`;
    connection.query(sql, function(err, rows, fields) {
        if (err) throw err;
        res.status(200).send({rows});
        });
}catch(error){
    res.status(400).send({msg:"Error"});
}
})

app.get('/course/room/:courseCode',(req,res) => {
let courseCode = req.params.courseCode;
try{
    let sql = `SELECT room FROM cursos WHERE code = '${courseCode}';`;
    connection.query(sql, function(err, rows, fields) {
        if (err) throw err;
        res.status(200).send({rows});
        });
}catch(error){
    res.status(400).send({msg:"Error"});
}
})

app.get('/course/:courseCode',(req,res) => {
let courseCode = req.params.courseCode;
try{
    let sql = `SELECT * FROM cursos WHERE code = '${courseCode}';`;
    connection.query(sql, function(err, rows, fields) {
        if (err) throw err;
        res.status(200).send(rows[0]);
        });
}catch(error){
    res.status(400).send({msg:"Error"});
}
})

app.post('/courses/uploadExcel',(req,res) => {
try{
  let data = req.body;

  data.forEach(item =>{
    let sql = `INSERT IGNORE INTO cursos VALUES ('${item.id}','${item.code}','${item.name}','${item.tutor}','${item.room}','${item.day}','${item.documentation}')`;

  connection.query(sql, function(err, rows, fields) {
      if (err) throw err;
      res.status(200).send("exito");
      });
  })
}catch(error) {
  res.status(400).send(req);
}
})

//---------------------------------------SURVEY--------------------------------

app.post('/upload/survey', (req,res) => {
  let item = req.body;
  console.log(item);
  let sumglobal = (item.question1 + item.question2 + item.question3);
  let global = (sumglobal/3).toFixed(2);

  let sql = `INSERT INTO valoracion VALUES ('${item.id}','${item.course}','${item.student}',${item.question1},${item.question2},${item.question3},'${item.question4}', ${global})`;

  res.status(200).send("exito");
})



//-------------------- Start Server ------------------------------------
app.listen(app.get('port'), () =>
console.log(`¡Aplicación escuchando en el puerto ${app.get('port')}!`),
);