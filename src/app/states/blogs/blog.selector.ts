import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";

export const SelectBlogState = (state:AppState) => state.blogs

export const selectBlogs = createSelector(
    SelectBlogState,
    (state) => state
)