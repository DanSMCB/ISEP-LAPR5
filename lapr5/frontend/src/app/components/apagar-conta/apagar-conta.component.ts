import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from "@angular/common";
import { UtilizadorService } from "../../services/utilizador-service";

@Component({
  selector: 'app-apagar-conta',
  templateUrl: './apagar-conta.component.html',
  styleUrls: ['./apagar-conta.component.css'],
})
export class ApagarContaComponent {
  consentCheckbox: boolean = false;

  constructor(private utilizadorService: UtilizadorService, private location: Location, private router: Router) { }

  ngOnInit() {
    const resposta = window.confirm("Deseja realmente apagar a conta?");

    if (resposta) {
      alert("Conta apagada com sucesso.");

      this.utilizadorService.deleteUser(this.utilizadorService.getUserData().email.toString()).subscribe(
        (response) => {
          console.log(response);

          this.utilizadorService.clearUserData();
          this.router.navigate(['/Login']);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      this.goBack();
    }
  }

  goBack(): void {
    this.location.back();
  }
}