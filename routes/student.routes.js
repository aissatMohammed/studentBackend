const rout=require('express').Router()
const studentModel=require('../models/student.module')
const jwt=require("jsonwebtoken")
require("dotenv").config()

const privatekey = "this is my private key ibskoasfoauilsfcials"; // Your private key
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    
    if (!token) {
      return res.status(403).json({ msg: "Access rejected: No token provided" });
    }
  
    try {
      jwt.verify(token, privatekey);
      next(); // Token is valid, proceed to the next middleware or route handler
    } catch (e) {
      return res.status(401).json({ msg: "Access denied: Invalid token" });
    }
  };
  
// secretKey=process.env.secretKey
// password=process.env.password
rout.get('/home',(req,res,next)=>{
    // if(req.params.secretKey==secretKey){
    //     if(req.params.password==password){
    studentModel.testconect().then((msg)=>res.send(msg)).catch((err)=>res.send(err))
    //     }else{
    //         res.send("password are wrong")
    //     }
    // }else{
    //     res.send('secretkey are wrong')
    // }
})
rout.post('/student',(req,res,next)=>{
studentModel.postnewstudent(req.body.firstname,req.body.lastname,req.body.email,req.body.age,req.body.phone).then((msg)=>res.send(msg))
.catch((err)=>res.send(err))
})
rout.get('/allstudents',(req, res, next) => {
    // const token = req.headers.authorization;
    // let user=jwt.decode(token,{complete:true})
    studentModel.getallstudent()
        .then((students) => {
            res.json({student:students});  // Renvoie la liste des étudiants
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });  // Gestion des erreurs
        });
});
rout.get('/allstudents/:id', (req, res, next) => {
    studentModel.getallstudentbyid(req.params.id)
        .then((students) => {
            res.json(students);  // Renvoie la liste des étudiants
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });  // Gestion des erreurs
        });
});
rout.delete('/deletestudents/:id', (req, res, next) => {
    studentModel.delete(req.params.id)
        .then((students) => {
            res.json(students);  // Renvoie la liste des étudiants
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });  // Gestion des erreurs
        });
});



rout.patch('/patchstudents/:id', (req, res, next) => {
    studentModel.patchestudent(req.params.id,req.body.firstname,req.body.lastname,req.body.email,req.body.age,req.body.phone)
        .then((students) => {
            res.json(students);  // Renvoie la liste des étudiants
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });  // Gestion des erreurs
        });
});




module.exports=rout
