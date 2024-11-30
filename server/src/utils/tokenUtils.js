const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = id => {
  if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
  }

  return jwt.sign({ id }, JWT_SECRET, {
    expiresIn: "1h",
  });
};

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  const token = bearerHeader?.split(" ")[1];

  if (!token) {
    return res.status(401).json({success: false, message: "Unauthorized - No valid token", data: {} });
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({success: false, message: "Unauthorized - Invalid token", data: {} });
    }

    req.userId = decoded.id;

    next();
  });
};

const isValidToken = token => {
  const validToken = jwt.verify(token, JWT_SECRET);

  return validToken;
};

module.exports = { verifyToken, generateToken, isValidToken };
