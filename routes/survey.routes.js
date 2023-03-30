const express = require('express');
const router = express.Router();

router.post('/upload/survey', (req,res) => {
    let item = req.body;
    console.log(item);
    let sumglobal = (item.question1 + item.question2 + item.question3);
    let global = (sumglobal/3).toFixed(2);
  
    let sql = `INSERT INTO valoracion VALUES ('${item.id}','${item.course}','${item.student}',${item.question1},${item.question2},${item.question3},'${item.question4}', ${global})`;
  
    res.status(200).send("exito");
  })

module.exports = router;