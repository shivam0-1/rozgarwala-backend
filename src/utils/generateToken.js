import jwt from "jsonwebtoken";

const generateToken = (entity) => {
  return jwt.sign(
    {
      id: entity._id,
      role: entity.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

export default generateToken;
