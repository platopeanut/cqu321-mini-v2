import stdUser from "@/core/StdUser";
import stdToken from "@/core/StdToken";

export async function stdSetStorage(key: string, data: any) {
  console.log("[StdSetStorage] " + key);
  await uni.setStorage({ key, data });
}

export async function stdGetStorage<T>(key: string) {
  console.log("[StdGetStorage] " + key);
  try {
    const res = await uni.getStorage({ key });
    return res.data as T;
  } catch (e) {
    console.error("[StdGetStorage] key: " + key + " is not found!");
    // 当键不存在时抛出异常
    throw e;
  }
}

export async function stdPrintStorageInfo() {
  console.log("[StorageInfo]", await uni.getStorageInfo());
}

export async function stdClearAllStorage() {
  console.log("[ClearAllStorage]");
  await uni.clearStorage();
  // 清空内存中的数据
  await stdUser.getUserInfo();
  await stdToken.getRefreshTokenInfo();
}
