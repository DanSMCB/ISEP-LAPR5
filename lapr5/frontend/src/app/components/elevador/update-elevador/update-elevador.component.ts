import { Component } from '@angular/core';
import { Elevador } from "../../../models/elevador";
import { ElevadorService } from "../../../services/elevador-service";
import { Location } from "@angular/common";

@Component({
  selector: 'app-update-elevador',
  templateUrl: './update-elevador.component.html',
  styleUrl: './update-elevador.component.css'
})
export class UpdateElevadorComponent {

  elevadores: Elevador[] = [];

  formResetToggle: boolean = false;

  constructor(private elevadorService: ElevadorService,
    private location: Location
  ) { }

  updateElevador(codigo: string, edificio: string, pisos: Array<{ piso: string }>) {
    this.elevadorService.updateElevador(codigo, edificio, pisos).subscribe(elevador => {
      this.elevadores.push(elevador);
    });
  }

  parsePisos(value: string): Array<{ piso: string }> {
    const pisosArray = value.split(',').map(piso => ({ piso: piso.trim() }));
    return pisosArray;
  }  

  goBack(): void {
    this.location.back();
  }
}
