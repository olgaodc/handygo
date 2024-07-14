const set = (key: string, data: any) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const get = (key: string, defaultData = null) => JSON.parse(localStorage.getItem(key))
?? defaultData;

const LocalStorageService = {
  set,
  get,
};

export default LocalStorageService;
