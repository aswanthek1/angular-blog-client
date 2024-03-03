import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";


export const SelectAuthorState = (state: AppState) => state.author

export const selectAuthor = createSelector(
    SelectAuthorState,
    (state) => state
)