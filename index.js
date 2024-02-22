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
app.post('/add-book', (req, res) => {
  const {id, title, author, subjects, publish } = req.body;

  if (!title || !author || !subjects || !publish) {
    return res.status(400).json({ error: 'All fields are required' });
  }
else{  const insertQuery = 'INSERT INTO book (id, title, author, subjects, publish) VALUES (?, ?, ?, ?, ?)';

  pool.query(insertQuery, [id,title, author, subjects, publish], (err, results) => {
    if (err) {
      console.error('Error adding book to MySQL:', err);
      return res.status(500).json({ error: 'Error saving book to the database' });
    }
    else{
      res.send("ok")
    }
  })
}
})
app.delete('/delete-book/:id', (req, res) => {
  const bookId = req.params.id;

  if (!bookId) {
    return res.status(400).json({ error: 'Book ID is required' });
  }

  const deleteQuery = 'DELETE FROM book WHERE id = ?';

  pool.query(deleteQuery, [bookId], (err, results) => {
    if (err) {
      console.error('Error deleting book from MySQL:', err);
      return res.status(500).json({ error: 'Error deleting book from the database' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.status(200).json({ message: 'Book deleted successfully' });
  });
});

 const port=process.env.PORT||3000;
app.listen(port,(req,res)=>{
    console.log("connected")
})
