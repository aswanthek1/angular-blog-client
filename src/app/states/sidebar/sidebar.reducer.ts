import { createReducer, on } from "@ngrx/store"
import { toggleSideBar } from "./sidebar.action"

export interface SidebarState {
    isOpen:boolean
    classes:string
}

const initalState = 'sidebarSection min-h-[calc(100vh-80px)] h-full px-2 py-4 bg-slate-300 fixed left-0 top-0 z-10 shadow-2xl '

export const initialSidebarState: SidebarState = {
    isOpen:false,
    classes: initalState
}


// now create reducers

export const SidebarReducer = createReducer(
    initialSidebarState,
    on(toggleSideBar, (state) => ({
        ...state,
        classes: state.isOpen ? initalState+'closed' : initalState+'open',
        isOpen: !state.isOpen
    }))
)