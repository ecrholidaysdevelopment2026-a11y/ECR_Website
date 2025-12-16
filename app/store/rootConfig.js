<<<<<<< HEAD
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
=======
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
>>>>>>> 3117bdd47e565d954c51a6a685d0a22fad1fb592
