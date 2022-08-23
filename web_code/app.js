const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const users = require("./routes/users");

const PORT = process.env.PORT || 5000;
let localhost = `http://localhost:${PORT}`;

app.use(bodyParser.json());
app.use("/users", users);

app.get("/", (req, res) => {
    res.send("<h1>Homepage</h1>");
});

app.post("/createProfile", (req, res) =>{
        
});

app.listen(PORT, (error) => {
    if (error) throw error;
    console.log(`App listening on PORT ${PORT}`);
    console.log(`Local Host: ${localhost}`);
});