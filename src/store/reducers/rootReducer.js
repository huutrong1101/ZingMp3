import appReducer from "./appReducer";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import musicReducer from "./musicReducer";

// combineReducers: gôm tất cả Reducer lại thành 1
// applyMiddleware: sử dụng middleware cho redux

const commonConfig = {
  storage: storage,
  stateReconciler: autoMergeLevel2,
};

const musicConfig = {
  ...commonConfig,
  key: "music", // tên muốn lưu dưới local
  whitelist: ["curSongId", "curSongData", "curAlbumId", "recentSongs"], // những cái muốn lưu dưới local
};

const rootReducer = combineReducers({
  app: appReducer,
  music: persistReducer(musicConfig, musicReducer),
});

export default rootReducer;
