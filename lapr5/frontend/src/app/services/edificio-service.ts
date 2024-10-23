import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message-service';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { EdificioDTO } from '../DTO/edificio-dto';

@Injectable({
  providedIn: 'root'
})
export class EdificioService {

  public edificioUrl = 'http://localhost:4000/api/edificio';

  httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
      private http: HttpClient,
      private messageService: MessageService) { }

      
  getCaminhoEd(id1: string, id2: string): Observable<string> {
    const edificoUrlAlgav= `http://localhost:4300/caminho_edificios_req?origem=${id1}&destino=${id2}`;
    console.log(edificoUrlAlgav);
    return this.http.get<string>(edificoUrlAlgav)
    .pipe(
        tap(_ => this.log('fetched edificio')),
        catchError(this.handleError<string>('getEdificios'))
    )
  }
  
  getEdificios(): Observable<EdificioDTO[]> {
    const url =  `${this.edificioUrl}/listall`;

    return this.http.get<EdificioDTO[]>(url)
    .pipe(
        tap(_ => this.log('fetched edificio')),
        catchError(this.handleError<EdificioDTO[]>('getEdificios', []))
    )
  }

  getEdificiosMinMax(min: number, max: number): Observable<EdificioDTO[]> {
    const url =  `${this.edificioUrl}/${min}/${max}`;

    return this.http.get<EdificioDTO[]>(url)
    .pipe(
        tap(_ => this.log('fetched edificio')),
        catchError(this.handleError<EdificioDTO[]>('getEdificios', []))
    )
  }

  createEdificio(codigo: string, nome: string, descricao: string, pisoMaxSize: string): Observable<EdificioDTO> {
    const url =  `${this.edificioUrl}/create`;
    const body = {
      codigo: codigo,
      nome: nome,
      descricao: descricao,
      pisoMaxSize: pisoMaxSize
    };
  
    return this.http.post<EdificioDTO>(url, body, this.httpOptions).pipe(
      tap((createEdificioDTO: EdificioDTO) => this.log(`created edificio with codigo=${createEdificioDTO.codigo}`)),
      catchError(this.handleError<EdificioDTO>('createEdificio'))
    );
  }

  updateEdificio(codigo: string, nome: string, descricao: string, pisoMaxSize: string): Observable<EdificioDTO> {
    const url =  `${this.edificioUrl}/edit`;
    const body = {
      codigo: codigo,
      nome: nome,
      descricao: descricao,
      pisoMaxSize: pisoMaxSize
    };

      return this.http.put<EdificioDTO>(url, body, this.httpOptions).pipe(
        tap((updatedEdificioDTO: EdificioDTO) => this.log(`edificio updated with codigo=${updatedEdificioDTO.codigo}`)),
        catchError(this.handleError<EdificioDTO>('updateEdificio'))
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

  /** Log a EdificioService message with the MessageService */
  private log(message: string) {
      this.messageService.add(`EdificioService: ${message}`);
  }
}
