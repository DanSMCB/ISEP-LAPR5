import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message-service';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { PassagemDTO } from '../DTO/passagem-dto';

@Injectable({
  providedIn: 'root'
})
export class PassagemService {

    public passagemUrl = 'http://localhost:4000/api/passagem';

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(
        private http: HttpClient,
        private messageService: MessageService) { }

    listPassagemBetweenEdificios(edificio1: string, edificio2: string): Observable<PassagemDTO[]> {
        const url =  `${this.passagemUrl}/listbetweenEdificio/${edificio1}/${edificio2}`;
        return this.http.get<PassagemDTO[]>(url)
        .pipe(
            tap(_ => this.log('fetched passagem')),
            catchError(this.handleError<PassagemDTO[]>('getPassagens', []))
        )
    }

    createPassagem(id: string, connection: Array<{ edificio: string; piso: string }>): Observable<PassagemDTO> {
        const url =  `${this.passagemUrl}/create`;
        const body = {
            passagemId: id,
            connection: connection
        };
    
        return this.http.post<PassagemDTO>(url, body, this.httpOptions).pipe(
            tap((newPassagemDTO: PassagemDTO) => this.log(`created passagem with id=${newPassagemDTO.passagemId}`)),
            catchError(this.handleError<PassagemDTO>('createPassagem'))
        );
    }

    updatePassagem(id: string, connection: Array<{ edificio: string; piso: string }>): Observable<PassagemDTO> {
        const url =  `${this.passagemUrl}/edit`;
        const body = {
            passagemId: id,
            connection: connection
        };
    
        return this.http.put<PassagemDTO>(url, body, this.httpOptions).pipe(
            tap((updatedPassagemDTO: PassagemDTO) => this.log(`updated passagem with id=${updatedPassagemDTO.passagemId}`)),
            catchError(this.handleError<PassagemDTO>('updatePassagem'))
        );
    }


    /**
    * Handle Http operation that failed.
    * Let the app continue.
    *
    * @param operation - name of the operation that failed
    * @param result - optional value to return as the observable result
    */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

        console.error(error); // log to console instead

        this.log(`${operation} failed: ${error.message}`);

        // Let the app keep running by returning an empty result.
        return of(result as T);
        };
    }

    /** Log a PassagemService message with the MessageService */
    private log(message: string) {
        this.messageService.add(`PassagemService: ${message}`);
    }
}
