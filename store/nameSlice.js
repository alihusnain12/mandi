// features/namesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('names');
    return serializedState ? JSON.parse(serializedState) : [];
  } catch (err) {
    console.error("Could not load state", err);
    return [];
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('names', serializedState);
  } catch (err) {
    console.error("Could not save state", err);
  }
};

const namesSlice = createSlice({
  name: 'names',
  initialState: {
    list: loadState(),
    selectedName: null
  },
  reducers: {
    addName: (state, action) => {
      state.list.push(action.payload);
      saveState(state.list);
    },
    removeName: (state, action) => {
      state.list = state.list.filter(name => name !== action.payload);
      saveState(state.list);
    },
    setNames: (state, action) => {
      state.list = action.payload;
    },
    setSelectedName: (state, action) => {
      state.selectedName = action.payload;
    }
  }
});

export const { addName, removeName, setNames, setSelectedName } = namesSlice.actions;
export default namesSlice.reducer;
