import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ClickedState {
  selectedNews: object;
  id: string;
  title: string;
  content: string;
}

const initialState = {
  selectedNews: {
    id: "",
    title: "",
    content: "",
  },
} as ClickedState;

type TPayload = {
  selectedNews: { id: string; title: string; content: string };
};

const clickedSlice = createSlice({
  name: "onClickSectionTitle",
  initialState: initialState,
  reducers: {
    changeValue: (state, { payload }: PayloadAction<TPayload>) => {
      state.selectedNews = payload.selectedNews;
    },
  },
});

export const { changeValue } = clickedSlice.actions;

export const clickedReducer = clickedSlice.reducer;
