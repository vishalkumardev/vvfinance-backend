const generateUserId = (usertype) => {
  return usertype + Math.floor(Math.random() * 1000000000);
};

module.exports = { generateUserId };
