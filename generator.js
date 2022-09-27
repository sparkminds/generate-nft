require("dotenv").config();
const Jimp = require("jimp");
const fs = require("fs");
const Traits = require("./traits");

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const build = async (index, onComplete, treeBG, treeFace, treeEyes) => {
  var _traits = [];

  const background = Traits.getBackground(treeBG);
  const backgroundJimp = await Jimp.read(
    `./input_images/background/${background.path.split("\\")[2]}/${
      background.name
    }`
  );
  _traits.push({
    trait_type: "Background",
    value: background.name,
  });

  var _composedImage = backgroundJimp;

  const face = Traits.getFace(treeFace);
  const faceJimp = await Jimp.read(
    `./input_images/face/${face.path.split("\\")[2]}/${face.name}`
  );
  _traits.push({
    trait_type: "Face",
    value: face.name,
  });

  _composedImage.blit(faceJimp, 0, 0);

  const eye = Traits.getEyes(treeEyes);
  const eyesJimp = await Jimp.read(
    `./input_images/left_eye/${eye.path.split("\\")[2]}/${eye.name}`
  );
  _traits.push({
    trait_type: "Eyes",
    value: eye.name,
  });

  _composedImage.blit(eyesJimp, 0, 0);

  await _composedImage.write("Output/images/" + index + ".png");
  await sleep(20);

  await fs.writeFileSync(
    "Output/metadata/" + index + ".json",
    JSON.stringify({
      name: "My NFT #" + index,
      traits: _traits,
      image: index + ".png",
    })
  );

  onComplete();
};

module.exports = {
  build,
};
