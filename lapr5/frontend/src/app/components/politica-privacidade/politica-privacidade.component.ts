import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from "@angular/common";
import { ActivatedRoute } from '@angular/router';
import { Utilizador } from "../../models/utilizador";
import { UtilizadorService } from "../../services/utilizador-service";

@Component({
  selector: 'app-politica-privacidade',
  templateUrl: './politica-privacidade.component.html',
  styleUrls: ['./politica-privacidade.component.css'],
})
export class PoliticaPrivacidadeComponent {
  consentCheckbox: boolean = false;

  utilizadores: Utilizador[] = [];

  email: string | null;

  constructor(private location: Location, private router: Router, private activatedRoute: ActivatedRoute, private utilizadorService: UtilizadorService) {
    this.email = this.activatedRoute.snapshot.paramMap.get('email');
   }

  proceed() {
    if (this.consentCheckbox) { 
      alert('A sua conta foi registada com sucesso e aguarda aprovação.');
      this.router.navigate(['/Login']);
    } else {
      alert('É necessário aceitar a Política de Privacidade para prosseguir.');
    }
  }

  cancel() {
    if(this.email!==null){
      this.utilizadorService.deleteUser(this.email).subscribe(utilizador => {
      this.router.navigate(['/Login']);
    });
    }
  }

  goBack(): void {
    this.location.back();
  }
}