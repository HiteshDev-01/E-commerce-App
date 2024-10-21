import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, message: "Token is required !" });
    }

    // Token ko "Bearer " ke baad extract karna
    const token = authHeader.split(" ")[1];

    const decoded_token = jwt.verify(token, process.env.TOKEN_SECRET);

    // Validation check based on admin credentials
    if (
      decoded_token !==
      process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD
    ) {
      return res
        .status(403)
        .json({ success: false, message: "Invalid credentials !" });
    }

    next(); // Proceed to the next middleware or route
  } catch (error) {
    console.error(error);
    return res.status(403).json({
      success: false,
      message: `Invalid credentials: ${error.message}`,
    });
  }
};

export default adminAuth;
