import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UtilizadorService } from "../../services/utilizador-service";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  errorMessage: string = '';

  constructor(private router: Router, private utilizadorService: UtilizadorService) {}

  loginUser(email: string, password: string) {
    this.utilizadorService.loginUser(email, password).subscribe(response => {
      if (response.errorMessage) {
        alert(response.errorMessage);
        this.errorMessage = response.errorMessage;
      } else {
        this.router.navigate(['/home']);
      }
    });
  }

  togglePasswordVisibility(event: any): void {
    const passwordInput = document.getElementById('utilizador-pass') as HTMLInputElement;

    if (event.target.checked) {
      passwordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
    }
  }
}