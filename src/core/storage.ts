import API from "./api";

export async function stdSetStorage(key: string, data: any) {
  await handleStorageIndex(key);
  console.log("[StdSetStorage] " + key);
  await API.setStorage({ key, data });
}

export async function stdGetStorage<T>(key: string) {
  console.log("[StdGetStorage] " + key);
  return API.getStorage<T>({ key });
}

const STORAGE_INDEX_NAME = "__STD_INDEX__";
async function handleStorageIndex(key: string) {
  let storageIndex: string[];
  try {
    storageIndex = await API.getStorage<string[]>({ key: STORAGE_INDEX_NAME });
  } catch (e) {
    storageIndex = [];
  }
  if (!storageIndex.includes(key)) {
    storageIndex.push(key);
    await API.setStorage({
      key: STORAGE_INDEX_NAME,
      data: storageIndex
    });
  }
}

export async function printAllStorage() {
  const storageIndex = await API.getStorage<string[]>({ key: STORAGE_INDEX_NAME }) || [];
  console.log(storageIndex);
  for (const it of storageIndex) {
    console.log(`[${it}]`);
    console.log(await API.getStorage({ key: it }));
  }
}

export async function clearAllStorage() {
  await API.clearStorage();
  console.log("CLEAR ALL DONE");
}
