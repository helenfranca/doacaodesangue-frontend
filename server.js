// const express = require("express");
// const path = require("path");
// const app = express();

// app.use(express.static(__dirname + "/dist/doacaodesangue-frontend"));

// app.get("/*", (req, res) => {
//   res.sendFile(
//     path.join(__dirname + "/dist/doacaodesangue-frontend/index.html")
//   );
//   console.log("caminho:", __dirname);
// });

// app.listen(process.env.PORT || 8080);

const express = require("express");
const app = express();
const path = require("path");
app.use(express.static(__dirname + "/doacaodesangue-frontend"));
app.listen(process.env.PORT || 8080); //PATH LOCATION STARTEGY
app.get("/*", function(req, res) {
  const fullPath = path.join(__dirname + "/doacaodesangue-frontend/index.html");
  console.log(" Fetching from.." + fullPath);
  res.sendFile(fullPath);
});
console.log("Server started running.."); //Changed to run on Heroku
