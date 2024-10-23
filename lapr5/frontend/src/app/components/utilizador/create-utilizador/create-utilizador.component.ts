import { Component } from '@angular/core';
import { Utilizador } from "../../../models/utilizador";
import { UtilizadorService } from "../../../services/utilizador-service";
import { Location } from "@angular/common";
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-utilizador',
  templateUrl: './create-utilizador.component.html',
  styleUrls: ['./create-utilizador.component.css']
})
export class CreateUtilizadorComponent {

  utilizadores: Utilizador[] = [];
  selectedCargo: string = '';

  formResetToggle: boolean = false;

  constructor(private utilizadorService: UtilizadorService,private location: Location) { }

  createUtilizador(firstName: string, lastName: string, email: string, password: string, role: string, phone: string, utilizadorForm: NgForm) {
    const randomString = this.generateRandomString(9);
  
    this.utilizadorService.createUtilizador(firstName, lastName, email, password, role, phone, randomString, "aprovado").subscribe({
  next: (result) => {
    if (result.userDTO) {
      this.utilizadores.push(result.userDTO);
      alert("Utilizador criado com sucesso");
      utilizadorForm.resetForm();
    } else {
      alert(result.errorMessage);
      console.error(result.errorMessage);
    }
  },
  error: (error) => {
    console.error('Erro ao criar utilizador:', error);
  }
});
  }

  generateRandomString(length: number): string {
    const numeroInicial = Math.random() < 0.5 ? "19" : "2";
    const restanteLength = length - numeroInicial.length;
    const restante = Math.floor(Math.random() * Math.pow(10, restanteLength)).toString().padStart(restanteLength, '0');
    return numeroInicial + restante;
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
