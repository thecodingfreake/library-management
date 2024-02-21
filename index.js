const express=require("express")
const mysql=require("mysql2")
const cors=require("cors")
const app=express()
const dotenv=require("dotenv")
dotenv.config()
app.use(express.json())
app.use(cors())
const pool=mysql.createPool({
    host:"localhost",
    user:'root',
    password:'1234',
    database:'library'
 })
 app.get("/",(req,res)=>{
    pool.query("Select * from book",(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            res.json(result)
        }
    })
 })
 const port=process.env.PORT||3000;
app.listen(port,(req,res)=>{
    console.log("connected")
})