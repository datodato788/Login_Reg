const { MongoClient } = require('mongodb');
require('dotenv').config({ path: './config/.ENV' });
const dbUri = process.env.URI
const client = new MongoClient(dbUri);



const register = async (req, res) => {


  const { RegUsername, RegPassword } = req.body;

  const jsonF = {
    username: RegUsername,
    password: RegPassword,
    ROLE: "member",
  };

  try {
    await client.connect();
    console.log("მონაცემთა ბაზასთან დაკავშირება წარმატებით ✅");

    const db = client.db("test");
    const collection = db.collection("users");

    const user = await collection.findOne({ username: jsonF.username });
    if (user) {
      console.log("მომხმარებელი უკვე არსებობს ❌");
      return res.status(400).send("მომხმარებელი უკვე არსებობს ❌");
    }

    await collection.insertOne(jsonF);
    console.log("მომხმარებელი წარმატებით დაემატა ✅");
    res.send("დარეგისტრირდა ✅");
  } catch (error) {
    console.error("შეცდომა ❌", error);
    res.status(500).send("სერვერის შეცდომა ❌");
  }
}

module.exports = register
