export default {
  setLocalStorage(key, array) {
    try {
      localStorage.setItem(key, JSON.stringify(array));
    } catch (err) {
      console.error('Set state error: ', err);
    }
  },

  getLocalStorage(key) {
    try {
      const lsData = localStorage.getItem(key);
      return lsData === null ? undefined : JSON.parse(lsData);
    } catch (err) {
      console.error('Get state error: ', err);
    }
  },
};