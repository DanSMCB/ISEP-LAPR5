import { Component } from '@angular/core';
import { Sala } from "../../../models/sala";
import { SalaService } from "../../../services/sala-service";
import { Location } from "@angular/common";

@Component({
  selector: 'app-create-sala',
  templateUrl: './create-sala.component.html',
  styleUrl: './create-sala.component.css'
})
export class CreateSalaComponent {
  sala: Sala[] = [];

  formResetToggle: boolean = false;

  constructor(private salaService: SalaService,
    private location: Location
  ) { }

  createSala(nome: string, descricao: string, categoria: string, tamanho: string, edificio: string, piso: string) {
    this.salaService.createSala(nome,descricao, categoria,tamanho,edificio,piso).subscribe(sala => {
      this.sala.push(sala);
    });
  }

  goBack(): void {
    this.location.back();
  }
}
