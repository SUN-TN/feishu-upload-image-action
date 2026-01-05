/**
 * Base64 转 Buffer（兼容 ArrayBufferLike）
 * @param {string} base64Str - 图片 Base64 字符串（可选带 data:image/jpeg;base64, 前缀）
 * @returns {Buffer} 转换后的 Buffer（可直接作为 ArrayBufferLike 使用）
 */
export function base64ToBuffer(base64Str: string) {
  // 步骤1：移除 Base64 前缀（如 data:image/jpeg;base64,）
  const base64Data = base64Str.replace(/^data:image\/\w+;base64,/, "");

  // 步骤2：解码 Base64 为 Buffer（Node.js 内置 Buffer.from 支持 Base64 解码）
  const buffer = Buffer.from(base64Data, "base64");

  // 验证：Buffer 兼容 ArrayBufferLike
  //   console.log("Buffer 是否为 ArrayBufferLike:", buffer instanceof Uint8Array); // true
  //   console.log("ArrayBuffer:", buffer.buffer); // 原生 ArrayBuffer（ArrayBufferLike 核心）

  return buffer;
}
