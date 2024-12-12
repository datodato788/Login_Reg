const express = require("express");
const bodyParser = require("body-parser");
const login = require("./routes/login");
const register = require("./routes/register");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("public"));


app.post("/login", login);
app.post("/register", register);

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
