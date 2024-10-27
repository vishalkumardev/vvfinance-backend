var jwt = require("jsonwebtoken");

const generateToken = (data) => {
  const token = jwt.sign(
    {
      userId: data.userId,
      email: data.email,
      name: data.name,
      role: data.role,
    },
    process.env.SECRET_KEY
  );
  return token;
};

const verifyToken = (req, res, next) => {
  // Get auth header value
  const authHeader = req.headers["authorization"];
  const ipAddress = req.ip.includes("::ffff:")
    ? req.ip.split("::ffff:")[1]
    : req.ip;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      data: {
        message: "Please login to continue.",
        unauthenticated: true,
      },
      message: {
        error: ["Unauthorized access restricted."],
      },
      success: false,
    });
  }

  const token = authHeader.slice(7);
  // Verify the token
  jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
    if (err) {
      return res.status(401).json({
        success: false,
        data: {
          name: "JsonWebTokenError",
          message: "jwt malformed",
        },
        message: {
          error: ["Unauthorized access restricted."],
        },
        success: false,
      });
    }

    // const checkUser = async (fns) => {
    //   const user = await fns(decoded.email);
    //   if (!user) {
    //     return false;
    //   }
    //   return true;
    // };

    // // Define role mappings
    // const roleMappings = {
    //   admin: getUser,
    //   cho: getChoByEmail,
    //   consultant: getCousultantByEmail,
    //   instructor: getInstructorByEmail,
    // };

    // // Check user role and call corresponding function
    // const role = decoded.role;
    // const userExists = await checkUser(roleMappings[role]);

    // if (!userExists) {
    //   return res.status(401).json({
    //     success: false,
    //     data: {
    //       message: "Please login to continue.",
    //       unauthenticated: true,
    //     },
    //     message: {
    //       error: ["Unauthorized access restricted."],
    //     },
    //     success: false,
    //   });
    // }

    // Attach the decoded payload to the request for further use
    req.user = { ...decoded, ipAddress };
    next();
  });
};

module.exports = { generateToken, verifyToken };
