import jwt from "jsonwebtoken";

export const userAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "You are not authorized, Come back after login !",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded_token = jwt.verify(token, process.env.TOKEN_SECRET);
    req.body.userId = decoded_token.id;
    next();
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};
