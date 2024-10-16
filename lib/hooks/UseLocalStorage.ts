'use client'


const useLocalStorage = () => {
  const setInLocalStorage = (key: string, value: any) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(value));
    }
  };
  const getFromLocalStorage = (key: string) => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem(key) || "{}");
    }
    return {};
  };
  const removeFromLocalStorage = (key: string) => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(key);
    }
  };
  return { setInLocalStorage, getFromLocalStorage, removeFromLocalStorage };
};

export default useLocalStorage;
