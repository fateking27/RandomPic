import { AES, lib, mode, pad, enc } from 'crypto-js'
export class Crypto {
  //加密
  static encrypt(plaintext: string, key: lib.WordArray, iv: lib.WordArray): string {
    const encrypted = AES.encrypt(plaintext, key, {
      iv: iv,
      mode: mode.CBC,
      padding: pad.Pkcs7
    }).toString()
    return encrypted
  }
  //解密
  static decrypt(ciphertext: string, key: lib.WordArray, iv: lib.WordArray): string {
    const decrypted = AES.decrypt(ciphertext, key, {
      iv: iv,
      mode: mode.CBC,
      padding: pad.Pkcs7
    }).toString(enc.Utf8)
    return JSON.parse(decrypted) as string
  }
}
