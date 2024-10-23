import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message-service';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { RobotDTO } from '../DTO/robot-dto';

@Injectable({
  providedIn: 'root'
})
export class RobotService {

    public robotUrl = 'http://localhost:4000/api/robot';;

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(
        private http: HttpClient,
        private messageService: MessageService) { }

    getRobot(numeroSerie: string): Observable<RobotDTO> {
        const url =  `${this.robotUrl}/${numeroSerie}`;
        return this.http.get<RobotDTO>(url)
        .pipe(
            tap(_ => this.log('fetched robot')),
            catchError(this.handleError<RobotDTO>('getRobots'))
        )
    }

    getRobots(): Observable<RobotDTO[]> {
        const url =  `${this.robotUrl}/listall`;
        return this.http.get<RobotDTO[]>(url)
        .pipe(
            tap(_ => this.log('fetched robot')),
            catchError(this.handleError<RobotDTO[]>('getRobots', []))
        )
    }

    createRobot(numeroSerie: string, codigo: string, nickname: string, marca: string, estado: string, tipoDeRobot: string): Observable<RobotDTO> {
        const url =  `${this.robotUrl}/create`;
        const body = {
            numeroSerie: numeroSerie,
            codigo: codigo,
            nickname: nickname,
            marca: marca,
            estado: estado,
            tipoDeRobot: tipoDeRobot
        };

        return this.http.post<RobotDTO>(url, body, this.httpOptions).pipe(
            tap((createRobotDTO: RobotDTO) => this.log(`created robot with numeroSerie=${createRobotDTO.numeroSerie}`)),
            catchError(this.handleError<RobotDTO>('createRobot'))
        );
    }

    updateRobot(numeroSerie: string, codigo: string, nickname: string, marca: string, estado: string, tipoDeRobot: string): Observable<RobotDTO> {
        const url =  `${this.robotUrl}/edit`;
        const body = {
            numeroSerie: numeroSerie,
            codigo: codigo,
            nickname: nickname,
            marca: marca,
            estado: estado,
            tipoDeRobot: tipoDeRobot
        };

        return this.http.put<RobotDTO>(url, body, this.httpOptions).pipe(
            tap((updatedRobotDTO: RobotDTO) => this.log(`robot updated with numeroSerie=${updatedRobotDTO.numeroSerie}`)),
            catchError(this.handleError<RobotDTO>('updateRobot')));
    }

    inhibitRobot(numeroSerie: string): Observable<RobotDTO> {
        const url =  `${this.robotUrl}/inhibit`;
        const body = {
            numeroSerie: numeroSerie
        };

        return this.http.patch<RobotDTO>(url, body, this.httpOptions).pipe(
            tap((updatedRobotDTO: RobotDTO) => this.log(`robot inhibitted with numeroSerie=${updatedRobotDTO.numeroSerie}`)),
            catchError(this.handleError<RobotDTO>('updateRobot')));
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

    /** Log a RobotService message with the MessageService */
    private log(message: string) {
        this.messageService.add(`RobotService: ${message}`);
    }
}
