import shopModel from "../models/shop.model.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import KeyTokenService from "./keytoken.service.js";
import { createTokenPair } from "../auth/authUtils.js";
import { type } from "os";
import { format } from "path";

const RoleShop = {
  SHOP: "SHOP",
  WRITER: "WRITER",
  EDITOR: "EDITOR",
  ADMIN: "ADMIN",
};
class AccessService {
  static signUp = async ({ name, email, password }) => {
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
        name: name,
        email: email,
        password: hashedPassword,
        roles: [RoleShop.SHOP],
      });
      if (newShop) {
        // create private key & public key
        const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
          modulusLength: 4096,
          publicKeyEncoding: {
            type: "pkcs1",
            format: "pem",
          },
          privateKeyEncoding: {
            type: "pkcs1",
            format: "pem",
          },
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

        const publicKeyObject = crypto.createPublicKey(publicKeyString);

        //create token pair
        const tokens = await createTokenPair(
          {
            userId: newShop._id,
            email,
          },
          publicKeyString,
          privateKey
        );
        console.log("Create Token Success::", tokens);
        return {
          code: 201,
          metadata: {
            shop: newShop,
            tokens,
          },
        };
      }
      return {
        code: 200,
        metadata: null,
      };
    } catch (error) {
      return {
        code: "xxx",
        message: error.message,
        status: "error",
      };
    }
  };
}

export default AccessService;
