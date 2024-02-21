const express=require("express")
const mysql=require("mysql2")
const cors=require("cors")
const app=express()
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
app.listen(3000,(req,res)=>{
    console.log("connected")
})