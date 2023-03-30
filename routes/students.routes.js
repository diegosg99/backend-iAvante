const express = require('express');
const router = express.Router();


router.put('/student/update',(req,res) => {
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

router.get('/students/course/:id',(req,res) => {
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

router.get('/students',(req,res) => {
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

router.get('/student/data/:id',(req,res) => {
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

router.post('/students/uploadExcel',(req,res) => {
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

module.exports = router;