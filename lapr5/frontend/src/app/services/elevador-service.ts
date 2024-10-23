import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message-service';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ElevadorDTO } from '../DTO/elevador-dto';

@Injectable({
  providedIn: 'root'
})
export class ElevadorService {

    public elevadorUrl = 'http://localhost:4000/api/elevador';

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(
        private http: HttpClient,
        private messageService: MessageService) { }

    getElevadores(id: string): Observable<ElevadorDTO[]> {
        const url =  `${this.elevadorUrl}/${id}`;

        return this.http.get<ElevadorDTO[]>(url)
        .pipe(
            tap(_ => this.log('fetched elevador')),
            catchError(this.handleError<ElevadorDTO[]>('getElevadores', []))
        )
    }

    createElevador(codigo: string, edificio: string, pisos: Array<{ piso: string }>): Observable<ElevadorDTO> {
        const url =  `${this.elevadorUrl}/create`;
        const body = {
            codigo: codigo,
            edificio: edificio,
            pisos: pisos
        }
        return this.http.post<ElevadorDTO>(url, body, this.httpOptions).pipe(
            tap((createElevadorDTO: ElevadorDTO) => this.log(`created elevador with codigo=${createElevadorDTO.codigo}`)),
            catchError(this.handleError<ElevadorDTO>('createElevador'))
        );
    }

    updateElevador(codigo: string, edificio: string, pisos: Array<{ piso: string }>): Observable<ElevadorDTO> {
        const url =  `${this.elevadorUrl}/edit`;
        const body = {
            codigo: codigo,
            edificio: edificio,
            pisos: pisos
        }
        return this.http.put<ElevadorDTO>(url, body, this.httpOptions).pipe(
          tap((updatedElevadorDTO: ElevadorDTO) => this.log(`elevador updated with codigo=${updatedElevadorDTO.codigo}`)),
          catchError(this.handleError<ElevadorDTO>('updateElevador'))
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

    /** Log a ElevadorService message with the MessageService */
    private log(message: string) {
        this.messageService.add(`ElevadorService: ${message}`);
    }
}
