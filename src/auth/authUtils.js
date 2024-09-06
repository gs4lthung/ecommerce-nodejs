import jwt from "jsonwebtoken";
const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    // accessToken
    const accessToken = jwt.sign(payload, privateKey, {
      expiresIn: "2 days",
    });
    const refreshToken = jwt.sign(payload, privateKey, {
      expiresIn: "7 days",
    });
    jwt.verify(accessToken, publicKey, (err, decode) => {
      if (err) {
        console.log("Error in accessToken ", err);
      } else {
        console.log("decode accessToken ", decode);
      }
    });
    return { accessToken, refreshToken };
  } catch (error) {}
};

export { createTokenPair };
