import { createAction, props } from "@ngrx/store";
import { Author } from "../../shared/models/authorModel";

export const loadAuthor = createAction('[Author] Load Author');
export const loadAuthorSuccess = createAction('[Author] Load Author Success', props<{data: Author}>());
export const loadAuthorFailure = createAction('[Author] Load Author Failure', props<{error: any}>());
export const clearAuthorState = createAction('[Author] Clear Author State');