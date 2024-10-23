import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message-service';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { TarefaDTO } from '../DTO/tarefa-dto';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  public tarefaUrl = 'http://localhost:4000/api/tarefa';

  httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
      private http: HttpClient,
      private messageService: MessageService) { }
  
  getTarefas(): Observable<TarefaDTO[]> {
    const url =  `${this.tarefaUrl}/listall`;

    return this.http.get<TarefaDTO[]>(url)
    .pipe(
        tap(_ => this.log('fetched tarefa')),
        catchError(this.handleError<TarefaDTO[]>('getTarefas', []))
    )
  }

  getTarefasAindaNaoAprovadas(): Observable<TarefaDTO[]> {
    const url =  `${this.tarefaUrl}/listallNaoAprovada`;

    return this.http.get<TarefaDTO[]>(url)
    .pipe(
        tap(_ => this.log('fetched tarefa')),
        catchError(this.handleError<TarefaDTO[]>('getTarefas', []))
    )
  }

  createTarefa(codigo: string, descricao: string, robot: string, tipoDeRobot: string, estado: string, contactoRequisitante: string, tipoDeTarefa: string,
    contactoIncidente: string, edificio: string, pisos: Array<{ piso: string }>,
    salaRecolha: string, salaEntrega: string, contactoRecolha: string, contactoEntrega: string): Observable<TarefaDTO> {
    const url =  `${this.tarefaUrl}/create`;
    let body: any;

    if(tipoDeTarefa === "vigilancia")
    body = {
        codigo: codigo,
        descricao: descricao,
        robot: robot,
        tipoDeRobot: tipoDeRobot,
        estado: estado,
        contactoRequisitante: contactoRequisitante,
        tipoDeTarefa: tipoDeTarefa,

        // No caso de se tratar de uma tarefa do tipo: vigilancia
        contactoIncidente: contactoIncidente,
        edificio: edificio,
        pisos: pisos
    };
    else {
      body = {
        codigo: codigo,
        descricao: descricao,
        robot: robot,
        tipoDeRobot: tipoDeRobot,
        estado: estado,
        contactoRequisitante: contactoRequisitante,
        tipoDeTarefa: tipoDeTarefa,

        // No caso de se tratar de uma tarefa do tipo: entrega de objetos
        salaRecolha: salaRecolha,
        salaEntrega: salaEntrega,
        contactoRecolha: contactoRecolha,
        contactoEntrega: contactoEntrega
    };
    }

    return this.http.post<TarefaDTO>(url, body, this.httpOptions).pipe(
      tap((createTarefaDTO: TarefaDTO) => this.log(`created tarefa with codigo=${createTarefaDTO.codigo}`)),
      catchError(this.handleError<TarefaDTO>('createTarefa'))
    );
  }

  updateEstadoDaTarefa(codigo: string, novoEstado: string): Observable<TarefaDTO> {
    const url =  `${this.tarefaUrl}/updateEstadoDaTarefa`;
    const body = {
        codigo: codigo,
        estado: novoEstado
    };

    return this.http.patch<TarefaDTO>(url, body, this.httpOptions).pipe(
        tap((updatedTarefaDTO: TarefaDTO) => this.log(`tarefa updated with codigo=${updatedTarefaDTO.codigo}`)),
        catchError(this.handleError<TarefaDTO>('updateTarefa')));
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

  /** Log a TarefaService message with the MessageService */
  private log(message: string) {
      this.messageService.add(`TarefaService: ${message}`);
  }
}
