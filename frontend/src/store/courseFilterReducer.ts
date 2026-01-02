import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CourseFilterState {
  search: string;
  selectedTags: string[];
}

const initialState: CourseFilterState = {
  search: "",
  selectedTags: [],
};

const courseFilterSlice = createSlice({
  name: "courseFilter",
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    toggleTag(state, action: PayloadAction<string>) {
      const tag = action.payload;
      if (state.selectedTags.includes(tag)) {
        state.selectedTags = state.selectedTags.filter((t) => t !== tag);
      } else {
        state.selectedTags.push(tag);
      }
    },
    resetFilters(state) {
      state.search = "";
      state.selectedTags = [];
    },
  },
});

export const { setSearch, toggleTag, resetFilters } = courseFilterSlice.actions;
export default courseFilterSlice.reducer;
