import jwt from "jsonwebtoken";
const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    // accessToken
    const accessToken = jwt.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "2 days",
    });
    const refreshToken = jwt.sign(payload, privateKey, {
      algorithm: "RS256",
      expiresIn: "7 days",
    });
    return { accessToken, refreshToken };
  } catch (error) {}
};

export default { createTokenPair };
