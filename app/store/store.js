<<<<<<< HEAD
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { persistConfig } from "./rootConfig";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  REGISTER,
  PERSIST,
  PURGE,
  PAUSE,
} from "redux-persist";
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
=======
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { persistConfig } from "./rootConfig";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  REGISTER,
  PERSIST,
  PURGE,
  PAUSE,
} from "redux-persist";
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
>>>>>>> 3117bdd47e565d954c51a6a685d0a22fad1fb592
