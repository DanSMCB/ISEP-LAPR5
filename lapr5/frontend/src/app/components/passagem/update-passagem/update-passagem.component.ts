import { Component } from '@angular/core';
import { Passagem } from "../../../models/passagem";
import { PassagemService } from "../../../services/passagem-service";
import { Location } from "@angular/common";

@Component({
  selector: 'app-update-passagem',
  templateUrl: './update-passagem.component.html',
  styleUrls: ['./update-passagem.component.css']
})
export class UpdatePassagemComponent {

  passagens: Passagem[] = [];

  formResetToggle: boolean = false;

  constructor(
    private passagemService: PassagemService,
    private location: Location
  ) { }

  updatePassagem(passagemId: string, edificioInicial: string, edificioFinal: string) {
    const connection = this.parseConnectionEdificioPiso(edificioInicial, edificioFinal);
  
    this.passagemService.updatePassagem(passagemId, connection).subscribe(passagem => {
      this.passagens.push(passagem);
    });
  }
  
  parseConnectionEdificioPiso(edificioInicial: string, edificioFinal: string): { edificio: string; piso: string }[] {
    const connectionInicial = { edificio: edificioInicial.split(',')[0], piso: edificioInicial.split(',')[1] };
    const connectionFinal = { edificio: edificioFinal.split(',')[0], piso: edificioFinal.split(',')[1] };

    return [connectionInicial, connectionFinal];
  }

  goBack(): void {
    this.location.back();
  }
}
