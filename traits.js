require("dotenv").config();

const COMMON_MAX_RARITY = 50;
const SUPER_RARE_MAX_RARITY = 75;
const RARE_MAX_RARITY = 95;
const LEGENDARY_MAX_RARITY = 100;

const randomElement = (list) => {
  const _random = Math.floor(Math.random() * list.length);
  return list[_random];
};

const filterData = (data, name) => {
  return data?.children?.filter((x) => x?.name === name)[0]?.children;
};

const getRandomImage = (data) => {
  const _random = Math.floor(Math.random() * LEGENDARY_MAX_RARITY);
  if (_random < COMMON_MAX_RARITY) {
    return randomElement(filterData(data, "common"));
  } else if (_random < SUPER_RARE_MAX_RARITY) {
    return randomElement(filterData(data, "super_rare"));
  } else if (_random < RARE_MAX_RARITY) {
    return randomElement(filterData(data, "rare"));
  } else if (_random < LEGENDARY_MAX_RARITY) {
    return randomElement(filterData(data, "legendary"));
  }
};

const getBackground = (treeBG) => {
  return getRandomImage(treeBG);
};

const getFace = (treeFace) => {
  return getRandomImage(treeFace);
};

const getEyes = (treeEyes) => {
  return getRandomImage(treeEyes);
};

module.exports = {
  getBackground,
  getEyes,
  getFace,
};
