import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Utilizador } from "../../models/utilizador";
import { UtilizadorService } from "../../services/utilizador-service";
import { Location } from "@angular/common";

@Component({
  selector: 'app-recolha',
  templateUrl: './recolha-dados.component.html',
  styleUrls: ['./recolha-dados.component.css'],
})
export class RecolhaComponent {

  utilizadores: Utilizador[] = [];

  constructor(private utilizadorService: UtilizadorService,private location: Location, private router: Router) { }

  createUtilizadorUtente(firstName: string, lastName: string, email: string, password: string, phone: string, taxpayer: string) {
    this.utilizadorService.createUtilizador(firstName, lastName, email, password, "utente", phone, taxpayer, "pendente")
      .subscribe(response => {
        if(response.errorMessage){
          alert(response.errorMessage);
        } else{
          this.router.navigate(['/PoliticaPrivacidade', { email }]);
        }

      });
  }

  togglePasswordVisibility(event: any): void {
    const passwordInput = document.getElementById('new-utilizador-pass') as HTMLInputElement;

    if (event.target.checked) {
      passwordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
    }
  }

  goBack(): void {
    this.location.back();
  }
}