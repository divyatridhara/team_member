const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

mongoose.set('strictQuery', false);
const app = express();

mongoose.connect(
  "mongodb://127.0.0.1:27017/teammember",
 {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    
 }).then(
    ()=>console.log("DB connected")
 )


app.use(express.json())
app.use(cors({origin:'*'}))


app.get("/", (req, res) => {
  return res.send("<h1>TEAM MEMBER</h1>");
});

const TeamMember = mongoose.model('TeamMember', {
  name: String,
  position: String,
  bio: String,
  Teamnumber: String,
});

app.get('/api/team/:teamNumber', async (req, res) => {
  try {
    const students = await TeamMember.find({
      Teamnumber: req.params.teamNumber,
    });
    res.send(students);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

app.listen(3000, () => {
  console.log("Server is running....");
});