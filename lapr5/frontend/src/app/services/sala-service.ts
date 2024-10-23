import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message-service';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { SalaDTO } from '../DTO/sala-dto';

@Injectable({
  providedIn: 'root'
})
export class SalaService {

    public salaUrl = 'http://localhost:4000/api/sala';;

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(
        private http: HttpClient,
        private messageService: MessageService) { }

    getSalas(): Observable<SalaDTO[]> {
        const url =  `${this.salaUrl}/listall`;

        return this.http.get<SalaDTO[]>(url)
        .pipe(
            tap(_ => this.log('fetched sala')),
            catchError(this.handleError<SalaDTO[]>('getSalas', []))
        )
    }

    createSala(nome: string, descricao: string, categoria: string, tamanho: string, edificio: string, piso: string): Observable<SalaDTO> {
        const url =  `${this.salaUrl}/create`;
        const body = {
            nome: nome,
            descricao: descricao,
            categoria: categoria,
            tamanho: tamanho,
            edificio: edificio,
            piso: piso
        };

        return this.http.post<SalaDTO>(url, body, this.httpOptions).pipe(
            tap((newSalaDTO: SalaDTO) => this.log(`created sala with id=${newSalaDTO.id}`)),
            catchError(this.handleError<SalaDTO>('createSala'))
        );
    }

    updateSala(id: string, nome: string, descricao: string, categoria: string, tamanho: string, edificio: string, piso: string): Observable<SalaDTO> {
        const url =  `${this.salaUrl}/edit`;
        const body = {
            id: id,
            nome: nome,
            descricao: descricao,
            categoria: categoria,
            tamanho: tamanho,
            edificio: edificio,
            piso: piso
        };

        return this.http.put<SalaDTO>(url, body, this.httpOptions).pipe(
          tap((updatedSalaDTO: SalaDTO) => this.log(`sala updated with id=${updatedSalaDTO.id}`)),
          catchError(this.handleError<SalaDTO>('updateSala'))
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

    /** Log a SalaService message with the MessageService */
    private log(message: string) {
        this.messageService.add(`SalaService: ${message}`);
    }
}
