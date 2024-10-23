import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message-service';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { PisoDTO } from '../DTO/piso-dto';

@Injectable({
  providedIn: 'root'
})
export class PisoService {

    public pisoUrl = 'http://localhost:4000/api/piso';;

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(
        private http: HttpClient,
        private messageService: MessageService) { }

    getAllPisosByEdificio(edificio: string): Observable<PisoDTO[]> {
        const url =  `${this.pisoUrl}/${edificio}`;

        return this.http.get<PisoDTO[]>(url)
        .pipe(
            tap(_ => this.log('fetched piso')),
            catchError(this.handleError<PisoDTO[]>('getPisos', []))
        )
    }

    createPiso(edificio: string, piso: string, descricao: string): Observable<PisoDTO> {
        const url = `${this.pisoUrl}/create`;
        const body = {
            edificio: edificio,
            piso: piso,
            descricao: descricao
        };
    
        return this.http.post<PisoDTO>(url, body, this.httpOptions).pipe(
            tap((newPisoDTO: PisoDTO) => this.log(`created piso with id=${newPisoDTO.id}`)),
            catchError(this.handleError<PisoDTO>('createPiso'))
        );
    }
    

    updatePiso(edificio: string, piso: string, descricao: string): Observable<PisoDTO> {
        const url =  `${this.pisoUrl}/edit`;
        const body = {
            edificio: edificio,
            piso: piso,
            descricao: descricao
        };

        return this.http.put<PisoDTO>(url, body, this.httpOptions).pipe(
          tap((updatedPisoDTO: PisoDTO) => this.log(`piso updated with id=${updatedPisoDTO.id}`)),
          catchError(this.handleError<PisoDTO>('updatePiso'))
        );
    }

    getPisosWithConnection(): Observable<PisoDTO[]> {
        const url =  `${this.pisoUrl}/listwithconnection`;

        return this.http.get<PisoDTO[]>(url)
        .pipe(
            tap(_ => this.log('fetched piso')),
            catchError(this.handleError<PisoDTO[]>('getPisos', []))
        )
    }

    loadValidateFloor(json: any): Observable<PisoDTO> {
        const url = `${this.pisoUrl}/mapapiso`;
      
        const requestBody = {
          edificio: json.edificio,
          piso: json.piso,
          descricao: json.descricao,
          passagens: json.passagens,
          salas: json.salas
        };
      
        return this.http.patch<PisoDTO>(url, requestBody, this.httpOptions).pipe(
          tap((newPisoDTO: PisoDTO) => this.log(`uploaded piso with id=${newPisoDTO.id}`)),
          catchError(this.handleError<PisoDTO>('uploadPiso'))
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

    /** Log a PisoService message with the MessageService */
    private log(message: string) {
        this.messageService.add(`PisoService: ${message}`);
    }
}
