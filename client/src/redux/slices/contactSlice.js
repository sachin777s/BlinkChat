import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contacts: [],
  isLoading: false,
  error: false,
};

export const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    contactFetchingStart: (state) => {
      state.isLoading = true;
    },
    contactFetched: (state, action) => {
      state.isLoading = false;
      state.contacts = action.payload;
    },
    contactFetchingFail: (state) => {
      state.error = true;
    },
    addContact: (state, action) => {
      state.contacts.push(action.payload);
    },
    removeContact: (state) => {
      state.contacts.shift();
    },
    selectToChat: (state, action) => {
      const index = state.contacts.findIndex(
        (item) => item['_id'] === action.payload
      );
      const contact = state.contacts[index];
      state.contacts.splice(index, 1);
      state.contacts.unshift(contact);
    },
  },
});

export const {
  contactFetched,
  contactFetchingStart,
  contactFetchingFail,
  addContact,
  removeContact,
  selectToChat,
} = contactSlice.actions;

export default contactSlice.reducer;
