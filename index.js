const Generator = require("./generator");
const express = require("express");
var bodyParser = require("body-parser");
const dirTree = require("directory-tree");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 3000;

const treeBG = dirTree("./input_images/background");
const treeFace = dirTree("./input_images/face");
const treeEyes = dirTree("./input_images/left_eye");

app.get("/generate", async (req, res) => {
  var _thisIndex = 1;
  const _maxSupply = 100;
  while (_thisIndex <= _maxSupply) {
    try {
      await Generator.build(
        _thisIndex,
        () => {
          _thisIndex++;
        },
        treeBG,
        treeFace,
        treeEyes
      );
    } catch (e) {
      console.error("Error while generating NFT " + _thisIndex);
      console.log(e);
      _thisIndex = _maxSupply + 1;
    }
  }
  res.send("Success");
});

app.post("/post-test", (req, res) => {
  console.log("Got body:", req.body);
  res.send("oke bro");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
