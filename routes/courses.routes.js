const express = require('express');
const router = express.Router();

router.get('/courses/name',(req,res) => {
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
  
  router.get('/courses',(req,res) => {
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
  
  router.get('/course/documentation/:courseCode',(req,res) => {
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
  
  router.get('/course/room/:courseCode',(req,res) => {
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
  
  router.get('/course/:courseCode',(req,res) => {
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
  
  router.post('/courses/uploadExcel',(req,res) => {
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

module.exports = router;