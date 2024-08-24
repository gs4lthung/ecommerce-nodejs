import shopModel from "../models/shop.model";
import bcrypt from "bcrypt";
import crypto from "crypto";
import KeyTokenService from "./keytoken.service";
const RoleShop = {
  SHOP: "SHOP",
  WRITER: "WRITER",
  EDITOR: "EDITOR",
  ADMIN: "ADMIN",
};
class AccessService {
  static signup = async (name, email, password) => {
    try {
      //  step 1: check email exists or not
      const holderShop = await shopModel.findOne({ email }).lean();
      if (holderShop) {
        return {
          code: "xxx",
          message: "Shop already registered with this email",
        };
      }
      const salt = 10;
      const hashedPassword = await bcrypt.hash(password, salt);
      const newShop = await shopModel.create({
        name,
        email,
        hashedPassword,
        roles: [RoleShop.SHOP],
      });
      if (newShop) {
        // create private key & public key
        const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
          modulusLength: 4096,
        });
        console.log({ privateKey, publicKey }); // save collection KeyStore
        const publicKeyString = await KeyTokenService.createKeyToken({
          userId: newShop._id,
          publicKey: publicKey,
        });
        if (!publicKeyString) {
          return {
            code: "xxx",
            message: "Error in creating public key",
          };
        }
      }
    } catch (error) {
      return {
        code: "xxx",
        message: error.message,
        status: "error",
      };
    }
  };
}

export default new AccessService();
