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
}

/**
 * @param {string} tempFilePath 临时文件路径
 * @return {string} 持久化文件路径
 */
export async function stdSaveFile(tempFilePath: string) {
  const fs = uni.getFileSystemManager();
  return new Promise<string>((resolve) => {
    fs.saveFile({
      tempFilePath: tempFilePath,
      success: result => { resolve(result.savedFilePath); },
      fail: err => { throw err.errMsg; }
    });
  });
}

/**
 * @param {string} url 文件路径
 * @return {string | null} 持久化文件路径
 */
export async function downloadAndSaveFile(url: string) {
  try {
    const res = await uni.downloadFile({ url: url });
    if (res.statusCode === 200) return await stdSaveFile(res.tempFilePath);
    else {
      console.error(`[DownloadAndSaveFile] [${res.statusCode}] ${res.errMsg}`);
      return null;
    }
  } catch (e) {
    console.error('[DownloadAndSaveFile]', e);
    return null;
  }
}
