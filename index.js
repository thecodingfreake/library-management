const express=require("express")
const mysql=require("mysql2")
const cors=require("cors")
const app=express()
const dotenv=require("dotenv")
dotenv.config()
app.use(express.json())
app.use(cors())

const pool = mysql.createPool('mysql://root:FBB2H2Cg-5ccfB-cbD3AAD6DhD1GAgbG@viaduct.proxy.rlwy.net:50362/railway');


app.get("/", (req, res) => {
  try {
    // Use async/await for cleaner code
    pool.query("select * from book",(err,result)=>{
        if(err){
            console.log(err)
        }
        else{
            res.json(result)
        }
    })
  } catch (error) {
    console.error('Error executing SQL query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
 const port=process.env.PORT||3000;
app.listen(port,(req,res)=>{
    console.log("connected")
})
