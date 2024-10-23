import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message-service';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { TipoDeRobotDTO } from '../DTO/tipo-de-robot-dto';

@Injectable({
  providedIn: 'root'
})
export class TipoDeRobotService {

    public tipoDeRobotUrl = 'http://localhost:4000/api/tipoDeRobot';;

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(
        private http: HttpClient,
        private messageService: MessageService) { }

    getTipoDeRobots(): Observable<TipoDeRobotDTO[]> {
        const url =  `${this.tipoDeRobotUrl}/listall`;
        return this.http.get<TipoDeRobotDTO[]>(this.tipoDeRobotUrl)
        .pipe(
            tap(_ => this.log('fetched tipoDeRobot')),
            catchError(this.handleError<TipoDeRobotDTO[]>('getTipoDeRobots', []))
        )
    }

    createTipoDeRobot(descricao: string, tarefas: Array<{ tarefa: string }>): Observable<TipoDeRobotDTO> {
        const url =  `${this.tipoDeRobotUrl}/create`;
        const body = {
            descricao: descricao,
            tarefas: tarefas
        };

        return this.http.post<TipoDeRobotDTO>(url, body, this.httpOptions).pipe(
            tap((newTipoDeRobotDTO: TipoDeRobotDTO) => this.log(`created tipoDeRobot with id=${newTipoDeRobotDTO.id}`)),
            catchError(this.handleError<TipoDeRobotDTO>('createTipoDeRobot'))
        );
    }

    updateTipoDeRobot(id: string, descricao: string, tarefas: Array<{ tarefa: string }>): Observable<TipoDeRobotDTO> {
        const url =  `${this.tipoDeRobotUrl}/edit`;
        const body = {
            id: id,
            descricao: descricao,
            tarefas: tarefas
        };

        return this.http.put<TipoDeRobotDTO>(url, body, this.httpOptions).pipe(
          tap((updatedTipoDeRobotDTO: TipoDeRobotDTO) => this.log(`tipoDeRobot updated with id=${updatedTipoDeRobotDTO.id}`)),
          catchError(this.handleError<TipoDeRobotDTO>('updateTipoDeRobot'))
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

    /** Log a TipoDeRobotService message with the MessageService */
    private log(message: string) {
        this.messageService.add(`TipoDeRobotService: ${message}`);
    }
}
