import { Client, withTenantToken } from "@larksuiteoapi/node-sdk";
import fs from "node:fs";

export class FeishuClient {
  private client: Client;
  appId: string = "";
  appSecret: string = "";

  constructor(appId: string, appSecret: string) {
    this.appId = appId;
    this.appSecret = appSecret;
    this.client = new Client({
      appId,
      appSecret,
      disableTokenCache: false,
    });
  }

  getToken = async () => {
    try {
      const res = await this.client.auth.v3.appAccessToken.internal(
        {
          data: {
            app_id: this.appId,
            app_secret: this.appSecret,
          },
        },
        withTenantToken("")
      );
      console.log("get Token res", res);
      if (res.code === 0) {
        return res.data as string;
      }
      throw Error("获取token出错");
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  uploadImage = async (file: Buffer<ArrayBufferLike> | fs.ReadStream) => {
    try {
      const token = await this.getToken();
      const res = await this.client.im.v1.image.create(
        {
          data: {
            image_type: "message",
            image: file,
          },
        },
        withTenantToken(token)
      );
      if (res?.image_key) {
        return res.image_key;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
}
