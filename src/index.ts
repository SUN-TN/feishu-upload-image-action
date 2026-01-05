import * as core from "@actions/core";
import { FeishuClient } from "./client";
import { base64ToBuffer } from "./base64ToBuffer";

async function run() {
  try {
    const appId = core.getInput("app_id", { required: true });
    const appSecret = core.getInput("app_secret", { required: true });
    const imgBase64 = core.getInput("img_base64", { required: true });

    const file = base64ToBuffer(imgBase64);

    const feishu = new FeishuClient(appId, appSecret);
    const result = await feishu.uploadImage(file);

    core.info(`Feishu upload image success: ${result}`);
    core.setOutput("img_key", result);
  } catch (error: any) {
    core.setFailed(`Feishu upload image  failed: ${error.message}`);
  }
}

run();
