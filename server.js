require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", require("./routes/auth.routes"));

app.get("/",(req,res)=>{
    res.send("Student Management is Running");
})

const db = require("./config/couchdb");

db.info()
  .then(() => console.log("✅ CouchDB connected successfully"))
  .catch(err => console.error("❌ CouchDB connection failed:", err.message));

  
app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on http://localhost:${process.env.PORT}`);
});
