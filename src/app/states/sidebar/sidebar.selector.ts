import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";

export const SelectSidebarState = (state: AppState) => state.sidebar

export const selectSidebar = createSelector(
    SelectSidebarState,
    (state) => state
)