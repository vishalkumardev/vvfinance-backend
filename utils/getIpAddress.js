const getIpAddress = (req, res, next) => {
  const ipAddress = req.ip.includes("::ffff:")
    ? req.ip.split("::ffff:")[1]
    : req.ip;

  req.ipAddress = ipAddress;
  next();
};

module.exports = getIpAddress;
