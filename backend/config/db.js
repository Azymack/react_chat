// const mongoose = require("mongoose");

// const connectionDB = async () => {
//     try {
//         const conn = await mongoose.connect(process.env.MONGODB_URL,{
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         })

//         console.log(" mongoDB connected ", conn.connection.host);

//     } catch (error) {

//         console.log(" mongoDB connection error ", error.message);
//         process.exit();

//     }
// }

// module.exports = connectionDB

const mysql = require("mysql");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "chat",
});
con.connect(function (err) {
  if (!err) {
    console.log("Database is connected ... ");
  } else {
    console.log("Error connecting database ... ");
  }
});

module.exports = con;
