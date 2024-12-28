// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import namesReducer from './nameSlice';
import rowsReducer from './detailSlice';

const store = configureStore({
  reducer: {
    names: namesReducer,
    rows: rowsReducer
  }
});

export default store;
