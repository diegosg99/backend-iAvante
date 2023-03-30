const express = require('express');
const router = express.Router();

router.post('/admins/register',async (req,res) => {
    try{
      let item = req.body;
      let encodedPassword = await encodePassword(item.password);
      console.log(encodedPassword);
    
      let sql = `INSERT INTO admins VALUES ('${item.id}','${item.name}','${item.dni}','${item.username}','${item.email}','${item.phone}','${encodedPassword}','${item.photo}')`;
    
      adminDB.query(sql, function(err, rows, fields) {
          if (err) throw err;
          res.status(200).send("exito");
      });
    
    }catch(error) {
      res.status(400).send(item,req);
    }
    })
    
router.post('/admins/login', async (req,res) => {
try{
    let data = req.body;
    
    console.log(data);

    const token = jwt.sign(data.username,SECRET);
    data.token = token;

    let sql = `SELECT username,password FROM admins WHERE username = '${data.username}'`;

    adminDB.query(sql, function(err, rows, fields) {

    bcrypt.compare(data.password,rows[0].password).then(bool=>{

    if (bool===true) {
        res.status(200).send(data);
    }
    
    else{
        res.status(300).send("Credenciales incorrectas");
    }   
    });   
})
}catch(error) {
    res.status(400).send(req);
}
})

router.get('/admins/admin/:username', (req,res) => {
    try{
    let data = req.params.username;
    
    let sql = `SELECT * FROM admins WHERE username = '${data}'`;

    adminDB.query(sql, function(err, rows, fields) {
        res.status(200).send(rows[0]);
        
    })
    }catch(error) {
    res.status(400).send(req);
    }
})

router.get('/admins/checkToken/:token',(req,res) => {
try{
    let token = req.params.token;
    let username = jwt.verify(token,SECRET);

    res.status(200).send(username)

}catch(error) {
    res.status(400).send(req);
}
})

module.exports = router;