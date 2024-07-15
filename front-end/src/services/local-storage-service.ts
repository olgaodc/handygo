const set = (key: string, data: any): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

const get = <T>(key: string, defaultData: T | null = null): T | null => {
  const storedData = localStorage.getItem(key);
  if (storedData) {
    try {
      return JSON.parse(storedData) as T;
    } catch {
      return defaultData;
    }
  }
  return defaultData;
};

const LocalStorageService = {
  set,
  get,
};

export default LocalStorageService;
