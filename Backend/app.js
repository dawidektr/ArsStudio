const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path')
const config = require('./config.js')
const { createTokens, validateToken,validateRole } = require('./auth');
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");

const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://ddziedziak.pl");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
  });

app.use(bodyParser.urlencoded({extended:false}))
app.use(cookieParser());
app.use(bodyParser.json())


const port = process.env.PORT || 5000;

const pool  = mysql.createPool({
    connectionLimit : 10,
    host            : config.host,
    user            : config.user,
    password        : config.password,
    database        : config.dbname
})




app.get('/api/list',(req,res)=>
{
    pool.getConnection((err,connection) => {
        if(err) throw err

        connection.query('SELECT * from tractors',(err,rows) =>{
            connection.release() // return connection to pool
            if(!err){
                res.send(rows)
            } else{
                console.log(err);
            }
        })
    })
})


app.get('/api/edit/:id',validateRole(["admin","user"]),(req,res)=>
{
    pool.getConnection((err,connection) => {
        if(err) throw err
        
        connection.query('SELECT * from tractors WHERE id_tractor = ?',[req.params.id],(err,rows) =>{
            connection.release() // return connection to pool
            if(!err){
                res.send(rows)
            } else{
                console.log(err);
            }
        })
    })
})


app.post('/api/edit', validateRole(["admin","user"]),  (req, res) => {
    
    const { id_tractor, make, model} = req.body;
    const power = parseInt(req.body.power);        
    pool.getConnection((err, connection) => {
        if(err) throw err       
        connection.query('UPDATE tractors SET make = ?, model = ?, power = ? WHERE id_tractor = ?', [make, model, power,id_tractor] , (err, rows) => {
            connection.release() 
            if(!err) {
                res.send('ok');
            } else {
                console.log(err)
            }
        })

        
    })
})


app.post('/api/add', validateRole("admin"),  (req, res) => {
    const role = req.cookies["role"];
    const {make, model} = req.body; 
    const power = parseInt(req.body.power)       
    pool.getConnection((err, connection) => {
        if(err) throw err       
        connection.query('INSERT INTO `tractors`(`id_tractor`, `make`, `model`, `power`) VALUES (null,?,?,?)', [make, model,power] , (err, rows) => {
            connection.release() 
            if(!err) {
                res.send('Dodawanie udane');
            } else {
                console.log(err)
            }
        })

        
    })
   
})


app.delete('/api/delete/:id',validateRole("admin"),(req,res)=>{

    pool.getConnection((err, connection) => {
        if(err) throw err
        connection.query('DELETE FROM `tractors` WHERE id_tractor=?', [req.params.id] , (err) => {
            connection.release()
            if(!err) {
                res.send('ok');
            } else {
                console.log(err)
            }
        })
}
)
}
)


app.post("/api/register", (req, res) => {
    const { login, password } = req.body;
    
    pool.getConnection((err,connection) => {
        if(err) throw err
        
        connection.query('SELECT * from users WHERE name = ?',[login],(err,rows) =>{
            connection.release() // return connection to pool
            if(!err && rows[0] && rows[0].name===login){
                res.send("User o podanym loginie istnieje. Spróbuj inną nazwę")
            } else{
                bcrypt.hash(password, 10).then((hash) => {
                    pool.getConnection((err, connection) => {
                        if(err) throw err
                       
                     connection.query(`INSERT INTO users(id_user,role, name, password) VALUES (null,"user",?,?)`,[login,hash], (err) => {
                            connection.release() 
                            if(!err) {
                                res.json("REGISTERED");                   
                            } else {
                                console.log(err)
                                res.status(400).json({ error: err });
                            }    
                        })
                    })
                });
            }
        })
    })
   



    

  });





app.post("/login",(req, res) => {
    const { username, password } = req.body;    
    let dbPassword;
    pool.getConnection((err, connection) => {
        if(err) throw err       
        connection.query('SELECT * FROM `users` WHERE name=?', [username] , (err, rows) => {
            connection.release()
            if(!err) {
                if(!rows[0])
                {
                  return  res.status(200).json({ error: "Podany user nie istnieje" });
                }
                dbPassword=rows[0].password;
                if(dbPassword)
                {                    
                 bcrypt.compare(password, dbPassword).then((match) => {
                      if (!match) {
                        res
                          .status(200)
                          .json({ error: "Podane hasło jest nieprawidłowe" });
                      } else {
                       const user={
                            'name':username,
                            'id_user':rows[0].id_user
                             }
                        const accessToken = createTokens(user);                  
                        res.cookie("access-token", accessToken, {
                          maxAge: 60 * 60 * 24 * 30 * 1000,
                          httpOnly: true,
                        });
                        res.cookie("role",rows[0].role,{
                            maxAge: 60 * 60 * 24 * 30 * 1000,
                          });                                     
                        res.send("OK");
                      }
                    });
                }
            } else {
                console.log(err)
            }

        })
    })
  });

  

  app.post("/auth", validateToken, (req, res) => {
    res.json("zalogowany");
  });



app.post("/logout", (req, res) => {
    const responseHeaders = {
      "Content-Type": "application/json",
      "set-cookie": [
        `access-token=''; Path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0;`,
        `role=''; Path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0;`  

      ],
    };
    res.writeHead(204, responseHeaders);
    res.end();
  });


app.use(express.static(path.join(__dirname, 'build')));

const rootRouter = express.Router();

rootRouter.get('(/*)?', async (req, res, next) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

  app.use(rootRouter);

//Listen on port or 5000

app.listen(port,()=>console.log(`Listen on port ${port}`))