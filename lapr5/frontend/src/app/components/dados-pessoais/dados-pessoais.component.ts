import { Component, OnInit } from '@angular/core';
import { UtilizadorDTO } from '../../DTO/utilizador-dto';
import { UtilizadorService } from '../../services/utilizador-service';

@Component({
  selector: 'app-dados-pessoais',
  templateUrl: './dados-pessoais.component.html',
  styleUrls: ['./dados-pessoais.component.css']
})
export class DadosPessoaisComponent implements OnInit {
  utilizador: UtilizadorDTO = {} as UtilizadorDTO;
  currentPassword: string = '';
  newPassword: string = '';

  constructor(private utilizadorService: UtilizadorService) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData() {
    this.utilizador = this.utilizadorService.getUserData() || ({} as UtilizadorDTO);
  }

  updateUserData() {
    this.utilizadorService.verifyCurrentPassword(this.utilizador.email, this.currentPassword).subscribe(
      (validPassword: boolean) => {
        if (validPassword) {
          this.utilizadorService
            .updateUtilizador(this.utilizador.firstName, this.utilizador.lastName, this.utilizador.email, this.newPassword, this.utilizador.phone, this.utilizador.taxpayer)
            .subscribe(updatedUser => {
              this.utilizador = updatedUser;
            });
        } else {
          console.log('Senha atual inválida');
        }
      }
    );
  }

  downloadUserData() {
    const userDataString = JSON.stringify(this.utilizador);
    const blob = new Blob([userDataString], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dadosPessoais.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
}
