const { MongoClient } = require('mongodb');
require('dotenv').config({ path: './config/.ENV' });
const dbUri = process.env.URI
const client = new MongoClient(dbUri);
const path = require('path');
const fs = require("fs")



const login = async (req, res) => {

  const { username, password } = req.body;
  try {
    await client.connect()
    console.log("მონაცემთა ბაზასთან დაკავშირება  ✅");

    const db = client.db("test");
    console.log("client თან დაკავშირება ✅");

    const collection = db.collection("users");
    console.log("DataBase სთან დაკავშირება✅");



    const user = await collection.findOne({
      username: username
    })

    if (user !== null && user.username == username) {
      if (user.password === password) {
        if (user.password === password) {
          return res.status(200).send("წარმატებით შეხვედით ✅");
        } else {
          return res.status(401).send("არასწორი პაროლი ❌");
        }

      } else {
        return res.status(401).send("არასწორი პაროლი ❌");
      }
    }
    else {
      return res.status(401).send("არასწორი სახელი ან პაროლი ❌");
    }
  }



  catch (err) {
    console.log(err)
  }

}

module.exports = login;
