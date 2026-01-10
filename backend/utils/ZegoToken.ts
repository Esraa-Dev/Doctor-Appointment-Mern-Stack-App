import crypto from 'crypto';

export function generateToken04(
  appId: number,
  userId: string,
  secret: string,
  effectiveTimeInSeconds: number,
  payload?: string
): string {
  if (!appId || typeof appId !== 'number' || appId <= 0) {
    throw new Error('appID invalid');
  }

  if (!userId || typeof userId !== 'string' || userId.length > 64) {
    throw new Error('userId invalid');
  }

  if (!secret || typeof secret !== 'string' || secret.length !== 32) {
    throw new Error('secret must be a 32 byte string');
  }

  if (!effectiveTimeInSeconds || effectiveTimeInSeconds <= 0) {
    throw new Error('effectiveTimeInSeconds invalid');
  }

  const createTime = Math.floor(Date.now() / 1000);
  const tokenInfo = {
    app_id: appId,
    user_id: userId,
    nonce: Math.floor(Math.random() * 2147483647),
    ctime: createTime,
    expire: createTime + effectiveTimeInSeconds,
    payload: payload || '',
  };

  const plainText = JSON.stringify(tokenInfo);
  const nonce = crypto.randomBytes(12);
  
  const cipher = crypto.createCipheriv('aes-256-gcm', secret, nonce);
  
  let encrypted = cipher.update(plainText, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag();
  
  const encryptBuf = Buffer.from(encrypted, 'hex');
  
  const versionFlag = '04';
  
  const b1 = Buffer.alloc(8);
  b1.writeBigInt64BE(BigInt(tokenInfo.expire));
  
  const b2 = Buffer.alloc(2);
  b2.writeUInt16BE(nonce.length);
  
  const b3 = Buffer.alloc(2);
  b3.writeUInt16BE(encryptBuf.length);
  
  const b4 = Buffer.alloc(1);
  b4.writeUInt8(1);
  
  const buf = Buffer.concat([
    b1,
    b2,
    nonce,
    b3,
    encryptBuf,
    authTag,
    b4
  ]);
  
  return versionFlag + buf.toString('base64');
}