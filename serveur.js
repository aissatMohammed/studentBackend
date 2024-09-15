const express=require('express')
const path=require('path')
const app=express()
const routerbook=require('./routes/student.routes')
const routeruser=require('./routes/user.routers')
const cors = require('cors');
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); 
app.use(express.static(path.join(__dirname,'assets')))
app.use(express.urlencoded({ extended: true }));

app.set('view engine','ejs')
app.set('views','views')
// app.use((req,res,next)=>{
//     res.seatHeader('Access-Control-Allow-Origin',"*")
//     res.seatHeader('Access-Control-request-Method',"*")
//     res.seatHeader('Access-Control-Allow-Headers',"*")
//     next()
// })


app.use('/',routerbook)

app.use('/',routeruser)










app.listen(4000,()=>{console.log('serveur is running in port 4000')})