const mysql = require('mysql');

const URI = 'localhost';

  //----------------------BD Alumnos
  const connection = mysql.createConnection({
    host     : URI,
    user     : 'root',
    password : '',
    database : 'asistencia'
  });

  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
  
    console.log('connected as id ' + connection.threadId);
  });
    //----------------------BD Admin
  const adminDB = mysql.createConnection({
    host     : URI,
    user     : 'root',
    password : '',
    database : 'iavante'
  });

    
    adminDB.connect(function(err) {
        if (err) {
          console.error('error connecting: ' + err.stack);
          return;
        }
      
        console.log('connected as id ' + connection.threadId);
      });
  
module.exports = connection,adminDB;