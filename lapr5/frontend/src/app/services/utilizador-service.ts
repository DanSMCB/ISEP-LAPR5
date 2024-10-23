import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message-service';
import { Observable, of} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UtilizadorDTO } from '../DTO/utilizador-dto';
import { HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UtilizadorService {

  public utilizadorUrl = 'http://localhost:4000/api/utilizador';

  httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
      private http: HttpClient,
      private messageService: MessageService) { }
  
  verifyCurrentPassword(email: string, currentPassword: string): Observable<boolean> {
    const url = `${this.utilizadorUrl}/verifyCurrentPassword`;
    const body = {
      email: email,
      currentPassword: currentPassword
    };

    return this.http.post<boolean>(url, body, this.httpOptions).pipe(
      tap((isValid: boolean) => this.log(`Password verification result: ${isValid}`)),
      catchError(this.handleError<boolean>('verifyCurrentPassword'))
    );
  }

  getUtilizadores(): Observable<UtilizadorDTO[]> {
    const url =  `${this.utilizadorUrl}/listall`;

    return this.http.get<UtilizadorDTO[]>(url)
    .pipe(
        tap(_ => this.log('fetched utilizador')),
        catchError(this.handleError<UtilizadorDTO[]>('getUtilizadores', []))
    )
  }

  getUtilizadoresAindaNaoAprovados(): Observable<UtilizadorDTO[]> {
    const url =  `${this.utilizadorUrl}/listallNaoAprovado`;

    return this.http.get<UtilizadorDTO[]>(url)
    .pipe(
        tap(_ => this.log('fetched utilizador')),
        catchError(this.handleError<UtilizadorDTO[]>('getUtilizadores', []))
    )
  }

  createUtilizador(firstName: string, lastName: string, email: string, password: string, role: string, phone: string, taxpayer: string, state: string): Observable<{ userDTO: UtilizadorDTO | null; errorMessage?: string }> {
    const url = `${this.utilizadorUrl}/signup`;
    const body = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      role: role,
      phone: phone,
      taxpayer: taxpayer,
      state: state,
    };
  
    return this.http.post<UtilizadorDTO>(url, body, this.httpOptions).pipe(
      map((createUtilizadorDTO: UtilizadorDTO) => ({ userDTO: createUtilizadorDTO, errorMessage: undefined })),
      catchError((errorResponse: HttpErrorResponse) => {
        let errorMessage = 'Ocorreu um erro ao registar';
  
        if (errorResponse.error && errorResponse.error.message) {
          errorMessage = errorResponse.error.message;
        }
  
        return of({ userDTO: null, errorMessage });
      })
    );
  }

  updateUtilizador(firstName: string, lastName: string, email: string, password: string, phone: string, taxpayer: string): Observable<UtilizadorDTO> {
    const url =  `${this.utilizadorUrl}/updateUtilizador`;
    const body = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      phone: phone,
      taxpayer: taxpayer
  };

  return this.http.patch<UtilizadorDTO>(url, body, this.httpOptions).pipe(
      tap((updatedUtilizadorDTO: UtilizadorDTO) => this.log(`utilizador updated with email=${updatedUtilizadorDTO.email}`)),
      catchError(this.handleError<UtilizadorDTO>('updateUtilizador')));
}

updateUtilizadorState(email: string, newState: string): Observable<UtilizadorDTO> {
  const url =  `${this.utilizadorUrl}/updateUtilizadorState`;
  const body = {
      email: email,
      state: newState
  };

  return this.http.patch<UtilizadorDTO>(url, body, this.httpOptions).pipe(
      tap((updatedUtilizadorDTO: UtilizadorDTO) => this.log(`utilizador updated with email=${updatedUtilizadorDTO.email}`)),
      catchError(this.handleError<UtilizadorDTO>('updateUtilizador')));
}

loginUser(email: string, password: string): Observable<{ userDTO: UtilizadorDTO | null; token: string; errorMessage?: string }> {
  const url = `${this.utilizadorUrl}/signin`;
  const body = {
    email: email,
    password: password
  };

  return this.http.post<{ userDTO: UtilizadorDTO, token: string }>(url, body, this.httpOptions).pipe(
    tap((response: { userDTO: UtilizadorDTO, token: string }) => {
      console.log(`logged utilizador with email=${response.userDTO.email}`);
      localStorage.setItem('userData', JSON.stringify(response.userDTO));
    }),
    catchError((errorResponse: HttpErrorResponse) => {
      let errorMessage = 'Ocorreu um erro ao fazer login';

      if (errorResponse.error && errorResponse.error.message) {
        errorMessage = errorResponse.error.message;
      }

      return of({ userDTO: null, token: '', errorMessage });
    })
  );
}

deleteUser(email: string): Observable<{ success: boolean; message?: string }> {
  const url = `${this.utilizadorUrl}/delete`;

  return this.http.delete<{ success: boolean; message?: string }>(url, { ...this.httpOptions, body: { email } }).pipe(
    tap((response: { success: boolean; message?: string }) => {
      if (response.success) {
        console.log(`User deleted with email=${email}`);
      } else {
        console.error(`Failed to delete user with email=${email}: ${response.message}`);
      }
    }),
    catchError(this.handleError<{ success: boolean; message?: string }>('deleteUser'))
  );
}

getUserData(): UtilizadorDTO {
  const userDataString = localStorage.getItem('userData');
  return userDataString ? JSON.parse(userDataString) : null;
}

clearUserData(): void {
  localStorage.removeItem('userData');
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

  /** Log a UtilizadorService message with the MessageService */
  private log(message: string) {
      this.messageService.add(`UtilizadorService: ${message}`);
  }
}