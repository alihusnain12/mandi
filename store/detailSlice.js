// features/rowsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('rows');
    return serializedState ? JSON.parse(serializedState) : {};
  } catch (err) {
    console.error("Could not load state", err);
    return {};
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('rows', serializedState);
  } catch (err) {
    console.error("Could not save state", err);
  }
};

const rowsSlice = createSlice({
  name: 'rows',
  initialState: loadState(),
  reducers: {
    addRow: (state, action) => {
      const { name, row } = action.payload;
      const updatedState = { ...state, [name]: [...(state[name] || []), row] };
      saveState(updatedState);
      return updatedState;
    },
    setRows: (state, action) => {
      const { name, rows } = action.payload;
      const updatedState = { ...state, [name]: rows };
      saveState(updatedState);
      return updatedState;
    }
  }
});

export const { addRow, setRows } = rowsSlice.actions;
export default rowsSlice.reducer;
