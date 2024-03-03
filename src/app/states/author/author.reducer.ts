import { createReducer, on } from "@ngrx/store";
import { Author } from "../../shared/models/authorModel";
import { clearAuthorState, loadAuthor, loadAuthorFailure, loadAuthorSuccess } from "./author.action";


export interface AuthorState {
    author: Author,
    loading: boolean,
    error: any,
    isLoggedIn: boolean
}

export const initialAuthorState: AuthorState = {
    author: {
        name: "",
        email: "",
        company_name: "",
        proffession: "",
        image: "",
        role: ""
    },
    loading: false,
    error: null,
    isLoggedIn: false
}

// now create reducer functions

export const AuthorReducer = createReducer(
    initialAuthorState,
    on(loadAuthor, state => ({
        ...state,
        loading: true,
        error: null
    })),
    on(loadAuthorSuccess, (state, { data }) => ({
        ...state,
        author: data,
        loading: false,
        error: null,
        isLoggedIn: true
    })),
    on(loadAuthorFailure, (state, { error }) => ({
        ...state,
        error: error,
        loading: false,
        isLoggedIn: false
    })),
    on(clearAuthorState, state => ({
        ...state,
        author: {
            name: "",
            email: "",
            company_name: "",
            proffession: "",
            image: "",
            role: ""
        },
        loading: false,
        error: null,
        isLoggedIn: false
    }))
)