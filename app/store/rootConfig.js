const noopStorage = {
  getItem(_key) {
    return Promise.resolve(null);
  },
  setItem(_key, value) {
    return Promise.resolve(value);
  },
  removeItem(_key) {
    return Promise.resolve();
  },
};

let storage;
if (typeof window !== "undefined") {
  storage = require("redux-persist/lib/storage").default;
}

export const persistConfig = {
  key: "root",
  storage: storage || noopStorage,
  whitelist: ["auth", "register"],
};
