import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  const token = req.cookies.authorization;
  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      res.status(401).json({ status: "fail", message: "unauthorized" });
      return;
    }
    req.userInfo = decoded; //decrypt and store the userinfo from jwt token
  });
  next();
};
