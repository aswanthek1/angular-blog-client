import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { AuthorService } from "../../core/services/author-service/author.service";
import { loadAuthor, loadAuthorFailure, loadAuthorSuccess } from "./author.action";
import { catchError, exhaustMap, map, of } from "rxjs";
import { Author } from "../../shared/models/authorModel";

@Injectable({
    providedIn: 'root'
})
export class AuthorEffects {

    constructor(private actions$: Actions, private authorService: AuthorService) { }

    loadAuthor$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadAuthor),
            exhaustMap(() => this.authorService.authenticate().pipe(
                map((author: any) =>
                    loadAuthorSuccess({ data: author?.authorData })
                ),
                catchError((error) => of(loadAuthorFailure({ error: '[Author] Author Loading Error: ' + error })))
            ))
        )
    )
}