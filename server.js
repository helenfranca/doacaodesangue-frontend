const express = require("express");
const path = require("path");
const app = express();

app.use(express.static(__dirname + "/dist/doacaodesangue-frontend"));

app.get("/*", (req, res) => {
  res.sendFile(
    path.join(__dirname + "/dist/doacaodesangue-frontend/index.html")
  );
  console.log(__dirname);
});

app.listen(process.env.PORT || 8080);
