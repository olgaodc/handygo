const set = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
}

const get = (key, defaultData = null) => {
  return JSON.parse(localStorage.getItem(key) ) ?? defaultData;
}

export const LocalStorageService = {
  set,
  get,
};
